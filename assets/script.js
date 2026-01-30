// Toggle mobile nav
const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.getElementById('mainNav');

if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    mainNav.classList.toggle('open');
  });
}

// Video modal (lazy-load iframe)
const modal = document.getElementById('videoModal');
const videoWrapper = document.getElementById('videoWrapper');
const closeButtons = document.querySelectorAll('.close-modal');

function openModal(videoId) {
  if (!videoId) return;
  // Insert iframe
  const iframe = document.createElement('iframe');
  iframe.setAttribute('src', `https://www.youtube.com/embed/${videoId}?rel=0&autoplay=1`);
  iframe.setAttribute('title', 'YouTube video');
  iframe.setAttribute('allow', 'autoplay; encrypted-media');
  iframe.setAttribute('loading', 'lazy');
  iframe.style.width = '100%';
  iframe.style.height = '100%';
  iframe.setAttribute('frameborder', '0');
  videoWrapper.innerHTML = '';
  videoWrapper.appendChild(iframe);

  modal.setAttribute('aria-hidden', 'false');
}

function closeModal() {
  videoWrapper.innerHTML = '';
  modal.setAttribute('aria-hidden', 'true');
}

// Wire up open buttons
document.querySelectorAll('.video-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const id = btn.dataset.video;
    openModal(id);
  });
});

// Wire up close controls
closeButtons.forEach(b => b.addEventListener('click', closeModal));
modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
