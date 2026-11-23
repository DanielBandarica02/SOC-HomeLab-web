/* Tabs in the code window + copy buttons on command blocks. */
document.querySelectorAll('[data-tabs]').forEach(function (group) {
  var buttons = group.querySelectorAll('.tabs button');
  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      buttons.forEach(function (b) {
        b.setAttribute('aria-selected', String(b === btn));
      });
      group.querySelectorAll('[data-panel]').forEach(function (panel) {
        panel.hidden = panel.getAttribute('data-panel') !== btn.getAttribute('data-tab');
      });
    });
  });
});

document.querySelectorAll('.cmd-bar button').forEach(function (btn) {
  btn.addEventListener('click', function () {
    var pre = btn.closest('.cmd').querySelector('pre');
    if (!pre) return;
    var done = function (ok) {
      btn.textContent = ok ? 'copiado' : 'no se pudo copiar';
      setTimeout(function () { btn.textContent = 'copiar'; }, 1600);
    };
    try {
      navigator.clipboard.writeText(pre.innerText).then(function () { done(true); }, function () { done(false); });
    } catch (e) {
      done(false);
    }
  });
});
