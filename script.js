const slides = window.ARCHE_SLIDES || [];
let index = 0;
const img = document.getElementById('slideImg');
const title = document.getElementById('slideTitle');
const current = document.getElementById('currentSlide');
const total = document.getElementById('totalSlides');
const filmstrip = document.getElementById('filmstrip');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const presentBtn = document.getElementById('presentBtn');

total.textContent = String(slides.length).padStart(2, '0');
slides.forEach((slide, i) => {
  const btn = document.createElement('button');
  btn.className = 'thumb';
  btn.type = 'button';
  btn.ariaLabel = `Go to slide ${i + 1}: ${slide.title}`;
  const t = document.createElement('img');
  t.src = slide.src;
  t.alt = '';
  t.loading = 'lazy';
  btn.appendChild(t);
  btn.addEventListener('click', () => go(i));
  filmstrip.appendChild(btn);
});

function go(i) {
  index = Math.max(0, Math.min(slides.length - 1, i));
  const slide = slides[index];
  img.src = slide.src;
  img.alt = `Slide ${index + 1}: ${slide.title}`;
  title.textContent = slide.title;
  current.textContent = String(index + 1).padStart(2, '0');
  document.querySelectorAll('.thumb').forEach((el, n) => el.classList.toggle('active', n === index));
  const active = document.querySelector('.thumb.active');
  if (active) active.scrollIntoView({block: 'nearest', inline: 'nearest'});
}
function next() { go(index + 1); }
function prev() { go(index - 1); }
prevBtn.addEventListener('click', prev);
nextBtn.addEventListener('click', next);
presentBtn.addEventListener('click', () => {
  const shell = document.querySelector('.deck-shell');
  if (!document.fullscreenElement) shell.requestFullscreen?.();
  else document.exitFullscreen?.();
});
document.addEventListener('keydown', (e) => {
  if (['ArrowRight', 'PageDown', ' '].includes(e.key)) { e.preventDefault(); next(); }
  if (['ArrowLeft', 'PageUp'].includes(e.key)) { e.preventDefault(); prev(); }
  if (e.key === 'Home') { e.preventDefault(); go(0); }
  if (e.key === 'End') { e.preventDefault(); go(slides.length - 1); }
});
let startX = null;
document.addEventListener('touchstart', e => { startX = e.changedTouches[0].clientX; }, {passive: true});
document.addEventListener('touchend', e => {
  if (startX == null) return;
  const dx = e.changedTouches[0].clientX - startX;
  if (Math.abs(dx) > 50) dx < 0 ? next() : prev();
  startX = null;
}, {passive: true});
go(0);
