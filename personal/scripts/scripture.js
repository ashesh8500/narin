// Cycle through scripture / quotes in the Words section.

export function initScripture() {
  const items = document.querySelectorAll('.scripture-stack .scripture');
  if (items.length === 0) return;
  let i = 0;
  items[0].classList.add('is-active');
  setInterval(() => {
    items[i].classList.remove('is-active');
    i = (i + 1) % items.length;
    items[i].classList.add('is-active');
  }, 6500);
}
