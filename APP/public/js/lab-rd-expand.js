/**
 * Expansão em árvore para cards de resposta (dossié / relatório).
 * Anima height + opacity e indenta filhos com border-left (estilo file tree).
 */
(function (global) {
  'use strict';

  const DURATION_MS = 200;

  /**
   * @param {HTMLElement} el
   * @param {boolean} open
   */
  function setTreeExpanded(el, open) {
    el.setAttribute('data-expanded', open ? 'true' : 'false');
    el.setAttribute('aria-hidden', open ? 'false' : 'true');
  }

  /**
   * @param {HTMLElement} trigger
   * @param {HTMLElement} branchHost grid anim wrapper
   * @param {boolean} open
   * @param {{ onIcon?: (open: boolean) => void }} [opts]
   */
  function bindTreeToggle(trigger, branchHost, open, opts) {
    setTreeExpanded(branchHost, open);
    trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (opts && typeof opts.onIcon === 'function') opts.onIcon(open);
  }

  /**
   * Acordeão / itens com [data-tree-item]
   * @param {ParentNode} root
   */
  function setupTreeAccordion(root) {
    if (!root || root.dataset.treeReady === '1') return;
    const items = root.querySelectorAll('[data-tree-item]');
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const trigger = item.querySelector('[data-tree-trigger]');
      const branchHost = item.querySelector('[data-tree-branch-host]');
      if (!trigger || !branchHost) continue;

      const chevron = trigger.querySelector('[data-tree-chevron]');
      const icon = trigger.querySelector('[data-tree-icon]');
      const startOpen = item.getAttribute('data-tree-open') === 'true';

      bindTreeToggle(trigger, branchHost, startOpen, {
        onIcon(open) {
          if (chevron) chevron.textContent = open ? '▾' : '▸';
          if (icon) icon.classList.toggle('is-expanded', open);
        },
      });

      const toggle = () => {
        const expanded = trigger.getAttribute('aria-expanded') === 'true';
        bindTreeToggle(trigger, branchHost, !expanded, {
          onIcon(open) {
            if (chevron) chevron.textContent = open ? '▾' : '▸';
            if (icon) icon.classList.toggle('is-expanded', open);
          },
        });
      };

      trigger.addEventListener('click', toggle);
      trigger.addEventListener('keydown', (e) => {
        if (e.key !== 'Enter' && e.key !== ' ') return;
        e.preventDefault();
        toggle();
      });
    }
    root.dataset.treeReady = '1';
  }

  /**
   * Painel único (ex.: lab-section-flow) já montado no DOM
   * @param {HTMLElement} trigger
   * @param {HTMLElement} branchHost
   * @param {boolean} [startOpen]
   */
  function setupTreePanel(trigger, branchHost, startOpen) {
    if (!trigger || !branchHost || branchHost.dataset.treePanelReady === '1') return;
    const chevron = trigger.querySelector('[data-tree-chevron]');
    const open = startOpen === true;
    bindTreeToggle(trigger, branchHost, open, {
      onIcon(isOpen) {
        if (chevron) chevron.textContent = isOpen ? '▾' : '▸';
      },
    });
    const toggle = () => {
      const expanded = trigger.getAttribute('aria-expanded') === 'true';
      bindTreeToggle(trigger, branchHost, !expanded, {
        onIcon(isOpen) {
          if (chevron) chevron.textContent = isOpen ? '▾' : '▸';
        },
      });
    };
    trigger.addEventListener('click', (ev) => {
      ev.preventDefault();
      toggle();
    });
    trigger.addEventListener('keydown', (e) => {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      e.preventDefault();
      toggle();
    });
    branchHost.dataset.treePanelReady = '1';
  }

  global.DisruptaLabRdExpand = {
    DURATION_MS,
    setTreeExpanded,
    setupTreeAccordion,
    setupTreePanel,
  };
})(typeof window !== 'undefined' ? window : globalThis);
