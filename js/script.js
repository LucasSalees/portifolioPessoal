/* ========================================================================== */
/*                                 Animação de Fundo Neon                     */
/* ========================================================================== */

document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('neon-background');
    const ctx = canvas.getContext('2d');
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    const particles = [];
    const particleCount = 80;
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.4;
            this.vy = (Math.random() - 0.5) * 0.4;
            this.size = Math.random() * 1.5 + 1;
            this.color = Math.random() > 0.1 ? '#00ffff' : '#ffffff'; 
            this.opacity = Math.random() * 0.4 + 0.1;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            
            this.opacity = 0.1 + Math.sin(Date.now() * 0.001 + this.y * 0.01) * 0.2;
        }
        
        draw() {
            ctx.save();
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = this.color;
            ctx.shadowBlur = 15;
            ctx.shadowColor = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }
    
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    function animate() {
        ctx.fillStyle = 'rgba(10, 10, 10, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        particles.forEach((particle, i) => {
            particles.slice(i + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 120) {
                    ctx.save();
                    ctx.globalAlpha = (120 - distance) / 120 * 0.15;
                    ctx.strokeStyle = '#00ffff';
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);
                    ctx.stroke();
                    ctx.restore();
                }
            });
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();

/* ========================================================================== */
/*                                 Animação de Digitação                      */
/* ========================================================================== */

    const typingElement = document.getElementById('typing-text');
    const texts = [
        'JAVA_DEVELOPER',
        'SPRING_BOOT',
        'FULL_STACK',
        'CLEAN_CODE',
        'CODE_INNOVATOR'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function typeText() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            setTimeout(() => isDeleting = true, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
        }
        
        setTimeout(typeText, typingSpeed);
    }
    
    if(typingElement) typeText();

/* ========================================================================== */
/*                                 Navegação e Scroll                         */
/* ========================================================================== */

    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    function updateActiveNavLink() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNavLink);

    // Fechar o menu responsivo quando clicar fora dele
    document.addEventListener('click', function(event) {
        const navbarToggler = document.querySelector('.navbar-toggler');
        const navbarCollapse = document.getElementById('navbarNav');

        const isClickInsideNavbar = navbarCollapse.contains(event.target) || navbarToggler.contains(event.target);

        // Verifica se o menu está aberto e se o clique foi fora dele
        if (navbarCollapse.classList.contains('show') && !isClickInsideNavbar) {
            // Simula um clique no botão para fechar o menu
            navbarToggler.click();
        }
    });

    const btn = document.getElementById("btnTop");

    // Mostrar/esconder botão ao rolar
    window.addEventListener("scroll", () => {
      if (window.scrollY > 200) {
        btn.classList.add("show"); // aparece
      } else {
        btn.classList.remove("show"); // some
      }
    });

    // Voltar ao topo suavemente ao clicar
    btn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

/* ========================================================================== */
/*                                 Animações e Observadores                   */
/* ========================================================================== */

    // Progress Bar Animation with Intersection Observer
    const skillsSection = document.querySelector('.skills-section');
    const progressBars = document.querySelectorAll('.progress-bar');
    
    const skillsObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            progressBars.forEach(bar => {
                const progress = bar.getAttribute('data-progress');
                bar.style.setProperty('--progress', progress + '%');
            });
        }
    }, { threshold: 0.5 });
    
    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }

    // Intersection Observer for Fade-in Animations
    const fadeElements = document.querySelectorAll('.terminal-line, .skill-category, .project-card');
    
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    fadeElements.forEach(element => {
        element.classList.add('fade-in');
        fadeObserver.observe(element);
    });

/* ========================================================================== */
/*                                 Outros                                     */
/* ========================================================================== */

    // Timestamp Update
    function updateTimestamp() {
        const timestampElement = document.getElementById('timestamp');
        if (timestampElement) {
            const now = new Date();
            timestampElement.textContent = now.toLocaleString('pt-BR');
        }
    }
    
    updateTimestamp();
    setInterval(updateTimestamp, 1000);

    // Glitch Effect for Letters
    const letters = document.querySelectorAll('.letter');
    letters.forEach((letter, index) => {
        letter.addEventListener('mouseenter', () => {
            letter.style.animation = 'none';
            letter.style.transform = `translateX(${Math.random() * 10 - 5}px) translateY(${Math.random() * 10 - 5}px)`;
            letter.style.textShadow = `
                ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px 0 #ff00ff,
                ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px 0 #00ff00,
                0 0 20px #00ffff
            `;
            
            setTimeout(() => {
                letter.style.transform = '';
                letter.style.textShadow = '';
                letter.style.animation = '';
            }, 200);
        });
    });
});


