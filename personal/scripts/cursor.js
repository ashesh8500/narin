// Custom cursor — a small candle that follows the visitor.
// The dot tracks instantly; the glow lags with easing for a "warm light" feel.

export function initCursor() {
  if (window.matchMedia('(hover: none)').matches) return;

  const dot  = document.createElement('div');
  const glow = document.createElement('div');
  dot.className  = 'cursor';
  glow.className = 'cursor-glow';
  document.body.append(glow, dot);

  let tx = window.innerWidth / 2, ty = window.innerHeight / 2;
  let gx = tx, gy = ty;

  window.addEventListener('mousemove', (e) => {
    tx = e.clientX; ty = e.clientY;
    dot.style.transform = `translate(${tx}px, ${ty}px) translate(-50%, -50%)`;
  }, { passive: true });

  // smooth-follow loop for the glow
  const tick = () => {
    gx += (tx - gx) * 0.12;
    gy += (ty - gy) * 0.12;
    glow.style.transform = `translate(${gx}px, ${gy}px) translate(-50%, -50%)`;
    requestAnimationFrame(tick);
  };
  tick();

  // hover states on interactive elements
  const hoverables = 'a, button, [data-hover], .couch-shape, .station, .contact-card';
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(hoverables)) dot.classList.add('is-hover');
  });
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(hoverables)) dot.classList.remove('is-hover');
  });
  document.addEventListener('mousedown', () => dot.classList.add('is-pressed'));
  document.addEventListener('mouseup',   () => dot.classList.remove('is-pressed'));

  // observe section theme — recolor candle on dark backgrounds
  const dark = document.querySelectorAll('.couch, .words');
  const io = new IntersectionObserver((entries) => {
    let onDark = false;
    entries.forEach(e => { if (e.isIntersecting && e.intersectionRatio > 0.4) onDark = true; });
    document.body.classList.toggle('theme-dark', onDark);
  }, { threshold: [0.4] });
  dark.forEach(el => io.observe(el));
}
