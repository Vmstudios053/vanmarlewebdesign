/* =========================================================
   Van Marle Webdesign — cinematic.js
   3D merkteken, scroll-choreografie en filmische sequentie.
   ========================================================= */
(function () {
  'use strict';

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var clamp = function (v, a, b) { return Math.min(b, Math.max(a, v)); };
  var lerp = function (a, b, t) { return a + (b - a) * t; };
  var easeInOut = function (t) { return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; };
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------
     1. PRELOADER
     --------------------------------------------------------- */
  var pre = $('#preloader');
  var preBar = $('#pre-bar-fill');
  var preStatus = $('#pre-status');
  var phases = ['Fundament leggen', 'Licht plaatsen', 'Merk polijsten', 'Beweging afstemmen', 'Klaar om te bouwen'];
  var prog = 0;
  var loaded = false;

  document.body.classList.add('is-loading');

  var timer = setInterval(function () {
    var step = prog < 68 ? 3 + Math.random() * 7 : 1.5 + Math.random() * 3;
    prog = Math.min(prog + step, loaded ? 100 : 94);
    if (preBar) preBar.style.width = prog.toFixed(0) + '%';
    if (preStatus) {
      var idx = Math.min(phases.length - 1, Math.floor(prog / 100 * phases.length));
      preStatus.textContent = phases[idx] + ' \u00b7 ' + prog.toFixed(0) + '%';
    }
    if (prog >= 100) {
      clearInterval(timer);
      setTimeout(function () {
        if (pre) pre.classList.add('is-done');
        document.body.classList.remove('is-loading');
        document.body.classList.add('is-ready');
        onScroll();
      }, 380);
    }
  }, 120);

  window.addEventListener('load', function () { loaded = true; });
  setTimeout(function () { loaded = true; }, 5200);

  /* ---------------------------------------------------------
     2. NAVIGATIE
     --------------------------------------------------------- */
  var nav = $('#nav');
  var navToggle = $('#nav-toggle');
  var navLinks = $('#nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      var open = navLinks.classList.toggle('is-open');
      navToggle.textContent = open ? 'Sluiten' : 'Menu';
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    $$('a', navLinks).forEach(function (a) {
      a.addEventListener('click', function () {
        navLinks.classList.remove('is-open');
        navToggle.textContent = 'Menu';
      });
    });
  }

  /* ---------------------------------------------------------
     3. SCROLL DRIVER
     --------------------------------------------------------- */
  var stage = $('#stage');
  var acts = $$('.act');
  var hint = $('.scroll-hint');
  var film = $('#film');
  var scenes = $$('.scene');
  var ticks = $$('.film-ticks i');
  var timecode = $('#film-tc');
  var stageP = 0;

  var actRanges = [[0, 0.30], [0.34, 0.62], [0.68, 1.01]];

  function sectionProgress(el) {
    if (!el) return 0;
    var rect = el.getBoundingClientRect();
    var total = el.offsetHeight - window.innerHeight;
    if (total <= 0) return 0;
    return clamp(-rect.top / total, 0, 1);
  }

  function updateActs(p) {
    acts.forEach(function (act, i) {
      var r = actRanges[i] || [9, 9];
      act.classList.toggle('is-live', p >= r[0] && p < r[1]);
    });
    if (hint) hint.style.opacity = String(clamp(1 - p / 0.16, 0, 1));
  }

  function updateFilm() {
    if (!film || !scenes.length) return;
    var fp = sectionProgress(film);
    var i = clamp(Math.floor(fp * scenes.length), 0, scenes.length - 1);
    scenes.forEach(function (s, n) { s.classList.toggle('is-live', n === i); });
    ticks.forEach(function (t, n) { t.classList.toggle('is-live', n <= i); });
    if (timecode) {
      var secs = Math.round(fp * 108);
      var mm = Math.floor(secs / 60);
      var ss = secs % 60;
      timecode.textContent = 'Scene 0' + (i + 1) + ' / 0' + scenes.length + '  \u00b7  0' + mm + ':' + (ss < 10 ? '0' + ss : ss);
    }
  }

  function onScroll() {
    stageP = sectionProgress(stage);
    updateActs(stageP);
    updateFilm();
    if (nav) {
      nav.classList.toggle('is-solid', window.scrollY > 70);
      nav.classList.toggle('is-branded', stageP > 0.62 || (stage && window.scrollY > stage.offsetHeight * 0.85));
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();

  /* ---------------------------------------------------------
     4. REVEALS + TELLERS
     --------------------------------------------------------- */
  var io = 'IntersectionObserver' in window ? new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.classList.add('is-in');
      io.unobserve(e.target);
    });
  }, { threshold: 0.16, rootMargin: '0px 0px -8% 0px' }) : null;

  $$('.reveal').forEach(function (el, i) {
    el.style.transitionDelay = (i % 4) * 90 + 'ms';
    if (io) { io.observe(el); } else { el.classList.add('is-in'); }
  });

  var counters = $$('[data-count]');
  var cio = 'IntersectionObserver' in window ? new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      var el = e.target;
      var target = parseFloat(el.getAttribute('data-count'));
      var suffix = el.getAttribute('data-suffix') || '';
      var start = performance.now();
      var dur = 1500;
      (function run(now) {
        var t = clamp((now - start) / dur, 0, 1);
        el.textContent = Math.round(target * easeInOut(t)) + suffix;
        if (t < 1) requestAnimationFrame(run);
      })(start);
      cio.unobserve(el);
    });
  }, { threshold: 0.5 }) : null;
  counters.forEach(function (el) { if (cio) cio.observe(el); });

  /* ---------------------------------------------------------
     5. HET 3D MERKTEKEN
     --------------------------------------------------------- */
  var canvas = $('#logo-canvas');
  var fallback = $('#stage-fallback');
  var renderer, scene3, camera3, logo, dust;
  var pointer = { x: 0, y: 0 };
  var pointerTarget = { x: 0, y: 0 };

  function gradientCanvas(colors, w, h, vertical) {
    var c = document.createElement('canvas');
    c.width = w; c.height = h;
    var ctx = c.getContext('2d');
    var g = vertical ? ctx.createLinearGradient(0, 0, 0, h) : ctx.createLinearGradient(0, 0, w, 0);
    colors.forEach(function (col, i) { g.addColorStop(i / (colors.length - 1), col); });
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
    return c;
  }

  function initScene() {
    if (!canvas || !window.THREE || reduceMotion) {
      if (canvas) canvas.style.display = 'none';
      if (fallback) fallback.classList.add('is-shown');
      return;
    }

    try {
      renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
    } catch (err) {
      canvas.style.display = 'none';
      if (fallback) fallback.classList.add('is-shown');
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
    if (THREE.sRGBEncoding) renderer.outputEncoding = THREE.sRGBEncoding;

    scene3 = new THREE.Scene();
    camera3 = new THREE.PerspectiveCamera(38, canvas.clientWidth / canvas.clientHeight, 0.1, 120);
    camera3.position.set(0, 0, 6.3);

    /* omgevingsreflectie: donkere lucht, gouden horizon, blauwe diepte */
    var envSource = new THREE.CanvasTexture(gradientCanvas(['#03060d', '#0b1224', '#f0d79b', '#d9b45a', '#2f5fd0', '#050a16'], 32, 512, true));
    envSource.mapping = THREE.EquirectangularReflectionMapping;
    var env = envSource;
    if (THREE.PMREMGenerator) {
      var pmrem = new THREE.PMREMGenerator(renderer);
      pmrem.compileEquirectangularShader();
      env = pmrem.fromEquirectangular(envSource).texture;
      scene3.environment = env;
      pmrem.dispose();
    }

    logo = new THREE.Group();

    /* de ring: goud dat overloopt in blauw, precies zoals het merk */
    var ringTex = new THREE.CanvasTexture(gradientCanvas(['#f2dda8', '#d9b45a', '#c99a3f', '#f7f3e8', '#5b8dff', '#26489f', '#d9b45a', '#f2dda8'], 1024, 8, false));
    ringTex.wrapS = THREE.RepeatWrapping;
    var ring = new THREE.Mesh(
      new THREE.TorusGeometry(1.32, 0.072, 36, 260),
      new THREE.MeshStandardMaterial({ map: ringTex, metalness: 1, roughness: 0.2, envMap: env, envMapIntensity: 1.25 })
    );
    logo.add(ring);

    /* het zigzag-teken (V/M) opgebouwd uit massieve, metalen segmenten */
    var pts = [[-0.86, 0.30], [-0.44, -0.54], [0, 0.32], [0.44, -0.54], [0.86, 0.30]];
    var goldCol = new THREE.Color('#e9c67d');
    var blueCol = new THREE.Color('#4a83ff');

    for (var i = 0; i < pts.length - 1; i++) {
      var a = pts[i], b = pts[i + 1];
      var dx = b[0] - a[0], dy = b[1] - a[1];
      var len = Math.sqrt(dx * dx + dy * dy) + 0.09;
      var mix = i / (pts.length - 2);
      var mat = new THREE.MeshStandardMaterial({
        color: goldCol.clone().lerp(blueCol, mix),
        metalness: 1, roughness: 0.26, envMap: env, envMapIntensity: 1.3
      });
      var seg = new THREE.Mesh(new THREE.BoxGeometry(len, 0.132, 0.108), mat);
      seg.position.set((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, 0);
      seg.rotation.z = Math.atan2(dy, dx);
      logo.add(seg);
    }

    /* verbindingsknopen zodat de hoeken naadloos lopen */
    for (var j = 0; j < pts.length; j++) {
      var jm = new THREE.MeshStandardMaterial({
        color: goldCol.clone().lerp(blueCol, j / (pts.length - 1)),
        metalness: 1, roughness: 0.26, envMap: env, envMapIntensity: 1.3
      });
      var joint = new THREE.Mesh(new THREE.SphereGeometry(0.058, 24, 18), jm);
      joint.position.set(pts[j][0], pts[j][1], 0);
      logo.add(joint);
    }

    scene3.add(logo);

    /* licht als op een filmset: één warme key, koele rim, zachte vulling */
    scene3.add(new THREE.AmbientLight(0x1b2438, 0.9));
    var key = new THREE.DirectionalLight(0xffe7b8, 2.2); key.position.set(-3.2, 2.6, 4.2);
    var rim = new THREE.DirectionalLight(0x77a0ff, 2.0); rim.position.set(3.6, -1.8, 2.4);
    var back = new THREE.DirectionalLight(0xffffff, 0.75); back.position.set(0, 4.2, -2.6);
    scene3.add(key, rim, back);

    /* stofdeeltjes voor diepte */
    var N = 900;
    var pos = new Float32Array(N * 3);
    for (var k = 0; k < N; k++) {
      pos[k * 3] = (Math.random() - 0.5) * 20;
      pos[k * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[k * 3 + 2] = (Math.random() - 0.5) * 12 - 3;
    }
    var dg = new THREE.BufferGeometry();
    dg.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    dust = new THREE.Points(dg, new THREE.PointsMaterial({
      size: 0.014, color: 0xc2d3ff, transparent: true, opacity: 0.5, depthWrite: false
    }));
    scene3.add(dust);

    window.addEventListener('pointermove', function (e) {
      pointerTarget.x = (e.clientX / window.innerWidth - 0.5) * 2;
      pointerTarget.y = (e.clientY / window.innerHeight - 0.5) * 2;
    }, { passive: true });

    window.addEventListener('resize', resize);
    resize();
    requestAnimationFrame(render);
  }

  function resize() {
    if (!renderer || !canvas) return;
    var w = canvas.clientWidth, h = canvas.clientHeight;
    renderer.setSize(w, h, false);
    camera3.aspect = w / h;
    camera3.updateProjectionMatrix();
  }

  function render(now) {
    requestAnimationFrame(render);
    if (!renderer) return;

    var p = stageP;
    pointer.x += (pointerTarget.x - pointer.x) * 0.045;
    pointer.y += (pointerTarget.y - pointer.y) * 0.045;

    /* choreografie: het merk draait, wijkt en stijgt terwijl de site zich opent */
    var e = easeInOut(p);
    var k = window.innerWidth < 820 ? 0.66 : 1;
    var x = p < 0.45 ? lerp(0, -1.55, easeInOut(p / 0.45)) : lerp(-1.55, 0, easeInOut((p - 0.45) / 0.55));
    var y = p < 0.45 ? lerp(0.88, 0.64, p / 0.45) : lerp(0.64, 1.45, easeInOut((p - 0.45) / 0.55));
    var s = (p < 0.5 ? lerp(0.74, 0.68, p / 0.5) : lerp(0.68, 0.26, easeInOut((p - 0.5) / 0.5))) * k;

    logo.position.set(x, y, lerp(0, 0.7, p));
    logo.scale.setScalar(s);
    logo.rotation.y = lerp(-0.5, 2.45, e) + pointer.x * 0.22 + Math.sin(now * 0.00018) * 0.05;
    logo.rotation.x = lerp(0.05, 0.3, p) + pointer.y * 0.14;
    logo.rotation.z = Math.sin(now * 0.00013) * 0.02;

    camera3.position.z = lerp(6.3, 4.95, e);
    camera3.position.y = lerp(0, 0.22, p);
    camera3.lookAt(0, y * 0.5, 0);

    dust.rotation.y += 0.0004;
    dust.position.y = -p * 1.6;

    canvas.style.opacity = String(1 - clamp((p - 0.86) / 0.14, 0, 1) * 0.7);

    renderer.render(scene3, camera3);
  }

  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(initScene, 60);
  } else {
    document.addEventListener('DOMContentLoaded', function () { setTimeout(initScene, 60); });
  }

  /* ---------------------------------------------------------
     6. CONTACTFORMULIER (mailto-fallback)
     --------------------------------------------------------- */
  var form = $('#contact-form');
  if (form) {
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var naam = (form.naam.value || '').trim();
      var mail = (form.email.value || '').trim();
      var tel = (form.telefoon ? form.telefoon.value || '' : '').trim();
      var bericht = (form.bericht.value || '').trim();
      var body = 'Naam: ' + naam + '%0D%0AE-mail: ' + mail + '%0D%0ATelefoon: ' + tel + '%0D%0A%0D%0A' + bericht.replace(/\n/g, '%0D%0A');
      window.location.href = 'mailto:info@vanmarlewebdesign.nl?subject=' + encodeURIComponent('Aanvraag van ' + naam) + '&body=' + body;
      var note = $('#form-note');
      if (note) note.textContent = 'Je e-mailprogramma opent met het bericht. Verstuur het en ik reageer binnen één werkdag.';
    });
  }
})();
