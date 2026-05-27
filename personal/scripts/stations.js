// Stations — expandable items along the journey.

export function initStations() {
  const stations = document.querySelectorAll('.station');
  stations.forEach((s) => {
    s.setAttribute('role', 'button');
    s.setAttribute('tabindex', '0');
    s.setAttribute('aria-expanded', 'false');
    const toggle = () => {
      const open = s.getAttribute('aria-expanded') === 'true';
      s.setAttribute('aria-expanded', String(!open));
    };
    s.addEventListener('click', toggle);
    s.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
    });
  });
}
