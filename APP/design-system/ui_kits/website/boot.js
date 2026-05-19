/**
 * Carrega componentes .jsx em ordem (Babel standalone não garante ordem com script[src]).
 */
(function () {
  "use strict";

  var FILES = ["HudButton.jsx", "Nav.jsx", "Hero.jsx", "AuditGrid.jsx", "FinalCTA.jsx"];

  var APP_SOURCE =
    "const App = () => (\n" +
    "  React.createElement('main', { id: 'main' },\n" +
    "    React.createElement(Nav),\n" +
    "    React.createElement(Hero),\n" +
    "    React.createElement(AuditGrid),\n" +
    "    React.createElement(FinalCTA),\n" +
    "    React.createElement(Footer)\n" +
    "  )\n" +
    ");\n" +
    "ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App));";

  function showError(message) {
    var root = document.getElementById("root");
    if (!root) return;
    root.innerHTML =
      '<p style="font-family:ui-monospace,monospace;padding:2rem;color:#ff8a80;max-width:52ch">' +
      "UI Kit: " +
      message +
      "</p>";
  }

  function runTransformed(code) {
    var result = Babel.transform(code, { presets: ["react"] });
    var script = result.code + "\n//# sourceURL=ui-kit-component.js";
    (0, eval)(script);
  }

  async function loadFile(name) {
    var res = await fetch(name);
    if (!res.ok) {
      throw new Error("Falha ao carregar " + name + " (" + res.status + ")");
    }
    return res.text();
  }

  async function boot() {
    if (!window.React || !window.ReactDOM || !window.Babel) {
      showError("React, ReactDOM ou Babel não carregaram.");
      return;
    }

    try {
      for (var i = 0; i < FILES.length; i++) {
        var src = await loadFile(FILES[i]);
        runTransformed(src);
      }

      if (typeof window.Nav !== "function" || typeof window.Footer !== "function") {
        throw new Error("Componentes não registrados no window após o parse.");
      }

      runTransformed(APP_SOURCE);
    } catch (err) {
      console.error(err);
      showError(err.message || String(err));
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
