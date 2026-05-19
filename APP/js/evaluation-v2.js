/**
 * Calculadora de Inovação v2 — fluxo conversacional SIID (uma pergunta por vez).
 */
(function () {
  'use strict';

  const STORAGE_KEY = 'disrupta-eval-v2-answers';
  const PHASE_LABELS = {
    context: 'Contexto da ideia',
    dimensions: 'Dimensões SIID',
    review: 'Revisão final',
  };

  const FEEDBACK_BY_SCORE = {
    1: 'Nível crítico: alinhamento mínimo ou alto risco identificado.',
    2: 'Nível baixo: considere pivoteamento ou mais evidências.',
    3: 'Nível moderado: potencial existe, mas há lacunas de execução.',
    4: 'Nível significativo: tese sólida com viabilidade clara.',
    5: 'Nível excelente: diferencial forte e alto potencial de escala.',
  };

  const STEPS = [
    {
      id: 'intro',
      phase: 'context',
      type: 'info',
      title: 'Vamos validar sua ideia com a metodologia SIID',
      lede: 'Em poucos minutos você responde perguntas guiadas — uma de cada vez — e recebe um score de 0 a 40 pontos.',
      bullets: [
        'Primeiro descrevemos o contexto da ideia.',
        'Depois avaliamos 8 dimensões com escala de 1 a 5.',
        'No fim você revisa tudo antes de gerar o relatório.',
      ],
    },
    {
      id: 'idea',
      phase: 'context',
      type: 'textarea',
      field: 'idea',
      required: true,
      minLength: 10,
      title: 'Sua ideia em uma frase',
      question: 'O que você está construindo ou testando?',
      hint: 'Seja específico: produto, público e resultado esperado.',
      placeholder: 'Ex.: Uma plataforma que ajuda pequenas empresas a gerenciar estoque com IA.',
    },
    {
      id: 'problem',
      phase: 'context',
      type: 'textarea',
      field: 'problem',
      optional: true,
      title: 'Qual problema isso resolve?',
      question: 'Que dor, frustração ou ineficiência sua solução ataca?',
      hint: 'Opcional, mas melhora a precisão do relatório.',
      placeholder: 'Ex.: Pequenos lojistas perdem vendas por ruptura de estoque e falta de previsão.',
    },
    {
      id: 'dim-strategic',
      phase: 'dimensions',
      type: 'scale',
      field: 'Ajuste Estratégico',
      dimension: 'Ajuste Estratégico',
      title: 'Ajuste estratégico',
      question: 'O quanto essa ideia se alinha aos seus objetivos de longo prazo?',
      hint: '1 = desalinhada · 5 = totalmente alinhada',
    },
    {
      id: 'dim-innovation',
      phase: 'dimensions',
      type: 'scale',
      field: 'Potencial de Inovação',
      dimension: 'Potencial de Inovação',
      title: 'Potencial de inovação',
      question: 'Quão única é a solução comparada ao que já existe no mercado?',
      hint: '1 = commodity · 5 = diferencial disruptivo',
    },
    {
      id: 'dim-difficulty',
      phase: 'dimensions',
      type: 'scale',
      field: 'Dificuldade',
      dimension: 'Dificuldade',
      title: 'Dificuldade técnica',
      question: 'Quão difícil é construir e operar essa solução?',
      hint: '1 = trivial · 5 = altíssima complexidade',
    },
    {
      id: 'dim-demand',
      phase: 'dimensions',
      type: 'scale',
      field: 'Demanda',
      dimension: 'Demanda',
      title: 'Demanda de mercado',
      question: 'Existe público claro e disposto a pagar por isso hoje?',
      hint: '1 = demanda fraca · 5 = demanda urgente e paga',
    },
    {
      id: 'dim-moat',
      phase: 'dimensions',
      type: 'scale',
      field: 'Vantagem Competitiva',
      dimension: 'Vantagem Competitiva',
      title: 'Vantagem competitiva',
      question: 'Você tem ativos ou conhecimentos difíceis de copiar?',
      hint: '1 = fácil de replicar · 5 = fosso defensável',
    },
    {
      id: 'dim-resources',
      phase: 'dimensions',
      type: 'scale',
      field: 'Recursos',
      dimension: 'Recursos',
      title: 'Recursos disponíveis',
      question: 'Você tem capital e time para chegar a um MVP?',
      hint: '1 = sem recursos · 5 = pronto para executar',
    },
    {
      id: 'dim-risk',
      phase: 'dimensions',
      type: 'scale',
      field: 'Risco',
      dimension: 'Risco',
      title: 'Risco',
      question: 'Quais as chances de falha regulatória, técnica ou de mercado?',
      hint: '1 = risco muito alto · 5 = risco controlado',
    },
    {
      id: 'dim-scale',
      phase: 'dimensions',
      type: 'scale',
      field: 'Escalabilidade',
      dimension: 'Escalabilidade',
      title: 'Escalabilidade',
      question: 'O negócio pode crescer sem custos na mesma proporção?',
      hint: '1 = não escala · 5 = escala com margem',
    },
    {
      id: 'review',
      phase: 'review',
      type: 'review',
      title: 'Revisão antes de validar',
      lede: 'Confira suas respostas. Você pode voltar a qualquer etapa para ajustar.',
    },
  ];

  const wizard = document.getElementById('eval-wizard');
  if (!wizard) return;

  const host = document.getElementById('eval-step-host');
  const btnBack = document.getElementById('eval-btn-back');
  const btnContinue = document.getElementById('eval-btn-continue');
  const btnSkip = document.getElementById('eval-btn-skip');
  const progressFill = document.getElementById('eval-progress-fill');
  const stepCurrentEl = document.getElementById('eval-step-current');
  const stepTotalEl = document.getElementById('eval-step-total');
  const phaseLabelEl = document.getElementById('eval-phase-label');
  const scoreEl = document.getElementById('eval-live-score');
  const scoreMobileEl = document.getElementById('eval-live-score-mobile');
  const outlineEl = document.getElementById('eval-step-outline');
  const progressBar = document.getElementById('eval-progress-bar');
  const counterIntroEl = document.getElementById('eval-counter-intro');
  const counterStepsEl = document.getElementById('eval-counter-steps');

  const answers = loadAnswers();
  let index = findResumeIndex();

  const countableSteps = STEPS.filter((s) => s.type !== 'info');
  if (stepTotalEl) stepTotalEl.textContent = String(countableSteps.length);

  function loadAnswers() {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch {
      /* ignore */
    }
    return { idea: '', problem: '', scores: {} };
  }

  function saveAnswers() {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
    } catch {
      /* ignore */
    }
    syncLegacyEvalStorage();
  }

  function syncLegacyEvalStorage() {
    try {
      if (answers.idea) sessionStorage.setItem('disrupta-eval-idea', answers.idea);
      if (answers.problem) sessionStorage.setItem('disrupta-eval-problem', answers.problem);
      sessionStorage.setItem('disrupta-eval-scores', JSON.stringify(answers.scores));
    } catch {
      /* ignore */
    }
  }

  function findResumeIndex() {
    const saved = sessionStorage.getItem('disrupta-eval-v2-index');
    if (saved !== null) {
      const n = parseInt(saved, 10);
      if (!Number.isNaN(n) && n >= 0 && n < STEPS.length) return n;
    }
    return 0;
  }

  function totalScore() {
    return Object.values(answers.scores).reduce((a, b) => a + b, 0);
  }

  function answeredCount() {
    let n = 0;
    if (answers.idea.trim().length >= 10) n += 1;
    if (answers.problem.trim()) n += 1;
    n += Object.keys(answers.scores).length;
    return n;
  }

  function updateChrome() {
    const step = STEPS[index];
    const countableIndex = STEPS.slice(0, index + 1).filter((s) => s.type !== 'info').length;
    const displayIndex = step.type === 'info' ? 0 : countableIndex;

    if (counterIntroEl && counterStepsEl) {
      const isIntro = step.type === 'info';
      counterIntroEl.hidden = !isIntro;
      counterStepsEl.hidden = isIntro;
    }
    if (stepCurrentEl) stepCurrentEl.textContent = String(Math.max(1, displayIndex || 1));
    if (phaseLabelEl) phaseLabelEl.textContent = PHASE_LABELS[step.phase] || '';

    const pct = Math.round(((index + 1) / STEPS.length) * 100);
    if (progressFill) progressFill.style.width = pct + '%';
    if (progressBar) {
      progressBar.setAttribute('aria-valuenow', String(pct));
      progressBar.setAttribute('aria-valuetext', 'Etapa ' + (index + 1) + ' de ' + STEPS.length);
    }

    const scoreText = totalScore() + '/40';
    if (scoreEl) scoreEl.textContent = scoreText;
    if (scoreMobileEl) scoreMobileEl.textContent = scoreText;
    if (scoreEl) scoreEl.setAttribute('aria-label', 'Score SIID ' + scoreText);

    renderOutline();

    if (btnBack) btnBack.disabled = index === 0;

    if (btnSkip) {
      btnSkip.hidden = !(step.optional && step.type === 'textarea');
    }

    if (btnContinue) {
      if (step.type === 'info') {
        btnContinue.textContent = 'Começar';
        btnContinue.disabled = false;
      } else if (step.type === 'review') {
        btnContinue.textContent = 'Validar ideia';
        btnContinue.disabled = !canSubmit();
      } else if (step.type === 'textarea') {
        btnContinue.textContent = 'Continuar';
        btnContinue.disabled = step.required ? !validateTextarea(step) : false;
      } else if (step.type === 'scale') {
        btnContinue.textContent = answers.scores[step.field] ? 'Continuar' : 'Selecione uma nota';
        btnContinue.disabled = !answers.scores[step.field];
      }
    }
  }

  function validateTextarea(step) {
    const val = (answers[step.field] || '').trim();
    if (step.required) return val.length >= (step.minLength || 1);
    return true;
  }

  function canSubmit() {
    return (
      answers.idea.trim().length >= 10 && Object.keys(answers.scores).length >= 8
    );
  }

  function renderOutline() {
    if (!outlineEl) return;
    outlineEl.innerHTML = '';
    STEPS.forEach((step, i) => {
      if (step.type === 'info') return;
      const li = document.createElement('li');
      li.className = 'eval-wizard__outline-item';
      const done =
        i < index ||
        (step.field && step.type === 'textarea' && (answers[step.field] || '').trim()) ||
        (step.field && step.type === 'scale' && answers.scores[step.field]);
      const current = i === index;
      if (done) li.classList.add('is-done');
      if (current) li.classList.add('is-current');

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'eval-wizard__outline-btn';
      btn.textContent = step.title || step.dimension || step.id;
      if (current) btn.setAttribute('aria-current', 'step');
      if (done && !current) btn.setAttribute('aria-label', (step.title || step.id) + ' — concluída');
      if (i <= index || done) {
        btn.addEventListener('click', () => {
          persistCurrentFields();
          index = i;
          sessionStorage.setItem('disrupta-eval-v2-index', String(index));
          renderStep();
        });
      } else {
        btn.disabled = true;
      }
      li.appendChild(btn);
      outlineEl.appendChild(li);
    });
  }

  function persistCurrentFields() {
    const step = STEPS[index];
    if (step.type === 'textarea') {
      const ta = host.querySelector('textarea');
      if (ta) answers[step.field] = ta.value;
    }
    saveAnswers();
  }

  function renderStep() {
    const step = STEPS[index];
    host.innerHTML = '';
    host.className = 'eval-step eval-step--' + step.type;

    if (step.type === 'info') {
      host.innerHTML =
        '<h2 class="eval-step__question">' +
        escapeHtml(step.title) +
        '</h2>' +
        '<p class="eval-step__lede">' +
        escapeHtml(step.lede) +
        '</p><ul class="eval-step__bullets">' +
        step.bullets.map((b) => '<li>' + escapeHtml(b) + '</li>').join('') +
        '</ul>';
    } else if (step.type === 'textarea') {
      const val = answers[step.field] || '';
      host.innerHTML =
        '<p class="eval-step__eyebrow">' +
        escapeHtml(step.title) +
        '</p>' +
        '<h2 class="eval-step__question" id="eval-step-title">' +
        escapeHtml(step.question) +
        '</h2>' +
        '<p class="eval-step__hint" id="eval-step-hint">' +
        escapeHtml(step.hint) +
        (step.required ? '' : ' <span class="eval-step__optional">(opcional)</span>') +
        '</p>' +
        '<textarea id="eval-step-input" class="eval-step__input" rows="4" ' +
        (step.required ? 'required ' : '') +
        'aria-labelledby="eval-step-title" aria-describedby="eval-step-hint" placeholder="' +
        escapeAttr(step.placeholder) +
        '">' +
        escapeHtml(val) +
        '</textarea>';
      const ta = host.querySelector('textarea');
      ta.addEventListener('input', () => {
        answers[step.field] = ta.value;
        saveAnswers();
        updateChrome();
      });
      ta.focus();
    } else if (step.type === 'scale') {
      const selected = answers.scores[step.field];
      host.innerHTML =
        '<p class="eval-step__eyebrow">' +
        escapeHtml(step.title) +
        '</p>' +
        '<h2 class="eval-step__question" id="eval-step-title">' +
        escapeHtml(step.question) +
        '</h2>' +
        '<p class="eval-step__hint" id="eval-step-hint">' +
        escapeHtml(step.hint) +
        '</p>' +
        '<fieldset class="eval-step__scale-fieldset" aria-describedby="eval-step-hint">' +
        '<legend class="visually-hidden">' +
        escapeHtml(step.question) +
        '</legend>' +
        '<div class="eval-step__scale-labels" aria-hidden="true"><span>Baixo (1)</span><span>Alto (5)</span></div>' +
        '<div class="eval-step__scale-group"></div>' +
        '</fieldset>' +
        '<p class="eval-step__feedback" id="eval-step-feedback" role="status"></p>';
      const group = host.querySelector('.eval-step__scale-group');
      const feedback = host.querySelector('#eval-step-feedback');
      for (let v = 1; v <= 5; v++) {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'scale-btn';
        btn.dataset.value = String(v);
        btn.setAttribute('aria-label', 'Nota ' + v + ' de 5');
        btn.setAttribute('aria-pressed', selected === v ? 'true' : 'false');
        btn.textContent = String(v);
        if (selected === v) btn.classList.add('active');
        btn.addEventListener('click', () => {
          group.querySelectorAll('.scale-btn').forEach((b) => {
            b.classList.remove('active');
            b.setAttribute('aria-pressed', 'false');
          });
          btn.classList.add('active');
          btn.setAttribute('aria-pressed', 'true');
          answers.scores[step.field] = v;
          if (feedback) {
            feedback.textContent = FEEDBACK_BY_SCORE[v];
          }
          saveAnswers();
          updateChrome();
        });
        group.appendChild(btn);
      }
      if (selected && feedback) {
        feedback.textContent = FEEDBACK_BY_SCORE[selected];
      }
    } else if (step.type === 'review') {
      host.innerHTML =
        '<h2 class="eval-step__question">' +
        escapeHtml(step.title) +
        '</h2>' +
        '<p class="eval-step__lede">' +
        escapeHtml(step.lede) +
        '</p>' +
        '<dl class="eval-review-dl">' +
        buildReviewHtml() +
        '</dl>';
    }

    updateChrome();
    try {
      sessionStorage.setItem('disrupta-eval-v2-index', String(index));
    } catch {
      /* ignore */
    }
  }

  function buildReviewHtml() {
    let html = '';
    html += reviewRow('Ideia', answers.idea.trim() || '—');
    html += reviewRow('Problema', answers.problem.trim() || '—');
    STEPS.filter((s) => s.type === 'scale').forEach((s) => {
      const v = answers.scores[s.field];
      html += reviewRow(s.dimension, v ? v + '/5 — ' + FEEDBACK_BY_SCORE[v] : '—');
    });
    return html;
  }

  function reviewRow(dt, dd) {
    return '<dt>' + escapeHtml(dt) + '</dt><dd>' + escapeHtml(dd) + '</dd>';
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function escapeAttr(s) {
    return escapeHtml(s).replace(/'/g, '&#39;');
  }

  const PROVOCATION_TEMPLATES = [
    {
      q: 'Qual evidência concreta valida a demanda que você assumiu?',
      a: 'Liste 3 conversas com clientes ou dados de mercado antes de escalar o MVP.',
    },
    {
      q: 'O que acontece se o diferencial principal for copiado em 12 meses?',
      a: 'Defina um fosso operacional (dados, canal ou custo) além da feature inicial.',
    },
    {
      q: 'Você tem recursos para sobreviver até a primeira métrica de tração?',
      a: 'Mapeie runway, time e dependências críticas para os próximos 2 trimestres.',
    },
    {
      q: 'Qual risco regulatório ou técnico pode invalidar a tese?',
      a: 'Planeje um piloto com escopo limitado e critérios de kill claros.',
    },
    {
      q: 'A ideia escala sem degradar margem ou experiência?',
      a: 'Simule custo unitário e suporte ao dobrar a base de usuários.',
    },
  ];

  function scoreBand(value) {
    if (value >= 4) return { label: 'Alta', tags: ['Favorável'] };
    if (value >= 3) return { label: 'Média', tags: ['Atenção'] };
    return { label: 'Baixa', tags: ['Risco'] };
  }

  function confidenceFromTotal(total) {
    if (total >= 33) return { level: 'alto', text: 'Muito alta confiança' };
    if (total >= 25) return { level: 'alto', text: 'Alta confiança' };
    if (total >= 16) return { level: 'medio', text: 'Confiança moderada' };
    return { level: 'baixo', text: 'Baixa confiança' };
  }

  function populateResultPanel() {
    const idea = answers.idea.trim();
    const problem = answers.problem.trim();
    const total = totalScore();
    const conf = confidenceFromTotal(total);

    const promptHighlight = document.getElementById('eval-prompt-highlight');
    const problemWrap = document.getElementById('eval-result-problem-wrap');
    const problemEl = document.getElementById('eval-result-problem');
    const totalEl = document.getElementById('eval-result-total-score');
    const confEl = document.getElementById('eval-result-confidence');
    const dateEl = document.getElementById('eval-result-date');
    const dimsRoot = document.getElementById('eval-result-dimensions');
    const matrixRoot = document.getElementById('eval-result-matrix');
    const provRoot = document.getElementById('eval-provocations-tree');
    const ctxPreview = document.getElementById('eval-context-idea-preview');
    const ctxDimList = document.getElementById('eval-context-dim-list');

    if (promptHighlight) promptHighlight.textContent = idea;
    if (problemWrap && problemEl) {
      if (problem) {
        problemEl.textContent = problem;
        problemWrap.hidden = false;
      } else {
        problemWrap.hidden = true;
      }
    }
    if (totalEl) totalEl.textContent = total + '/40';
    if (confEl) {
      confEl.textContent = conf.text;
      confEl.dataset.level = conf.level;
      confEl.setAttribute('aria-label', 'Nível de confiança: ' + conf.text);
    }
    if (dateEl) {
      const d = new Date();
      dateEl.dateTime = d.toISOString().slice(0, 10);
      dateEl.textContent =
        String(d.getDate()).padStart(2, '0') +
        '/' +
        String(d.getMonth() + 1).padStart(2, '0') +
        '/' +
        d.getFullYear();
    }
    if (ctxPreview) ctxPreview.textContent = idea;

    if (dimsRoot) {
      dimsRoot.innerHTML = '';
      STEPS.filter((s) => s.type === 'scale').forEach((s) => {
        const v = answers.scores[s.field];
        const card = document.createElement('div');
        card.className = 'eval-result-dimension';
        card.innerHTML =
          '<div class="eval-result-dimension__head">' +
          '<span class="eval-result-dimension__name">' +
          escapeHtml(s.dimension) +
          '</span>' +
          '<span class="eval-result-dimension__score">' +
          (v ? v + '/5' : '—') +
          '</span></div>' +
          '<p class="eval-result-dimension__feedback muted">' +
          escapeHtml(v ? FEEDBACK_BY_SCORE[v] : '') +
          '</p>';
        dimsRoot.appendChild(card);
      });
    }

    if (matrixRoot) {
      const scores = answers.scores;
      const feasibility = Math.round(
        ((scores['Recursos'] || 0) + (6 - (scores['Dificuldade'] || 3))) / 2,
      );
      const friction = Math.round(((scores['Dificuldade'] || 0) + (6 - (scores['Demanda'] || 3))) / 2);
      const moat = Math.round(
        (((scores['Vantagem Competitiva'] || 0) + (scores['Potencial de Inovação'] || 0)) / 2) *
          10,
      ) / 10;

      const cells = [
        { dt: 'Feasibility (Viabilidade)', value: feasibility },
        { dt: 'Friction (Fricção de uso)', value: friction },
        { dt: 'Moat Defense (Defesa)', value: Math.round(moat) },
      ];

      matrixRoot.innerHTML = cells
        .map((c) => {
          const band = scoreBand(c.value);
          return (
            '<div class="need-cell">' +
            '<dt>' +
            escapeHtml(c.dt) +
            '</dt><dd>' +
            escapeHtml(band.label) +
            '</dd><div class="tags">' +
            band.tags.map((t) => '<span class="tag">' + escapeHtml(t) + '</span>').join('') +
            '</div></div>'
          );
        })
        .join('');
    }

    if (provRoot) {
      const ranked = STEPS.filter((s) => s.type === 'scale')
        .map((s) => ({ name: s.dimension, value: answers.scores[s.field] || 0 }))
        .sort((a, b) => a.value - b.value);

      const picks = ranked.slice(0, 3);
      provRoot.innerHTML = picks
        .map((dim, i) => {
          const tpl = PROVOCATION_TEMPLATES[i] || PROVOCATION_TEMPLATES[0];
          const label =
            '0' +
            (i + 1) +
            '. [' +
            dim.name +
            ' ' +
            dim.value +
            '/5] ' +
            tpl.q;
          return (
            '<div class="lab-rd-tree-item" data-tree-item>' +
            '<button type="button" class="lab-rd-tree-item__trigger" data-tree-trigger aria-expanded="false">' +
            '<span class="lab-rd-tree-item__label">' +
            escapeHtml(label) +
            '</span>' +
            '<span class="lab-rd-tree-item__chevron" data-tree-chevron aria-hidden="true">▸</span>' +
            '</button>' +
            '<div class="lab-rd-tree-expand" data-tree-branch-host data-expanded="false" aria-hidden="true">' +
            '<div class="lab-rd-tree-expand__clip"><div class="lab-rd-tree-branch">' +
            '<p class="muted lab-rd-tree-item__body">' +
            escapeHtml(tpl.a) +
            '</p></div></div></div></div>'
          );
        })
        .join('');

      if (window.DisruptaLabRdExpand) {
        window.DisruptaLabRdExpand.setupTreeAccordion(provRoot);
      }
    }

    if (ctxDimList) {
      ctxDimList.innerHTML = '';
      STEPS.filter((s) => s.type === 'scale').forEach((s) => {
        const v = answers.scores[s.field];
        const li = document.createElement('li');
        li.textContent = (s.dimension || s.field) + ': ' + (v ? v + '/5' : '—');
        ctxDimList.appendChild(li);
      });
    }
  }

  function showResult() {
    populateResultPanel();
    saveAnswers();
    try {
      sessionStorage.setItem('disrupta-eval-v2-complete', '1');
    } catch {
      /* ignore */
    }

    const wizardEl = document.getElementById('eval-wizard');
    const resultPanel = document.getElementById('eval-result-panel');
    const ctxWizard = document.getElementById('eval-context-wizard');
    const ctxResult = document.getElementById('eval-context-result');
    const ctxHeadline = document.querySelector('.lab-context__headline-text');

    if (wizardEl) wizardEl.hidden = true;
    if (ctxWizard) ctxWizard.hidden = true;
    if (ctxResult) ctxResult.hidden = false;
    if (ctxHeadline) ctxHeadline.textContent = 'Resultado SIID';

    document.body.classList.remove('lab-mode-hero');
    document.body.classList.add('lab-mode-response', 'page-evaluation-result');
    document.title = 'Avaliação de Inovação — Disrupta';

    if (resultPanel) {
      resultPanel.hidden = false;
      resultPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    const titleEl = document.getElementById('eval-result-title');
    if (titleEl) {
      titleEl.setAttribute('tabindex', '-1');
      titleEl.focus({ preventScroll: true });
    }
  }

  function resetWizard() {
    const wizardEl = document.getElementById('eval-wizard');
    const resultPanel = document.getElementById('eval-result-panel');
    const ctxWizard = document.getElementById('eval-context-wizard');
    const ctxResult = document.getElementById('eval-context-result');
    const ctxHeadline = document.querySelector('.lab-context__headline-text');

    if (wizardEl) wizardEl.hidden = false;
    if (resultPanel) resultPanel.hidden = true;
    if (ctxWizard) ctxWizard.hidden = false;
    if (ctxResult) ctxResult.hidden = true;
    if (ctxHeadline) ctxHeadline.textContent = 'Calculadora de Inovação';

    document.body.classList.add('lab-mode-hero');
    document.body.classList.remove('lab-mode-response', 'page-evaluation-result');
    document.title = 'Calculadora de Inovação — Disrupta';

    index = 0;
    try {
      sessionStorage.removeItem('disrupta-eval-v2-index');
      sessionStorage.removeItem('disrupta-eval-v2-complete');
    } catch {
      /* ignore */
    }
    renderStep();
    wizardEl?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function goNext() {
    persistCurrentFields();
    if (STEPS[index].type === 'review') {
      if (!canSubmit()) return;
      showResult();
      return;
    }
    if (index < STEPS.length - 1) {
      index += 1;
      renderStep();
    }
  }

  function goBack() {
    if (index > 0) {
      persistCurrentFields();
      index -= 1;
      renderStep();
    }
  }

  function skipStep() {
    const step = STEPS[index];
    if (step.optional && step.type === 'textarea') {
      answers[step.field] = '';
      saveAnswers();
      goNext();
    }
  }

  btnContinue?.addEventListener('click', goNext);
  btnBack?.addEventListener('click', goBack);
  btnSkip?.addEventListener('click', skipStep);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      if (!btnContinue?.disabled) {
        e.preventDefault();
        goNext();
      }
    }
  });

  document.getElementById('eval-btn-new')?.addEventListener('click', resetWizard);
  document.getElementById('eval-btn-new-sidebar')?.addEventListener('click', resetWizard);

  renderStep();

  try {
    if (sessionStorage.getItem('disrupta-eval-v2-complete') === '1' && canSubmit()) {
      showResult();
    }
  } catch {
    /* ignore */
  }

  (function initEvalContextDrawer() {
    const drawer = document.getElementById('lab-context-drawer');
    const toggle = document.getElementById('lab-context-drawer-toggle');
    if (!drawer || !toggle) return;

    const STORAGE_KEY = 'disrupta-eval-v2-context-drawer-expanded';

    function applyExpanded(expanded) {
      drawer.dataset.expanded = expanded ? 'true' : 'false';
      document.body.classList.toggle('lab-context-drawer-collapsed', !expanded);
      toggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
      toggle.setAttribute(
        'aria-label',
        expanded ? 'Recolher painel de progresso' : 'Abrir painel de progresso',
      );
      toggle.setAttribute('title', expanded ? 'Recolher painel de progresso' : 'Abrir painel de progresso');
      try {
        sessionStorage.setItem(STORAGE_KEY, expanded ? '1' : '0');
      } catch {
        /* ignore */
      }
    }

    let stored = null;
    try {
      stored = sessionStorage.getItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    if (stored === '0') applyExpanded(false);
    else applyExpanded(true);

    toggle.addEventListener('click', function (ev) {
      ev.preventDefault();
      ev.stopPropagation();
      const isOpen = drawer.getAttribute('data-expanded') === 'true';
      applyExpanded(!isOpen);
    });
  })();
})();
