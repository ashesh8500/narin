// The Yellow Couch scene — click the couch to "sit" and reveal the line
// that locked everything into place. Also spawns drifting warm particles.

export function initCouch() {
  const scene = document.querySelector('.scene');
  const couch = document.querySelector('.couch-shape');
  if (!scene || !couch) return;

  couch.setAttribute('role', 'button');
  couch.setAttribute('tabindex', '0');
  couch.setAttribute('aria-label', 'Sit on the yellow couch');

  const toggle = () => scene.classList.toggle('is-open');
  couch.addEventListener('click', toggle);
  couch.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
  });

  // spawn drifting heat particles
  const stage = scene.querySelector('.scene-stage');
  for (let i = 0; i < 14; i++) {
    const p = document.createElement('span');
    p.className = 'heat';
    const left = 20 + Math.random() * 60;
    p.style.left = left + '%';
    p.style.bottom = '40px';
    p.style.setProperty('--dx', (Math.random() * 60 - 30) + 'px');
    p.style.animationDelay = (Math.random() * 9) + 's';
    p.style.animationDuration = (7 + Math.random() * 5) + 's';
    stage.appendChild(p);
  }
}
