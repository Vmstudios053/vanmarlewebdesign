// Navbar scroll state + mobile menu
const navbar = document.querySelector('.navbar');
const navToggle = document.querySelector('.nav-toggle');
const mobileMenu = document.querySelector('.mobile-menu');

window.addEventListener('scroll', () => {
  if (!navbar) return;
  if (window.scrollY > 40) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
});

if (navToggle && mobileMenu) {
  navToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    navToggle.classList.toggle('active');
  });
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
  }));
}

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => revealObserver.observe(el));

// Stat counters
const counters = document.querySelectorAll('.stat-num[data-count]');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const duration = 1600;
    const start = performance.now();
    function tick(now) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const val = target < 10 ? (target * eased).toFixed(1) : Math.floor(target * eased);
      el.textContent = val + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
    counterObserver.unobserve(el);
  });
}, { threshold: 0.5 });
counters.forEach(el => counterObserver.observe(el));

// Contact form -> mailto fallback (no backend)
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = contactForm.querySelector('#name').value;
    const email = contactForm.querySelector('#email').value;
    const phone = contactForm.querySelector('#phone') ? contactForm.querySelector('#phone').value : '';
    const message = contactForm.querySelector('#message').value;
    const subject = encodeURIComponent('Nieuwe aanvraag via website - ' + name);
    const body = encodeURIComponent('Naam: ' + name + '\nE-mail: ' + email + '\nTelefoon: ' + phone + '\n\nBericht:\n' + message);
    window.location.href = 'mailto:info@vanmarlewebdesign.nl?subject=' + subject + '&body=' + body;
  });
}

// Cinematic 3D hero (brand ring: gold + blue)
(function initHero() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

 const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x06070a, 0.06);

 const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 0, 9);

 const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

 const goldLight = new THREE.PointLight(0xd4af37, 6, 30);
  goldLight.position.set(-4, 3, 4);
  scene.add(goldLight);

 const blueLight = new THREE.PointLight(0x2e5cff, 6, 30);
  blueLight.position.set(4, -2, 3);
  scene.add(blueLight);

 scene.add(new THREE.AmbientLight(0xffffff, 0.15));

 // Brand ring group (echoes the logo)
 const ringGroup = new THREE.Group();
  const ringGeo = new THREE.TorusGeometry(2.4, 0.05, 32, 200);
    const ringMatGold = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.9, roughness: 0.25, emissive: 0x2a1d05, emissiveIntensity: 0.3 });
  const ring = new THREE.Mesh(ringGeo, ringMatGold);
  ringGroup.add(ring);

 const innerGeo = new THREE.TorusGeometry(2.4, 0.05, 32, 200);
  const innerMat = new THREE.MeshStandardMaterial({ color: 0x2e5cff, metalness: 0.9, roughness: 0.25, emissive: 0x0a1533, emissiveIntensity: 0.3 });
  const ring2 = new THREE.Mesh(innerGeo, innerMat);
  ring2.rotation.x = Math.PI / 3;
  ring2.rotation.y = Math.PI / 5;
  ringGroup.add(ring2);

 scene.add(ringGroup);

 // Particle field
 const particleCount = 260;
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 26;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 16;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20 - 4;
  }
  const particleGeo = new THREE.BufferGeometry();
  particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const particleMat = new THREE.PointsMaterial({ color: 0xf3d878, size: 0.03, transparent: true, opacity: 0.55 });
  const particles = new THREE.Points(particleGeo, particleMat);
  scene.add(particles);

 let mouseX = 0, mouseY = 0;
  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

 function getScrollProgress() {
   const hero = document.querySelector('.hero');
   if (!hero) return 0;
   const rect = hero.getBoundingClientRect();
   const progress = Math.min(Math.max(-rect.top / rect.height, 0), 1);
   return progress;
 }

 const clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();
    const scrollP = getScrollProgress();

  ringGroup.rotation.y = t * 0.15 + scrollP * 1.6;
    ringGroup.rotation.x = Math.sin(t * 0.2) * 0.15;
    particles.rotation.y = t * 0.02;

  camera.position.z = 9 - scrollP * 4.5;
    camera.position.x += (mouseX * 0.6 - camera.position.x) * 0.03;
    camera.position.y += (-mouseY * 0.4 - camera.position.y) * 0.03;
    camera.lookAt(0, 0, 0);

  renderer.render(scene, camera);
  }
  animate();

 window.addEventListener('resize', () => {
   camera.aspect = window.innerWidth / window.innerHeight;
   camera.updateProjectionMatrix();
   renderer.setSize(window.innerWidth, window.innerHeight);
 });
})();
