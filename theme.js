/* Light/dark theme toggle.
   Default follows the visitor's OS setting (via CSS prefers-color-scheme);
   an explicit choice is stored in localStorage and overrides the OS setting.
   The no-flash snippet that applies the saved choice lives inline in each
   page's <head>; this file only wires up the toggle button. */
(function () {
  var root = document.documentElement;
  var btn = document.querySelector('.theme-toggle');
  if (!btn) return;
  var icon = btn.querySelector('i');
  var mql = window.matchMedia('(prefers-color-scheme: dark)');

  function resolved() {
    var attr = root.getAttribute('data-theme');
    if (attr === 'dark' || attr === 'light') return attr;
    return mql.matches ? 'dark' : 'light';
  }

  function sync() {
    var mode = resolved();
    if (icon) icon.className = mode === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    btn.setAttribute('aria-label', mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  }

  btn.addEventListener('click', function () {
    var mode = resolved() === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', mode);
    try { localStorage.setItem('theme', mode); } catch (e) {}
    sync();
  });

  // If the OS theme changes and the visitor hasn't made an explicit choice,
  // keep the button icon in sync.
  try {
    mql.addEventListener('change', function () {
      if (!root.getAttribute('data-theme')) sync();
    });
  } catch (e) {}

  sync();
})();
