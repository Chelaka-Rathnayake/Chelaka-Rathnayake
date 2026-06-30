/* SCROLL PROGRESS */
const bar = document.getElementById('progress-bar');
window.addEventListener('scroll', () => {
  const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
  bar.style.width = pct + '%';
}, {passive: true});

/* MOBILE MENU */
function toggleMobileMenu() {
  const nav = document.getElementById('nav-links');
  const ham = document.getElementById('hamburger');
  const overlay = document.getElementById('mobile-overlay');
  nav.classList.toggle('open');
  ham.classList.toggle('open');
  overlay.classList.toggle('show');
}
function closeMobileMenu() {
  document.getElementById('nav-links').classList.remove('open');
  document.getElementById('hamburger').classList.remove('open');
  document.getElementById('mobile-overlay').classList.remove('show');
}

/* SCROLL REVEAL */
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
  });
}, {threshold: 0.1});
document.querySelectorAll('.reveal,.reveal-left,.reveal-right').forEach(el => obs.observe(el));

/* NAV ACTIVE */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let cur = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 80) cur = s.id; });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + cur ? 'var(--magenta)' : '';
  });
}, {passive: true});

/* PROFILE PHOTO UPLOAD — syncs hero + about */
function setProfilePhoto(input) {
  if (!input.files || !input.files[0]) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    const src = e.target.result;
    // Hero
    const heroImg = document.getElementById('hero-photo-img');
    const heroPlaceholder = document.getElementById('hero-photo-placeholder');
    if (heroImg) { heroImg.src = src; heroImg.style.display = 'block'; }
    if (heroPlaceholder) heroPlaceholder.style.display = 'none';
    // About
    const aboutImg = document.getElementById('about-photo-img');
    const aboutPlaceholder = document.getElementById('about-photo-placeholder');
    const aboutChange = document.getElementById('about-photo-change');
    if (aboutImg) { aboutImg.src = src; aboutImg.style.display = 'block'; }
    if (aboutPlaceholder) aboutPlaceholder.style.display = 'none';
    if (aboutChange) aboutChange.style.display = 'flex';
    try { localStorage.setItem('profile-photo', src); } catch(err) {}
  };
  reader.readAsDataURL(input.files[0]);
}

/* PROJECT IMAGE UPLOAD */
function setProjectImg(id, input) {
  if (!input.files || !input.files[0]) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    const img = document.getElementById('imgshow-' + id);
    const placeholder = document.getElementById('img-' + id);
    img.src = e.target.result;
    img.style.display = 'block';
    placeholder.style.display = 'none';
    try { localStorage.setItem('proj-img-' + id, e.target.result); } catch(err) {}
  };
  reader.readAsDataURL(input.files[0]);
}

/* Restore saved images */
document.addEventListener('DOMContentLoaded', function() {
  // Restore profile photo
  try {
    const savedProfile = localStorage.getItem('profile-photo');
    if (savedProfile) {
      const heroImg = document.getElementById('hero-photo-img');
      const heroPlaceholder = document.getElementById('hero-photo-placeholder');
      const aboutImg = document.getElementById('about-photo-img');
      const aboutPlaceholder = document.getElementById('about-photo-placeholder');
      const aboutChange = document.getElementById('about-photo-change');
      if (heroImg) { heroImg.src = savedProfile; heroImg.style.display = 'block'; }
      if (heroPlaceholder) heroPlaceholder.style.display = 'none';
      if (aboutImg) { aboutImg.src = savedProfile; aboutImg.style.display = 'block'; }
      if (aboutPlaceholder) aboutPlaceholder.style.display = 'none';
      if (aboutChange) aboutChange.style.display = 'flex';
    }
  } catch(e) {}
  ['rise-of-fallen','db-crud','student-mgmt','farm-mgmt','jewellery-shop'].forEach(function(id) {
    try {
      const saved = localStorage.getItem('proj-img-' + id);
      if (saved) {
        const img = document.getElementById('imgshow-' + id);
        const ph = document.getElementById('img-' + id);
        if (img && ph) { img.src = saved; img.style.display = 'block'; ph.style.display = 'none'; }
      }
    } catch(e) {}
  });
});
