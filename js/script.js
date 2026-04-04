document.addEventListener('DOMContentLoaded', function() {
    /* ========================================================================== */
    /* Navbar Transparente ao Rolar                                               */
    /* ========================================================================== */
    const mainNav = document.getElementById('mainNav');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            mainNav.classList.add('scrolled');
        } else {
            mainNav.classList.remove('scrolled');
        }
    });

    /* ========================================================================== */
    /* Animação de Digitação (Hero)                                               */
    /* ========================================================================== */
    const typingElement = document.getElementById('typing-text');
    const texts = [
        'Desenvolvedor Full-Stack',
        'Sistemas sob Medida',
        'Integração de APIs',
        'Código Limpo e Escalável'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function typeText() {
        if (!typingElement) return;
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 40;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 80;
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
    /* Link Ativo na Navegação                                                    */
    /* ========================================================================== */
    const navLinks = document.querySelectorAll('.custom-link');
    const sections = document.querySelectorAll('section[id]');
    
    function updateActiveNavLink() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
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

    // Fechar menu mobile ao clicar fora ou em um link
    document.addEventListener('click', function(event) {
        const navbarToggler = document.querySelector('.navbar-toggler');
        const navbarCollapse = document.getElementById('navbarNav');
        if (!navbarCollapse || !navbarToggler) return;

        const isClickInsideNavbar = navbarCollapse.contains(event.target) || navbarToggler.contains(event.target);
        if (navbarCollapse.classList.contains('show') && !isClickInsideNavbar) {
            navbarToggler.click();
        }
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const navbarCollapse = document.getElementById('navbarNav');
            if (navbarCollapse.classList.contains('show')) {
                document.querySelector('.navbar-toggler').click();
            }
        });
    });

    /* ========================================================================== */
    /* Botão Voltar ao Topo                                                       */
    /* ========================================================================== */
    const btnTop = document.getElementById("btnTop");
    if(btnTop) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 300) {
                btnTop.classList.add("show");
            } else {
                btnTop.classList.remove("show");
            }
        });

        btnTop.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    /* ========================================================================== */
    /* Observer para Efeito de Fade-In                                            */
    /* ========================================================================== */
    const fadeElements = document.querySelectorAll('.floating-card, .skill-chip, .cert-line, .project-card');
    
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
    /* Ano dinâmico no Footer                                                     */
    /* ========================================================================== */
    const timestampElement = document.getElementById('timestamp');
    if (timestampElement) {
        timestampElement.textContent = new Date().getFullYear();
    }
});