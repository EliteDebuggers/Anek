(function () {
    if (document.documentElement.classList.contains('anek-skip-intro')) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const introHTML = `<div id="anek-intro" aria-hidden="true">
        <canvas id="anek-intro-particles" aria-hidden="true"></canvas>
        <div class="anek-intro-text anek-intro-scene1" id="anek-scene1">An initiative ~</div>
        <div class="anek-intro-text anek-intro-scene2" id="anek-scene2">LIKE NEVER SEEN BEFORE</div>
        <div class="anek-intro-brand">
            <div class="anek-intro-logo">
                <div class="anek-intro-logo-icon" id="anek-logo-icon">
                    <img src="/images/leaf.svg" alt="Anēk Logo" class="w-11 h-11 rounded-lg object-cover shadow-md" />
                </div>
                <span class="anek-intro-logo-text" id="anek-logo-text">Anēk</span>
            </div>
            <div class="anek-intro-subtitle" id="anek-subtitle">Join as Ek</div>
        </div>
    </div>
    <div id="anek-site-blur" aria-hidden="true"></div>`;

    document.addEventListener('DOMContentLoaded', () => {
        document.body.insertAdjacentHTML('afterbegin', introHTML);

        document.body.style.overflow = 'hidden';

        // Floating particles (very faint) 
        var canvas = document.getElementById('anek-intro-particles');
        var particlesActive = true;
        if (canvas) {
            var ctx = canvas.getContext('2d');
            var particles = [];
            function resizeCanvas() {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }
            resizeCanvas();
            window.addEventListener('resize', resizeCanvas);
            for (var i = 0; i < 15; i++) {
                particles.push({
                    x: Math.random() * window.innerWidth,
                    y: Math.random() * window.innerHeight,
                    r: Math.random() * 1.2 + 0.3,
                    vx: (Math.random() - 0.5) * 0.2,
                    vy: -Math.random() * 0.15 - 0.05,
                    o: Math.random() * 0.12 + 0.03
                });
            }
            (function animate() {
                if (!particlesActive) return;
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                for (var j = 0; j < particles.length; j++) {
                    var p = particles[j];
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                    ctx.fillStyle = 'rgba(255, 255, 255, ' + p.o + ')';
                    ctx.fill();
                    p.x += p.vx;
                    p.y += p.vy;
                    if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width; }
                    if (p.x < -10) p.x = canvas.width + 10;
                    if (p.x > canvas.width + 10) p.x = -10;
                }
                requestAnimationFrame(animate);
            })();
        }

        // Element references 
        var scene1 = document.getElementById('anek-scene1');
        var scene2 = document.getElementById('anek-scene2');
        var light = document.getElementById('anek-light');
        var flare = document.getElementById('anek-flare');
        var ray1 = document.getElementById('anek-ray1');
        var ray2 = document.getElementById('anek-ray2');
        var logoIcon = document.getElementById('anek-logo-icon');
        var logoText = document.getElementById('anek-logo-text');
        var subtitle = document.getElementById('anek-subtitle');
        var intro = document.getElementById('anek-intro');
        var siteBlur = document.getElementById('anek-site-blur');

        function wait(ms) {
            return new Promise(function (resolve) { setTimeout(resolve, ms); });
        }

        (async function runIntro() {
            // Scene 1: "An initiative ~"
            await wait(400);
            if (scene1) scene1.classList.add('anek-blur-in');
            await wait(1200);
            if (scene1) {
                scene1.classList.remove('anek-blur-in');
                scene1.classList.add('anek-blur-out');
            }
            await wait(800);

            // Scene 2: "LIKE NEVER SEEN BEFORE"
            if (scene2) scene2.classList.add('anek-blur-in');
            await wait(1200);
            if (scene2) {
                scene2.classList.remove('anek-blur-in');
                scene2.classList.add('anek-blur-out');
            }
            await wait(300);

            // Scene 3: Light reveal (hidden, skipping long delays)
            if (light) light.classList.add('anek-light-grow');
            if (flare) flare.classList.add('anek-flare-expand');
            if (ray1) ray1.classList.add('anek-ray-expand');
            if (ray2) ray2.classList.add('anek-ray-expand');


            // Scene 4: Logo (icon first, then text)
            if (logoIcon) logoIcon.classList.add('anek-blur-in');
            await wait(300);
            if (logoText) logoText.classList.add('anek-blur-in');
            await wait(1500);

            // Scene 5: Subtitle
            if (subtitle) subtitle.classList.add('anek-fade-in');
            await wait(1800);

            // Final transition: dissolve into website
            if (intro) intro.classList.add('anek-intro-exit');
            if (siteBlur) {
                siteBlur.style.opacity = '0';
                siteBlur.style.backdropFilter = 'blur(0px)';
                siteBlur.style.webkitBackdropFilter = 'blur(0px)';
            }

            await wait(1300);

            // Cleanup: remove from DOM so site is usable
            particlesActive = false;
            if (intro) intro.remove();
            if (siteBlur) siteBlur.remove();
            document.body.style.overflow = '';
        })();
    });
})();
