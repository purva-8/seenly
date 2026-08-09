// Dark mode
const root = document.documentElement;
const darkToggle = document.getElementById('darkToggle');
if (localStorage.getItem('theme') === 'dark') root.setAttribute('data-theme', 'dark');
if (darkToggle) {
  darkToggle.addEventListener('click', () => {
    const isDark = root.getAttribute('data-theme') === 'dark';
    root.setAttribute('data-theme', isDark ? 'light' : 'dark');
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
  });
}

// Flip counter: 0 -> 1  ...  1 -> 100
(function () {
  var odo = document.querySelector('.sc-odo');
  if (!odo) return;

  var L = odo.querySelector('[data-side="l"]');
  var R = odo.querySelector('[data-side="r"]');
  if (!L || !R) return;

  // Each reel holds two identical runs of 0-9 plus a blank, so a roll can
  // always travel forward into the second run and then snap back invisibly.
  var RUN = 11;          // 0-9 plus blank
  var BLANK = 10;
  var SPIN = 820;        // ms

  function makeReel() {
    var reel = document.createElement('span');
    reel.className = 'reel';
    var html = '';
    for (var c = 0; c < 2; c++) {
      for (var n = 0; n < 10; n++) html += '<b>' + n + '</b>';
      html += '<b>&nbsp;</b>';
    }
    reel.innerHTML = '<span class="strip">' + html + '</span>';
    return reel;
  }
  function stripOf(reel) { return reel.firstChild; }

  var left = [makeReel()];
  var right = [makeReel(), makeReel(), makeReel()];
  left.forEach(function (r) { L.appendChild(r); });
  right.forEach(function (r) { R.appendChild(r); });

  // right side is 3 wide, blanks pad the shorter value
  var STATES = [
    { l: '0', r: '  1' },
    { l: '1', r: '100' }
  ];

  function slot(ch) { return ch === ' ' ? BLANK : Number(ch); }

  function place(reel, ch) {
    var s = stripOf(reel);
    s.style.transition = 'none';
    s.style.transform = 'translateY(-' + slot(ch) + 'em)';
  }

  function roll(reel, ch, delay) {
    var s = stripOf(reel);
    var i = slot(ch);
    setTimeout(function () {
      s.style.transition = 'transform ' + SPIN + 'ms cubic-bezier(.2,.85,.25,1)';
      s.style.transform = 'translateY(-' + (RUN + i) + 'em)';
      setTimeout(function () {
        s.style.transition = 'none';
        s.style.transform = 'translateY(-' + i + 'em)';
      }, SPIN + 40);
    }, delay);
  }

  function apply(state, animate) {
    var rc = state.r.split('');
    if (!animate) {
      place(left[0], state.l);
      rc.forEach(function (ch, k) { place(right[k], ch); });
      return;
    }
    roll(left[0], state.l, 0);
    rc.forEach(function (ch, k) { roll(right[k], ch, 80 * (k + 1)); });
  }

  var i = 0;
  apply(STATES[0], false);

  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    setInterval(function () {
      i = (i + 1) % STATES.length;
      apply(STATES[i], true);
    }, 3200);
  }
})();
