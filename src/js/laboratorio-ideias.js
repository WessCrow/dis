/**
 * Laboratório de Ideias — lógica da página (textareas espelhados, validação mínima para gerar, dossié, canvas de fundo, float-dash).
 * @see skills/guidelines/disrupta-laboratorio-design-system.md
 */
(function () {
  'use strict';

  const input = document.getElementById('forge-input');
  const btnProcess = document.getElementById('btn-process');
  const btnProcessCenter = document.getElementById('btn-process-center');
  const centerInput = document.getElementById('forge-input-center');
  const rootEl = document.documentElement;

  /**
   * Ícones por secção do dossié (.float-dash__ico 22×22, stroke 1.35).
   * `lab-rd-viz-h--generating`: secção «Elementos visuais» ainda em placeholder (Em geração).
   */
  const LAB_RD_SECTION_HEAD_ICONS = {
    'lab-rd-prompt-h':
      '<svg class="float-dash__ico" width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round" d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round" d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/></svg>',
    'lab-rd-need-st-h':
      '<svg class="float-dash__ico" width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round" d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round" d="M9 2v4M15 2v4M9 10h6M9 14h4"/></svg>',
    'lab-rd-need-id-h':
      '<svg class="float-dash__ico" width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round" d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4" fill="none" stroke="currentColor" stroke-width="1.35"/></svg>',
    'lab-rd-pf-h':
      '<svg class="float-dash__ico" width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round" d="M12 3 2 8l10 5 10-5-10-5Z"/><path fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round" d="m2 13 10 5 10-5M2 18l10 5 10-5"/></svg>',
    'lab-rd-class-h':
      '<svg class="float-dash__ico" width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round" d="M4 6h4v4H4V6Zm6 0h4v4h-4V6Zm6 0h4v4h-4V6ZM4 14h4v4H4v-4Zm6 0h4v4h-4v-4Z"/></svg>',
    'lab-rd-rq-h':
      '<svg class="float-dash__ico" width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="1.35"/><path fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" d="M9.09 9a3 3 0 0 1 5.82 1c0 2-3 3-3 3"/><path fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" d="M12 17h.01"/></svg>',
    'lab-rd-var-h':
      '<svg class="float-dash__ico" width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round" d="M6 3v12a3 3 0 0 0 3 3h1"/><path fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round" d="M18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/><path fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round" d="M17 9c-1.5-1-3.5-2-6-2M7 15c1.5 1 3.5 2 6 2"/></svg>',
    'lab-rd-viz-h':
      '<svg class="float-dash__ico" width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round" d="M4 20V10M12 20V4M20 20V8"/></svg>',
    'lab-rd-viz-h--generating':
      '<svg class="float-dash__ico" width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M19.07 4.93l-2.83 2.83M7.76 16.24l-2.83 2.83"/></svg>',
    'lab-rd-sources-h':
      '<svg class="float-dash__ico" width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round" d="M10 13a5 5 0 0 0 7.54.54l1.92-1.92a5 5 0 0 0-7.07-7.07l-1.71 1.71"/><path fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round" d="M14 11a5 5 0 0 0-7.54-.54L4.54 12.46a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',
    'lab-rd-devil-h':
      '<svg class="float-dash__ico" width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round" d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"/><path fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" d="m12 8-4 4 4 4M16 12H8"/></svg>',
    __default:
      '<svg class="float-dash__ico" width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round" d="M4 5h16v4H4V5Zm0 6h10v4H4v-4Zm0 6h16v4H4v-4Z"/></svg>',
  };

  function getLabRdSectionHeadIconHtml(headingEl, section) {
    const id = headingEl && headingEl.id;
    if (id === 'lab-rd-viz-h' && section.classList.contains('lab-result-dossier__section--placeholder')) {
      return LAB_RD_SECTION_HEAD_ICONS['lab-rd-viz-h--generating'];
    }
    return LAB_RD_SECTION_HEAD_ICONS[id] || LAB_RD_SECTION_HEAD_ICONS.__default;
  }

  function refreshLabRdVizSectionHeadIcon() {
    const vizHeading = document.getElementById('lab-rd-viz-h');
    if (!vizHeading) return;
    const head = vizHeading.closest('.lab-result-dossier__section-head');
    if (!head) return;
    const iconWrap = head.querySelector('.lab-section-head__icon');
    if (!iconWrap) return;
    const section = document.getElementById('lab-rd-viz-section');
    if (!section) return;
    iconWrap.innerHTML = getLabRdSectionHeadIconHtml(vizHeading, section);
  }

  if (!input || !btnProcess) {
    return;
  }

  (function initLabContextResponseDrawer() {
    const drawer = document.getElementById('lab-context-drawer');
    const toggle = document.getElementById('lab-context-drawer-toggle');
    if (!drawer || !toggle) return;

    const STORAGE_KEY = 'disrupta-lab-context-drawer-expanded';

    function applyExpanded(expanded) {
      drawer.dataset.expanded = expanded ? 'true' : 'false';
      document.body.classList.toggle('lab-context-drawer-collapsed', !expanded);
      toggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
      toggle.setAttribute(
        'aria-label',
        expanded ? 'Recolher painel da ideia' : 'Abrir painel da ideia para editar o prompt',
      );
      toggle.setAttribute(
        'title',
        expanded ? 'Recolher painel da ideia' : 'Abrir painel da ideia para editar o prompt',
      );
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

    toggle.addEventListener('click', function () {
      const isOpen = drawer.dataset.expanded !== 'false';
      const next = !isOpen;
      applyExpanded(next);
      if (next) {
        try {
          input.focus({ preventScroll: true });
        } catch {
          try {
            input.focus();
          } catch {
            /* ignore */
          }
        }
      }
    });
  })();

  function countWords(text) {
    const m = text.trim().match(/[A-Za-zÀ-ÿ0-9-]+/g);
    return m ? m.length : 0;
  }

  function updateStats() {
    const text = input.value;
    const chars = text.length;
    const words = countWords(text);

    const ready = words >= 3 && chars >= 12;
    btnProcess.disabled = !ready;
    if (btnProcessCenter) btnProcessCenter.disabled = !ready;
  }

  function setSectionState(section, isOpen) {
    const headBtn = section.querySelector('.lab-result-dossier__section-head--interactive');
    const content = section.querySelector('.lab-section-content');
    if (!headBtn || !content) return;
    const chevron = headBtn.querySelector('.lab-section-head__chevron');
    section.setAttribute('data-collapsed', isOpen ? 'false' : 'true');
    headBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    headBtn.setAttribute('aria-label', isOpen ? 'Colapsar seção' : 'Expandir seção');
    if (chevron) chevron.textContent = isOpen ? '▾' : '▸';
    content.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
  }

  function setupCollapsibleSections() {
    const dossier = document.getElementById('lab-result-dossier');
    if (!dossier || dossier.dataset.collapsibleReady === '1') return;
    const sections = dossier.querySelectorAll('.lab-result-dossier__section');
    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];
      const heading = section.querySelector('.lab-result-dossier__h3');
      if (!heading) continue;

      let head = section.querySelector('.lab-result-dossier__section-head');
      if (!head) {
        head = document.createElement('div');
        head.className = 'lab-result-dossier__section-head';
        heading.replaceWith(head);
        head.appendChild(heading);
      }
      while (
        head.nextElementSibling &&
        head.nextElementSibling.classList &&
        head.nextElementSibling.classList.contains('lab-result-dossier__head-tag')
      ) {
        head.appendChild(head.nextElementSibling);
      }

      const headParts = [];
      while (head.firstChild) {
        headParts.push(head.removeChild(head.firstChild));
      }
      const headingEl = headParts.find(
        (n) => n.nodeType === 1 && n.classList && n.classList.contains('lab-result-dossier__h3'),
      );
      const tagEls = headParts.filter(
        (n) => n.nodeType === 1 && n.classList && n.classList.contains('lab-result-dossier__head-tag'),
      );

      if (!headingEl) continue;

      const iconWrap = document.createElement('span');
      iconWrap.className = 'lab-section-head__icon';
      iconWrap.setAttribute('aria-hidden', 'true');
      iconWrap.innerHTML = getLabRdSectionHeadIconHtml(headingEl, section);

      const main = document.createElement('div');
      main.className = 'lab-section-head__main';
      main.appendChild(headingEl);
      for (let ti = 0; ti < tagEls.length; ti++) {
        main.appendChild(tagEls[ti]);
      }

      const chevron = document.createElement('span');
      chevron.className = 'lab-section-head__chevron';
      chevron.setAttribute('aria-hidden', 'true');

      head.appendChild(iconWrap);
      head.appendChild(main);
      head.appendChild(chevron);

      head.classList.add('lab-result-dossier__section-head--interactive');
      head.setAttribute('role', 'button');
      head.setAttribute('tabindex', '0');

      const content = document.createElement('div');
      content.className = 'lab-section-content';
      content.setAttribute('aria-hidden', 'false');
      const inner = document.createElement('div');
      inner.className = 'lab-section-content__inner';
      let itemIndex = 0;
      let node = head.nextSibling;
      while (node) {
        const next = node.nextSibling;
        if (node.nodeType === 1) {
          node.style.setProperty('--stagger-index', String(itemIndex));
          itemIndex += 1;
          inner.appendChild(node);
        }
        node = next;
      }
      content.appendChild(inner);
      section.appendChild(content);

      setSectionState(section, i === 0);

      head.addEventListener('click', () => {
        const parent = head.closest('.lab-result-dossier__section');
        if (!parent) return;
        const expanded = head.getAttribute('aria-expanded') === 'true';
        setSectionState(parent, !expanded);
      });
      head.addEventListener('keydown', (e) => {
        if (e.key !== 'Enter' && e.key !== ' ') return;
        e.preventDefault();
        const parent = head.closest('.lab-result-dossier__section');
        if (!parent) return;
        const expanded = head.getAttribute('aria-expanded') === 'true';
        setSectionState(parent, !expanded);
      });
    }
    dossier.dataset.collapsibleReady = '1';
  }

  /** @type {Record<string, { summary: string; analysis: string; sources: string[]; why: string }>} */
  const SECTION_FLOW_MAP = {
    'lab-rd-prompt-h': {
      summary: 'Leitura do prompt para identificar contexto, dor principal e objetivo esperado.',
      analysis: 'A IA separa sinais de problema, público e outcome para reduzir ambiguidade semântica.',
      sources: ['Prompt original do utilizador', 'Heurística de decomposição problema -> público -> outcome'],
      why: 'Sem essa base, as secções seguintes perdem coerência causal.',
    },
    'lab-rd-need-st-h': {
      summary: 'Estruturação formal da necessidade em linguagem de negócio.',
      analysis: 'A dor é convertida em Problem, Target population, Measurable outcome e Statement.',
      sources: ['Prompt consolidado', 'Template interno de Need Statement'],
      why: 'Permite validar se a tese tem clareza e mensurabilidade.',
    },
    'lab-rd-need-id-h': {
      summary: 'Mapeamento operacional da dor no contexto de uso.',
      analysis: 'A IA detalha quem sofre, em que contexto, com que frequência e com quais consequências.',
      sources: ['Need Statement', 'Matriz de diagnóstico de contexto'],
      why: 'Transforma problema abstrato em cenário acionável.',
    },
    'lab-rd-pf-h': {
      summary: 'Leitura de mercado para posicionar a tese no setor certo.',
      analysis: 'Seleciona tendências que impactam adoção, execução e diferenciação.',
      sources: ['Sinais de mercado simulados', 'Classificação setorial da tese'],
      why: 'Evita avaliar a hipótese fora do terreno competitivo real.',
    },
    'lab-rd-class-h': {
      summary: 'Classificação da natureza da ideia e do nível de concretude.',
      analysis: 'A hipótese é categorizada para orientar risco, viabilidade e necessidade de prova.',
      sources: ['Taxonomia interna de ideias', 'Sinais extraídos do problema e contexto'],
      why: 'Define o tipo de execução e o nível de confiança esperado.',
    },
    'lab-rd-rq-h': {
      summary: 'Geração de perguntas de tensão para teste crítico da tese.',
      analysis: 'As questões atacam incertezas de mercado, adoção e proposta de valor.',
      sources: ['Framework de perguntas reflexivas', 'Hipóteses centrais da ideia'],
      why: 'Impede confirmação prematura e fortalece a qualidade da decisão.',
    },
    'lab-rd-var-h': {
      summary: 'Proposição de variações para explorar alternativas de execução.',
      analysis: 'A IA propõe pivôs com base em gaps e oportunidades detectadas.',
      sources: ['Conclusões das questões reflexivas', 'Padrões de pivotagem de solução'],
      why: 'Amplia opcionalidade estratégica antes de investimento.',
    },
    'lab-rd-viz-h': {
      summary: 'Tradução da análise para leitura rápida por módulos e mapas.',
      analysis: 'Os indicadores visuais sintetizam prontidão, risco, sinais de mercado e incertezas.',
      sources: ['Scorecards internos do protótipo', 'Regras de visualização do dossié'],
      why: 'Facilita interpretação executiva em poucos segundos.',
    },
    'lab-rd-sources-h': {
      summary: 'Rastreabilidade de evidências e justificativas de inclusão.',
      analysis: 'Cada fonte é ligada a justificativa, achado e pergunta de desafio.',
      sources: ['Tabela de fontes do dossié', 'Lista de materiais citados'],
      why: 'Aumenta confiança e permite auditoria do caminho lógico.',
    },
    'lab-rd-devil-h': {
      summary: 'Análise de estresse e identificação de pontos cegos na ideia.',
      analysis: 'A IA assume uma postura crítica para encontrar razões de falha não óbvias.',
      sources: ['Heurística de Red Teaming', 'Base de dados de falhas de mercado'],
      why: 'Combate o viés de otimismo excessivo e fortalece a proposta.',
    },
  };

  function appendLabeledParagraph(panel, label, body) {
    const p = document.createElement('p');
    const strong = document.createElement('strong');
    strong.textContent = label;
    const span = document.createElement('span');
    span.textContent = body;
    p.appendChild(strong);
    p.appendChild(span);
    panel.appendChild(p);
  }

  function renderSectionFlows() {
    const dossier = document.getElementById('lab-result-dossier');
    if (!dossier || dossier.dataset.sectionFlowsReady === '1') return;

    const keys = Object.keys(SECTION_FLOW_MAP);
    for (let i = 0; i < keys.length; i++) {
      const headingId = keys[i];
      const heading = document.getElementById(headingId);
      if (!heading) continue;
      const section = heading.closest('.lab-result-dossier__section');
      if (!section || section.dataset.flowReady === '1') continue;
      const item = SECTION_FLOW_MAP[headingId];

      const flow = document.createElement('div');
      flow.className = 'lab-section-flow';

      const trigger = document.createElement('button');
      trigger.type = 'button';
      trigger.className = 'lab-section-flow__trigger';
      trigger.setAttribute('aria-expanded', 'false');
      trigger.setAttribute('aria-label', 'Expandir explicação do papel desta secção');

      const triggerText = document.createElement('span');
      triggerText.className = 'lab-section-flow__trigger-text';
      triggerText.textContent = 'Papel desta secção no dossié';
      const triggerIcon = document.createElement('span');
      triggerIcon.className = 'lab-section-flow__trigger-icon';
      triggerIcon.setAttribute('aria-hidden', 'true');
      triggerIcon.textContent = '▸';
      trigger.appendChild(triggerText);
      trigger.appendChild(triggerIcon);

      const panel = document.createElement('div');
      panel.className = 'lab-section-flow__panel';
      panel.hidden = true;

      const titleP = document.createElement('p');
      titleP.className = 'lab-section-flow__title';
      titleP.textContent = 'Papel desta secção no dossié';
      panel.appendChild(titleP);

      const lede = document.createElement('p');
      lede.className = 'lab-section-flow__lede';
      lede.textContent =
        'O que esta parte esclarece, como encadeia com o resto do relatório e que sinais entram (protótipo).';
      panel.appendChild(lede);

      appendLabeledParagraph(panel, 'Resumo', item.summary);
      appendLabeledParagraph(panel, 'Análise', item.analysis);
      appendLabeledParagraph(panel, 'Justificativa', item.why);

      const sourceTitle = document.createElement('p');
      sourceTitle.className = 'lab-section-flow__source-title';
      sourceTitle.textContent = 'Fontes relacionadas';
      panel.appendChild(sourceTitle);

      const list = document.createElement('ul');
      list.className = 'lab-section-flow__sources';
      for (let s = 0; s < item.sources.length; s++) {
        const li = document.createElement('li');
        li.textContent = item.sources[s];
        list.appendChild(li);
      }
      panel.appendChild(list);

      trigger.addEventListener('click', (ev) => {
        const btn = ev.currentTarget;
        const expanded = btn.getAttribute('aria-expanded') === 'true';
        const parent = btn.parentNode;
        const details = parent.querySelector('.lab-section-flow__panel');
        const icon = btn.querySelector('.lab-section-flow__trigger-icon');
        btn.setAttribute('aria-expanded', expanded ? 'false' : 'true');
        btn.setAttribute(
          'aria-label',
          expanded ? 'Expandir explicação do papel desta secção' : 'Colapsar explicação do papel desta secção',
        );
        if (icon) icon.textContent = expanded ? '▸' : '▾';
        details.hidden = expanded;
      });

      flow.appendChild(trigger);
      flow.appendChild(panel);
      section.appendChild(flow);
      section.dataset.flowReady = '1';
    }

    dossier.dataset.sectionFlowsReady = '1';
  }

  let fitCenterRaf = 0;
  function fitCenterTextarea() {
    if (!centerInput || centerInput.tagName !== 'TEXTAREA') return;
    centerInput.style.height = 'auto';
    centerInput.style.height = `${centerInput.scrollHeight}px`;
  }

  function scheduleFitCenterTextarea() {
    if (fitCenterRaf) cancelAnimationFrame(fitCenterRaf);
    fitCenterRaf = requestAnimationFrame(() => {
      fitCenterRaf = 0;
      fitCenterTextarea();
    });
  }

  input.addEventListener('input', () => {
    if (centerInput && centerInput.value !== input.value) {
      centerInput.value = input.value;
      centerInput.dispatchEvent(new Event('input', { bubbles: true }));
    }
    updateStats();
    scheduleFitCenterTextarea();
  });

  if (centerInput) {
    centerInput.addEventListener('input', () => {
      if (input.value !== centerInput.value) input.value = centerInput.value;
      updateStats();
      scheduleFitCenterTextarea();
    });
  }

  scheduleFitCenterTextarea();
  window.addEventListener('resize', scheduleFitCenterTextarea, { passive: true });

  if (btnProcessCenter) {
    btnProcessCenter.addEventListener('click', () => {
      btnProcess.click();
    });
  }

  function trySubmitForgeOnModEnter(ev) {
    if (ev.key !== 'Enter' || !(ev.metaKey || ev.ctrlKey)) return;
    ev.preventDefault();
    if (!btnProcess.disabled) btnProcess.click();
  }
  input.addEventListener('keydown', trySubmitForgeOnModEnter);
  if (centerInput) centerInput.addEventListener('keydown', trySubmitForgeOnModEnter);

  const intentDialog = document.getElementById('lab-intent-preview-dialog');
  const intentSummary = document.getElementById('lab-intent-preview-summary');
  // lab-intent-cancel = botão X (fechar) | lab-intent-adjust = botão "Ajustar ideia"
  const intentCloseX = document.getElementById('lab-intent-cancel');
  const intentAdjust = document.getElementById('lab-intent-adjust');
  const intentConfirm = document.getElementById('lab-intent-confirm');
  const processingOverlay = document.getElementById('lab-processing-overlay');
  const processingLogs = document.getElementById('lab-processing-logs');

  function addProcessingLog(msg) {
    if (!processingLogs) return;
    const item = document.createElement('p');
    item.className = 'lab-processing-log-item';
    item.textContent = `> ${msg}`;
    processingLogs.prepend(item);
  }

  function runProcessingSequence(callback) {
    if (processingOverlay) {
      processingOverlay.hidden = false;
      processingOverlay.removeAttribute('aria-hidden');
    }

    const logs = [
      'Decompondo prompt em vetores de intenção...',
      'Cruzando com sinais de mercado setoriais...',
      'Simulando cenários de estresse (Advogado do Diabo)...',
      'Gerando Need Statement estruturado...',
      'Finalizando dossiê de autoridade compartilhada...'
    ];

    let i = 0;
    const interval = setInterval(() => {
      if (i < logs.length) {
        addProcessingLog(logs[i]);
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          if (processingOverlay) {
            processingOverlay.hidden = true;
            processingOverlay.setAttribute('aria-hidden', 'true');
            if (processingLogs) processingLogs.innerHTML = '';
          }
          callback();
        }, 800);
      }
    }, 600);
  }

  btnProcess.addEventListener('click', () => {
    const t = input.value.trim();
    if (!t || btnProcess.disabled) return;

    // Intent Preview Pattern (IAA)
    if (intentDialog && intentSummary) {
      intentSummary.textContent = t.length > 120 ? t.substring(0, 117) + '...' : t;
      intentDialog.showModal();
    } else {
      executeGeneration();
    }
  });

  // Ambos os botões de cancelar fecham o dialog
  function closeIntentDialog() {
    if (intentDialog) intentDialog.close();
  }
  if (intentCloseX) intentCloseX.addEventListener('click', closeIntentDialog);
  if (intentAdjust) intentAdjust.addEventListener('click', closeIntentDialog);

  if (intentConfirm) {
    intentConfirm.addEventListener('click', () => {
      closeIntentDialog();
      executeGeneration();
    });
  }

  function executeGeneration() {
    const t = input.value.trim();
    
    runProcessingSequence(() => {
      try {
        sessionStorage.setItem('disrupta-forge-prompt', t);
      } catch {
        /* storage pode estar indisponível */
      }

      const preview = document.getElementById('lab-center-preview');
      const dossier = document.getElementById('lab-result-dossier');
      const quoteEl = document.getElementById('lab-rd-prompt-quote');
      const vizRoot = document.getElementById('lab-rd-viz-root');
      const vizSection = document.getElementById('lab-rd-viz-section');
      const tmpl = document.getElementById('lab-viz-board-tmpl');
      const dateEl = document.getElementById('lab-result-dossier-date');

      if (quoteEl) quoteEl.textContent = t;

      if (vizRoot && tmpl && !vizRoot.dataset.populated) {
        vizRoot.appendChild(tmpl.content.cloneNode(true));
        vizRoot.dataset.populated = '1';
      }

      if (dateEl) {
        const d = new Date();
        const iso = d.toISOString().slice(0, 10);
        const br = `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
        dateEl.dateTime = iso;
        dateEl.textContent = br;
      }

      if (preview) preview.hidden = true;
      document.body.classList.remove('lab-mode-hero');
      document.body.classList.add('lab-mode-response');
      if (dossier) {
        renderSectionFlows();
        setupCollapsibleSections();
        if (vizSection) vizSection.classList.remove('lab-result-dossier__section--placeholder');
        refreshLabRdVizSectionHeadIcon();
        dossier.hidden = false;
        dossier.scrollIntoView({ behavior: 'smooth', block: 'start' });
        const titleEl = document.getElementById('lab-result-dossier-title');
        if (titleEl) {
          titleEl.setAttribute('tabindex', '-1');
          titleEl.focus({ preventScroll: true });
        }
      }
    });
  }

  rootEl.setAttribute('data-theme', 'dark');
  try {
    localStorage.setItem('disrupta-ui-theme', 'dark');
  } catch {
    /* ignore */
  }

  function applyPromptSuggestion(text) {
    input.value = text;
    if (centerInput) centerInput.value = text;
    updateStats();
    scheduleFitCenterTextarea();
    if (centerInput) {
      centerInput.dispatchEvent(new Event('input', { bubbles: true }));
      centerInput.focus();
    }
  }

  const suggestionsRoot = document.getElementById('lab-prompt-suggestions');
  if (suggestionsRoot) {
    suggestionsRoot.addEventListener('click', (ev) => {
      const btn = ev.target.closest('.lab-prompt-suggestions__card');
      if (!btn || !suggestionsRoot.contains(btn)) return;
      const t = btn.getAttribute('data-suggestion');
      if (!t) return;
      applyPromptSuggestion(t);
    });
  }

  /** Atalho: ⌘ em Apple, Ctrl nos restantes (alinhado ao keydown Meta/Ctrl+Enter). */
  function initContextBarModKeys() {
    const isMac = /Mac|iPhone|iPad|iPod/i.test(navigator.userAgent || '') || /Mac/i.test(navigator.platform || '');
    document.querySelectorAll('.lab-kbd--mod').forEach((kbd) => {
      kbd.textContent = isMac ? '⌘' : 'Ctrl';
    });
  }
  initContextBarModKeys();

  (function setupCenterPromptDrawer() {
    const drawer = document.getElementById('lab-center-prompt-drawer');
    const toggle = document.getElementById('lab-prompt-drawer-toggle');
    const panel = document.getElementById('lab-center-prompt-drawer-panel');
    const label = toggle && toggle.querySelector('.lab-center-prompt-drawer__toggle-label');
    if (!drawer || !toggle || !panel || !label) return;

    const inner = panel.querySelector('.lab-center-prompt-drawer__panel-inner');
    const STORAGE_KEY = 'disrupta-lab-prompt-drawer-expanded';

    function applyExpanded(isExpanded) {
      drawer.dataset.expanded = isExpanded ? 'true' : 'false';
      toggle.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
      panel.setAttribute('aria-hidden', isExpanded ? 'false' : 'true');
      if (inner) {
        if (isExpanded) inner.removeAttribute('inert');
        else inner.setAttribute('inert', '');
      }
      label.textContent = isExpanded
        ? label.getAttribute('data-expanded-label') || 'Recolher prompt inicial'
        : label.getAttribute('data-collapsed-label') || 'Expandir e editar prompt inicial';
      try {
        localStorage.setItem(STORAGE_KEY, isExpanded ? '1' : '0');
      } catch {
        /* ignore */
      }
    }

    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === '0') applyExpanded(false);
    } catch {
      /* ignore */
    }

    toggle.addEventListener('click', () => {
      applyExpanded(drawer.dataset.expanded !== 'true');
    });
  })();

  updateStats();
})();

/**
 * Modelo de “chat contexto” (placeholders rotativos + barra expandida + chips),
 * espelhado no padrão do componente React de referência, em vanilla — UI DIS.
 * Roteamento de agente / gate de contexto: skills/governance/Start.md (não invocado por este script).
 */
(function initLabCenterChatContext() {
  'use strict';

  const commandEl = document.getElementById('lab-center-command');
  const ta = document.getElementById('forge-input-center');
  const layer = document.getElementById('lab-center-chat-placeholder');
  const line = layer && layer.querySelector('.lab-chat-placeholder-layer__text');
  const chipRe = document.getElementById('lab-chip-refinar');
  const chipCtx = document.getElementById('lab-chip-contexto');

  if (!commandEl || !ta || !layer || !line) return;

  const PLACEHOLDERS = [
    'insira aqui a ideia que deseja refinar ou o problema que deseja resolver.',
    'Descreva a dor do utilizador e o resultado mensurável que imagina alcançar.',
    'Que hipótese de negócio ou produto quer validar nesta sessão?',
    'Qual contexto de mercado ou tendência quer associar à sua aposta?',
    'Resuma em poucas frases o problema — o dossié será montado a partir daqui.',
  ];

  const reduceMotion =
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let isActive = false;
  let phIndex = 0;
  let rotateTimer = null;

  const fromAttr = (ta.getAttribute('placeholder') || '').trim();
  if (fromAttr && !PLACEHOLDERS.includes(fromAttr)) {
    PLACEHOLDERS.unshift(fromAttr);
  }
  ta.removeAttribute('placeholder');

  function hasValue() {
    return ta.value.trim().length > 0;
  }

  function chipsOn() {
    return (
      (chipRe && chipRe.getAttribute('aria-pressed') === 'true') ||
      (chipCtx && chipCtx.getAttribute('aria-pressed') === 'true')
    );
  }

  function updateExpanded() {
    const open = isActive || hasValue() || chipsOn();
    commandEl.classList.toggle('lab-center-preview__command--expanded', open);
    const ctx = document.getElementById('lab-center-chat-context');
    if (ctx) ctx.setAttribute('aria-hidden', open ? 'false' : 'true');
  }

  function showPlaceholderLayer() {
    const show = !isActive && !hasValue();
    if (show) {
      layer.hidden = false;
      layer.setAttribute('aria-hidden', 'true');
      line.textContent = PLACEHOLDERS[phIndex];
      layer.classList.remove('is-fading');
    } else {
      layer.hidden = true;
      layer.classList.remove('is-fading');
    }
  }

  function tickPlaceholder() {
    if (isActive || hasValue()) return;
    if (!reduceMotion) layer.classList.add('is-fading');
    window.setTimeout(
      () => {
        if (isActive || hasValue()) return;
        phIndex = (phIndex + 1) % PLACEHOLDERS.length;
        line.textContent = PLACEHOLDERS[phIndex];
        layer.classList.remove('is-fading');
      },
      reduceMotion ? 0 : 380,
    );
  }

  function startRotate() {
    stopRotate();
    if (!hasValue() && !isActive) rotateTimer = window.setInterval(tickPlaceholder, 3000);
  }

  function stopRotate() {
    if (rotateTimer) {
      window.clearInterval(rotateTimer);
      rotateTimer = null;
    }
  }

  function activate() {
    isActive = true;
    updateExpanded();
    showPlaceholderLayer();
    stopRotate();
  }

  function deactivateIfEmpty() {
    if (hasValue()) return;
    isActive = false;
    updateExpanded();
    showPlaceholderLayer();
    startRotate();
  }

  document.addEventListener(
    'mousedown',
    (e) => {
      const t = e.target;
      if (!(t instanceof Node)) return;
      if (commandEl.contains(t)) activate();
      else deactivateIfEmpty();
    },
    true,
  );

  document.addEventListener('focusin', (e) => {
    const t = e.target;
    if (!(t instanceof Node)) return;
    if (commandEl.contains(t)) activate();
    else deactivateIfEmpty();
  });

  ta.addEventListener('input', () => {
    updateExpanded();
    if (hasValue()) stopRotate();
    else if (!isActive) startRotate();
    showPlaceholderLayer();
  });

  function wireChip(btn) {
    if (!btn) return;
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const on = btn.getAttribute('aria-pressed') === 'true';
      btn.setAttribute('aria-pressed', on ? 'false' : 'true');
      isActive = true;
      updateExpanded();
      showPlaceholderLayer();
      stopRotate();
    });
  }
  wireChip(chipRe);
  wireChip(chipCtx);

  line.textContent = PLACEHOLDERS[phIndex];
  showPlaceholderLayer();
  updateExpanded();
  if (!hasValue() && !isActive) startRotate();
})();

(function initSparkleField() {
  'use strict';

  const body = document.body;
  if (!body.classList.contains('page-laboratorio-ideias')) return;

  const mqFine = window.matchMedia('(pointer: fine)');
  const mqReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const CELL = 24;
  const REPULSE_R = 150;
  const REPULSE_R2 = REPULSE_R * REPULSE_R;
  const MAX_PUSH = 44;
  const EASE = 0.16;

  const canvas = document.createElement('canvas');
  canvas.id = 'lab-sparkle-field';
  canvas.setAttribute('aria-hidden', 'true');
  const mountBefore = document.querySelector('.lab-app');
  if (mountBefore) body.insertBefore(canvas, mountBefore);
  else body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let dpr = 1;
  /** @type {{ ox: number; oy: number; x: number; y: number; phase: number; layer: number }[]} */
  const particles = [];
  let mx = -1e9;
  let my = -1e9;
  let raf = 0;

  function pushGrid(offsetX, offsetY, layer) {
    const w = window.innerWidth;
    const h = window.innerHeight;
    for (let gx = offsetX; gx <= w + CELL; gx += CELL) {
      for (let gy = offsetY; gy <= h + CELL; gy += CELL) {
        particles.push({
          ox: gx,
          oy: gy,
          x: gx,
          y: gy,
          phase: (gx * 0.09 + gy * 0.07) % 6.28318,
          layer,
        });
      }
    }
  }

  function rebuild() {
    cancelAnimationFrame(raf);
    particles.length = 0;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = Math.max(1, Math.floor(w * dpr));
    canvas.height = Math.max(1, Math.floor(h * dpr));
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    pushGrid(0, 0, 0);
    pushGrid(CELL * 0.5, CELL * 0.5, 1);

    function frame(t) {
      const cw = window.innerWidth;
      const ch = window.innerHeight;
      const bg =
        getComputedStyle(body).getPropertyValue('--ds-bg-1').trim() ||
        getComputedStyle(document.documentElement).getPropertyValue('--ds-bg-1').trim() ||
        '#0a0a0a';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, cw, ch);

      const repulseOn = mqFine.matches && !mqReduceMotion.matches;
      const time = t * 0.001;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        let tx = p.ox;
        let ty = p.oy;
        if (repulseOn) {
          const dx = p.ox - mx;
          const dy = p.oy - my;
          const d2 = dx * dx + dy * dy;
          if (d2 < REPULSE_R2 && d2 > 0.25) {
            const d = Math.sqrt(d2);
            const fall = 1 - d / REPULSE_R;
            const push = MAX_PUSH * fall * fall;
            tx += (dx / d) * push;
            ty += (dy / d) * push;
          }
        }
        p.x += (tx - p.x) * EASE;
        p.y += (ty - p.y) * EASE;

        let base = p.layer ? 0.2 : 0.1;
        if (!mqReduceMotion.matches) {
          base *= 0.78 + 0.22 * (0.5 + 0.5 * Math.sin(time * 2.1 + p.phase));
        }
        const sz = p.layer ? 1.05 : 0.72;
        ctx.fillStyle = p.layer ? `rgba(165,165,165,${base})` : `rgba(255,255,255,${base})`;
        ctx.fillRect(p.x - sz * 0.5, p.y - sz * 0.5, sz, sz);
      }
      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);
  }

  function onMove(ev) {
    if (!mqFine.matches) return;
    mx = ev.clientX;
    my = ev.clientY;
  }

  function parkPointer() {
    mx = -1e9;
    my = -1e9;
  }

  window.addEventListener('mousemove', onMove, { passive: true });
  window.addEventListener('blur', parkPointer, { passive: true });
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') parkPointer();
  });

  mqReduceMotion.addEventListener('change', rebuild);
  mqFine.addEventListener('change', rebuild);
  window.addEventListener('resize', rebuild, { passive: true });

  rebuild();
})();

(function initFloatDashLab() {
  'use strict';

  const root = document.getElementById('float-dash');
  if (!root) return;

  root.setAttribute('data-expanded', 'false');
  document.body.classList.remove('float-dash-expanded');
  const expanded = document.getElementById('float-dash-expanded');
  const collapsed = document.getElementById('float-dash-collapsed');
  if (expanded) expanded.hidden = true;
  if (collapsed) collapsed.setAttribute('aria-hidden', 'false');
  try {
    localStorage.removeItem('disrupta-float-dash-expanded');
  } catch {
    /* ignore */
  }
})();

/**
 * Efeito dock (proximidade ao ponteiro) no float-dash colapsado — alinhado a skills/governance/Start.md.
 * Só com ponteiro fino e sem prefers-reduced-motion; caso contrário ficam as transições só em CSS.
 */
(function initFloatDashDockProximity() {
  'use strict';

  const dash = document.getElementById('float-dash');
  const surface = dash && dash.querySelector('.float-dash__surface');
  const collapsed = dash && dash.querySelector('.float-dash__collapsed');
  if (!dash || !surface || !collapsed || !document.body.classList.contains('page-laboratorio-ideias')) return;

  const mqReduce =
    typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mqFine =
    typeof window.matchMedia === 'function' && window.matchMedia('(pointer: fine)').matches;
  if (mqReduce || !mqFine) return;

  const INFL = 52;
  const MAX_SCALE = 1.14;
  const MAX_LIFT = 8;

  function iconButtons() {
    return collapsed.querySelectorAll('.float-dash__icon-btn');
  }

  function clearDockTransforms() {
    const nodes = iconButtons();
    for (let i = 0; i < nodes.length; i++) {
      const el = nodes[i];
      el.style.transform = '';
      el.style.zIndex = '';
    }
  }

  function paintDock(clientX, clientY) {
    if (dash.getAttribute('data-expanded') !== 'false') return;
    const nodes = iconButtons();
    for (let i = 0; i < nodes.length; i++) {
      const el = nodes[i];
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width * 0.5;
      const cy = r.top + r.height * 0.5;
      const d = Math.hypot(clientX - cx, clientY - cy);
      if (d > INFL * 1.75) {
        el.style.transform = '';
        el.style.zIndex = '';
        continue;
      }
      const t = Math.max(0, 1 - d / INFL);
      const s = t * t * (3 - 2 * t);
      const scale = 1 + s * (MAX_SCALE - 1);
      const lift = s * MAX_LIFT;
      el.style.transform = `translateY(${(-lift).toFixed(2)}px) scale(${scale.toFixed(3)})`;
      el.style.zIndex = String(10 + Math.round(s * 24));
    }
  }

  function onSurfaceMove(ev) {
    if (dash.getAttribute('data-expanded') !== 'false') return;
    paintDock(ev.clientX, ev.clientY);
  }

  surface.addEventListener('pointermove', onSurfaceMove, { passive: true });
  surface.addEventListener('pointerleave', clearDockTransforms, { passive: true });

  const mo = new MutationObserver(() => {
    if (dash.getAttribute('data-expanded') !== 'false') clearDockTransforms();
  });
  mo.observe(dash, { attributes: true, attributeFilter: ['data-expanded'] });
})();

/**
 * Menu Tokens (header): abre diálogo de planos — referência pricing-interaction + skills/governance/Start.md.
 * Vanilla (sem React / @number-flow); números animados com requestAnimationFrame.
 */
(function initLabPricingDialog() {
  'use strict';
  if (!document.body.classList.contains('page-laboratorio-ideias')) return;

  const dialog = document.getElementById('lab-pricing-dialog');
  const openBtns = document.querySelectorAll('.lab-tokens__open-pricing');
  const closeBtn = dialog && dialog.querySelector('.lab-pricing-dialog__close');
  const cta = dialog && dialog.querySelector('.lab-pricing__cta');
  const periodInner = dialog && dialog.querySelector('.lab-pricing__period-inner');
  const period0 = document.getElementById('lab-pricing-period-0');
  const period1 = document.getElementById('lab-pricing-period-1');
  const plansRoot = document.getElementById('lab-pricing-plans');
  const ring = document.getElementById('lab-pricing-ring');
  const starterEl = document.getElementById('lab-pricing-starter');
  const proEl = document.getElementById('lab-pricing-pro');
  const focusReturn = document.getElementById('lab-tokens-open-pricing');
  const anchor = document.querySelector('.lab-top-bar__tools .lab-tokens');

  if (!dialog || !openBtns.length || !periodInner || !plansRoot || !ring || !starterEl || !proEl) return;

  const PRICES = {
    starterMonth: 9.99,
    starterAnnual: 7.49,
    proMonth: 19.99,
    proAnnual: 17.49,
  };

  let period = 0;
  let activePlan = 0;

  function starterTarget() {
    return period === 0 ? PRICES.starterMonth : PRICES.starterAnnual;
  }

  function proTarget() {
    return period === 0 ? PRICES.proMonth : PRICES.proAnnual;
  }

  function parseNum(el) {
    const n = parseFloat(String(el.textContent).replace(',', '.'));
    return Number.isFinite(n) ? n : 0;
  }

  function tweenEl(el, to, duration) {
    const from = parseNum(el);
    if (duration <= 0 || Math.abs(from - to) < 0.001) {
      el.textContent = to.toFixed(2);
      return;
    }
    const start = performance.now();
    function frame(now) {
      const t = Math.min(1, (now - start) / duration);
      const s = t * t * (3 - 2 * t);
      const v = from + (to - from) * s;
      el.textContent = v.toFixed(2);
      if (t < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  function updatePeriodUi() {
    periodInner.dataset.period = String(period);
    if (period0) {
      period0.classList.toggle('is-active', period === 0);
      period0.setAttribute('aria-pressed', period === 0 ? 'true' : 'false');
    }
    if (period1) {
      period1.classList.toggle('is-active', period === 1);
      period1.setAttribute('aria-pressed', period === 1 ? 'true' : 'false');
    }
  }

  function updateRing() {
    const plans = plansRoot.querySelectorAll('.lab-pricing__plan');
    const active = plans[activePlan];
    if (!active) return;
    ring.style.top = `${active.offsetTop}px`;
    ring.style.height = `${active.offsetHeight}px`;
  }

  function updatePlansUi() {
    const plans = plansRoot.querySelectorAll('.lab-pricing__plan');
    for (let i = 0; i < plans.length; i++) {
      plans[i].setAttribute('aria-pressed', i === activePlan ? 'true' : 'false');
    }
    updateRing();
  }

  function applyPricesTween() {
    const reduce =
      typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const duration = reduce ? 0 : 400;
    tweenEl(starterEl, starterTarget(), duration);
    tweenEl(proEl, proTarget(), duration);
  }

  function setPeriod(next) {
    period = next;
    updatePeriodUi();
    applyPricesTween();
    if (dialog.open) requestAnimationFrame(() => positionPricingDialog());
  }

  function setPlan(next) {
    activePlan = next;
    updatePlansUi();
    if (dialog.open) requestAnimationFrame(() => positionPricingDialog());
  }

  const GAP_PX = 10;
  const VIEW_PAD = 16;

  function positionPricingDialog() {
    if (!dialog.open || !anchor) return;
    const r = anchor.getBoundingClientRect();
    const vw = window.innerWidth || 0;
    const vh = window.innerHeight || 0;

    dialog.style.margin = '0';
    dialog.style.position = 'fixed';
    dialog.style.bottom = 'auto';
    dialog.style.transform = 'none';

    const rightEdge = r.right;
    const w = dialog.offsetWidth || dialog.getBoundingClientRect().width;

    if (rightEdge - w < VIEW_PAD) {
      dialog.style.right = 'auto';
      dialog.style.left = `${VIEW_PAD}px`;
    } else {
      dialog.style.left = 'auto';
      dialog.style.right = `${Math.round(vw - rightEdge)}px`;
    }

    let top = r.bottom + GAP_PX;
    let h = dialog.getBoundingClientRect().height;
    const maxTop = vh - VIEW_PAD - h;
    if (top > maxTop && maxTop >= VIEW_PAD) {
      top = maxTop;
    }
    dialog.style.top = `${Math.round(top)}px`;

    h = dialog.getBoundingClientRect().height;
    if (top + h > vh - VIEW_PAD) {
      dialog.style.maxHeight = `${Math.max(180, Math.round(vh - top - VIEW_PAD))}px`;
    } else {
      dialog.style.maxHeight = '';
    }
  }

  function openDialog() {
    if (typeof dialog.showModal !== 'function') {
      window.alert('Seu navegador não suporta diálogo modal nativo.');
      return;
    }
    dialog.showModal();
    updatePeriodUi();
    starterEl.textContent = starterTarget().toFixed(2);
    proEl.textContent = proTarget().toFixed(2);
    updatePlansUi();
    requestAnimationFrame(() => {
      positionPricingDialog();
      updateRing();
      requestAnimationFrame(() => positionPricingDialog());
    });
  }

  for (let i = 0; i < openBtns.length; i++) {
    openBtns[i].addEventListener('click', (ev) => {
      ev.preventDefault();
      openDialog();
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', () => dialog.close());
  }
  if (cta) {
    cta.addEventListener('click', () => dialog.close());
  }

  dialog.addEventListener('click', (ev) => {
    if (ev.target === dialog) dialog.close();
  });

  if (period0) period0.addEventListener('click', () => setPeriod(0));
  if (period1) period1.addEventListener('click', () => setPeriod(1));

  const planNodes = plansRoot.querySelectorAll('.lab-pricing__plan');
  for (let i = 0; i < planNodes.length; i++) {
    planNodes[i].addEventListener('click', () => setPlan(i));
  }

  function onDialogLayoutRefresh() {
    if (!dialog.open) return;
    positionPricingDialog();
    updateRing();
  }

  window.addEventListener('resize', onDialogLayoutRefresh, { passive: true });
  window.addEventListener('scroll', onDialogLayoutRefresh, { passive: true, capture: true });

  if (anchor && typeof ResizeObserver !== 'undefined') {
    const ro = new ResizeObserver(() => {
      if (dialog.open) positionPricingDialog();
    });
    ro.observe(anchor);
  }

  dialog.addEventListener('close', () => {
    ['top', 'right', 'left', 'bottom', 'maxHeight'].forEach((p) => dialog.style.removeProperty(p));
    if (focusReturn && typeof focusReturn.focus === 'function') {
      focusReturn.focus({ preventScroll: true });
    }
  });
})();

/** Spotlight nas secções do dossié: coords locais por secção (getBoundingClientRect), não fixed. */
(function initDossierSectionSpotlight() {
  'use strict';

  const dossier = document.getElementById('lab-result-dossier');
  if (!dossier) return;

  const mqReduce =
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (mqReduce) return;

  const selector = '.lab-result-dossier__section:not(.lab-result-dossier__section--placeholder)';

  function syncPointer(ev) {
    if (dossier.hidden) return;
    const w = window.innerWidth || 1;
    const h = window.innerHeight || 1;
    const xp = ev.clientX / w;
    const yp = ev.clientY / h;
    const cards = dossier.querySelectorAll(selector);
    for (let i = 0; i < cards.length; i++) {
      const el = cards[i];
      const r = el.getBoundingClientRect();
      el.style.setProperty('--spot-lx', `${ev.clientX - r.left}px`);
      el.style.setProperty('--spot-ly', `${ev.clientY - r.top}px`);
      el.style.setProperty('--lab-spot-xp', String(xp));
      el.style.setProperty('--lab-spot-yp', String(yp));
    }
  }

  window.addEventListener('pointermove', syncPointer, { passive: true });
})();

(function initLabNotifyDialog() {
  'use strict';
  const dialog = document.getElementById('lab-notify-dialog');
  const trigger = document.getElementById('lab-notify-trigger');
  if (!dialog || !trigger) return;

  const tabs = dialog.querySelectorAll('.lab-notify-dialog__tab');
  const panels = dialog.querySelectorAll('.lab-notify-dialog__content');
  const VIEW_PAD = 16;
  const GAP_PX = 10;

  function positionDialog() {
    if (!dialog.open) return;
    const r = trigger.getBoundingClientRect();
    const vw = window.innerWidth || 0;
    const vh = window.innerHeight || 0;

    dialog.style.margin = '0';
    dialog.style.position = 'fixed';
    dialog.style.bottom = 'auto';
    dialog.style.transform = 'none';

    const rightEdge = r.right;
    const w = dialog.offsetWidth || dialog.getBoundingClientRect().width;

    if (rightEdge - w < VIEW_PAD) {
      dialog.style.right = 'auto';
      dialog.style.left = `${VIEW_PAD}px`;
    } else {
      dialog.style.left = 'auto';
      dialog.style.right = `${Math.round(vw - rightEdge)}px`;
    }

    const topEdge = r.bottom + GAP_PX;
    const h = dialog.offsetHeight || dialog.getBoundingClientRect().height;

    if (topEdge + h > vh - VIEW_PAD) {
      dialog.style.top = 'auto';
      dialog.style.bottom = `${Math.round(vh - r.top + GAP_PX)}px`;
    } else {
      dialog.style.bottom = 'auto';
      dialog.style.top = `${Math.round(topEdge)}px`;
    }
  }

  trigger.addEventListener('click', () => {
    if (dialog.open) {
      dialog.close();
    } else {
      dialog.showModal();
      positionDialog();
      trigger.setAttribute('aria-expanded', 'true');
    }
  });

  dialog.addEventListener('close', () => {
    trigger.setAttribute('aria-expanded', 'false');
    trigger.focus();
  });

  dialog.addEventListener('click', (ev) => {
    if (ev.target === dialog) dialog.close();
  });

  const closeBtns = dialog.querySelectorAll('.lab-notify-dialog__link');
  for (let i = 0; i < closeBtns.length; i++) {
    closeBtns[i].addEventListener('click', (e) => {
      e.preventDefault();
      dialog.close();
    });
  }

  const closeDialogBtn = document.getElementById('lab-notify-close');
  if (closeDialogBtn) {
    closeDialogBtn.addEventListener('click', () => dialog.close());
  }

  window.addEventListener('resize', () => {
    if (dialog.open) requestAnimationFrame(positionDialog);
  }, { passive: true });

  window.addEventListener('scroll', () => {
    if (dialog.open) requestAnimationFrame(positionDialog);
  }, { passive: true });

  for (let i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener('click', () => {
      tabs.forEach(t => t.setAttribute('aria-selected', 'false'));
      panels.forEach(p => p.hidden = true);
      tabs[i].setAttribute('aria-selected', 'true');
      const panelId = tabs[i].getAttribute('aria-controls');
      const panel = document.getElementById(panelId);
      if (panel) panel.hidden = false;
      positionDialog();
    });
  }

  // Lógica de Arquivamento e Feedback (IAA Framework)
  const archiveBtns = dialog.querySelectorAll('.lab-notify-dialog__item-action');
  const toast = document.createElement('div');
  toast.className = 'lab-toast lab-toast--hidden';
  toast.innerHTML = `
    <span>ITEM ARQUIVADO</span>
    <button type="button" class="lab-toast__action">Desfazer</button>
  `;
  const panelContainer = dialog.querySelector('.lab-notify-dialog__panel');
  if (panelContainer) panelContainer.appendChild(toast);

  let toastTimeout;

  function showToast(message) {
    clearTimeout(toastTimeout);
    toast.querySelector('span').textContent = message;
    toast.classList.remove('lab-toast--hidden');
    toastTimeout = setTimeout(() => {
      toast.classList.add('lab-toast--hidden');
    }, 4000);
  }

  archiveBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const item = btn.closest('.lab-notify-dialog__item');
      if (item) {
        item.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
        item.style.opacity = '0';
        item.style.transform = 'translateX(10px)';
        setTimeout(() => {
          item.style.display = 'none';
          showToast('ITEM ARQUIVADO');
        }, 200);
      }
    });
  });

  const undoBtn = toast.querySelector('.lab-toast__action');
  if (undoBtn) {
    undoBtn.addEventListener('click', () => {
      toast.classList.add('lab-toast--hidden');
      dialog.querySelectorAll('.lab-notify-dialog__item').forEach(item => {
        item.style.display = '';
        setTimeout(() => {
          item.style.opacity = '1';
          item.style.transform = 'translateX(0)';
        }, 10);
      });
    });
  }
})();

(function initLabProfileDialog() {
  'use strict';
  const dialog = document.getElementById('lab-profile-dialog');
  const trigger = document.getElementById('lab-profile-trigger');
  if (!dialog || !trigger) return;

  const VIEW_PAD = 16;
  const GAP_PX = 10;

  function positionDialog() {
    if (!dialog.open) return;
    const r = trigger.getBoundingClientRect();
    const vw = window.innerWidth || 0;
    const vh = window.innerHeight || 0;

    dialog.style.margin = '0';
    dialog.style.position = 'fixed';
    dialog.style.bottom = 'auto';
    dialog.style.transform = 'none';

    const rightEdge = r.right;
    const w = dialog.offsetWidth || dialog.getBoundingClientRect().width;

    if (rightEdge - w < VIEW_PAD) {
      dialog.style.right = 'auto';
      dialog.style.left = `${VIEW_PAD}px`;
    } else {
      dialog.style.left = 'auto';
      dialog.style.right = `${Math.round(vw - rightEdge)}px`;
    }

    const topEdge = r.bottom + GAP_PX;
    const h = dialog.offsetHeight || dialog.getBoundingClientRect().height;

    if (topEdge + h > vh - VIEW_PAD) {
      dialog.style.top = 'auto';
      dialog.style.bottom = `${Math.round(vh - r.top + GAP_PX)}px`;
    } else {
      dialog.style.bottom = 'auto';
      dialog.style.top = `${Math.round(topEdge)}px`;
    }
  }

  trigger.addEventListener('click', () => {
    if (dialog.open) {
      dialog.close();
    } else {
      dialog.showModal();
      positionDialog();
      trigger.setAttribute('aria-expanded', 'true');
    }
  });

  dialog.addEventListener('close', () => {
    trigger.setAttribute('aria-expanded', 'false');
    trigger.focus();
  });

  dialog.addEventListener('click', (ev) => {
    if (ev.target === dialog) dialog.close();
  });

  const langItems = dialog.querySelectorAll('.lab-profile-dialog__lang-item');
  langItems.forEach(item => {
    item.addEventListener('click', () => {
      langItems.forEach(i => i.setAttribute('aria-selected', 'false'));
      item.setAttribute('aria-selected', 'true');
    });
  });

  window.addEventListener('resize', () => {
    if (dialog.open) requestAnimationFrame(positionDialog);
  }, { passive: true });

  window.addEventListener('scroll', () => {
    if (dialog.open) requestAnimationFrame(positionDialog);
  }, { passive: true });
})();
