// Inject and init everything. We could just put it all in 'index.html',
// but it's more flexible this way.
(function () {
  const scriptEl = document.createElement('script');
  scriptEl.setAttribute('src', 'index.js');
  document.head.appendChild(scriptEl);

  const styleEl = document.createElement('link');
  styleEl.setAttribute('href', 'index.css');
  styleEl.setAttribute('rel', 'stylesheet');
  document.head.appendChild(styleEl);
})();
