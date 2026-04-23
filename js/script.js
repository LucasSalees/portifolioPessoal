document.addEventListener('DOMContentLoaded', function() {

    // CÉREBRO DAS ROTAS: Deteta se estamos na raiz (index) ou numa subpasta (projects)
    const isCasePage = !document.getElementById('home');
    const basePath = isCasePage ? '../' : '';

    /* ========================================================================== */
    /* 0. MODAIS GLOBAIS (INJEÇÃO DINÂMICA)                                       */
    /* ========================================================================== */
    function injectGlobalModals() {
        if (document.getElementById('resumeModal')) return;

        const globaisHTML = `
            <div class="modal fade custom-modal" id="resumeModal" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header border-0 pb-0">
                            <h5 class="modal-title accent-text fw-bold" data-i18n="modal-resume-title">Currículo Profissional</h5>
                            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body text-center py-4">
                            <p data-i18n="modal-resume-desc">Clique no botão abaixo para fazer o download do meu currículo em PDF.</p>
                        </div>
                        <div class="modal-footer border-0 d-flex justify-content-center pt-0">
                            <a href="${basePath}assets/lucasCurriculo.pdf" class="btn-action" download target="_blank">
                                <i class="bi bi-download me-2"></i> <span data-i18n="modal-resume-btn">Baixar PDF</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal fade custom-modal" id="redirectModal" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header border-0 pb-0">
                            <h5 class="modal-title accent-text fw-bold" data-i18n="modal-exit-title">Aviso de Saída</h5>
                            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body text-center py-4">
                            <p data-i18n="modal-exit-desc">Você está saindo do meu portfólio.</p>
                            <p class="mt-2 mb-0" id="redirectPlatformName" style="opacity: 0.8; font-size: 0.9em;" data-i18n="modal-exit-ask">Deseja acessar a plataforma externa?</p>
                        </div>
                        <div class="modal-footer border-0 d-flex justify-content-center pt-0 gap-2">
                            <button type="button" class="btn-action-outline m-0" data-bs-dismiss="modal" data-i18n="modal-exit-stay">Ficar Aqui</button>
                            <a href="#" id="btnConfirmRedirect" class="btn-action m-0" target="_blank" data-i18n="modal-exit-go">Continuar</a>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal fade custom-modal" id="sucessoContactModal" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header border-0 pb-0 text-center w-100 justify-content-center">
                            <h5 class="modal-title accent-text fw-bold w-100"><i class="bi bi-check-circle-fill me-2"></i><span data-i18n="modal-success-title">Enviado!</span></h5>
                        </div>
                        <div class="modal-body text-center py-4">
                            <p data-i18n="modal-success-desc">Sua mensagem foi entregue com sucesso.</p>
                            <p class="mt-2 mb-0" style="opacity: 0.8; font-size: 0.9em;" data-i18n="modal-success-sub">Retornarei o contato o mais breve possível.</p>
                        </div>
                        <div class="modal-footer border-0 d-flex justify-content-center pt-0">
                            <button type="button" class="btn-action" data-bs-dismiss="modal" data-i18n="modal-success-btn">Fechar</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', globaisHTML);
    }
    injectGlobalModals();

    /* ========================================================================== */
    /* 1. SISTEMA DE INTERNACIONALIZAÇÃO PROFISSIONAL (FETCH JSON)                */
    /* ========================================================================== */
    let currentLang = localStorage.getItem('portfolio_lang') || 'pt';
    let translations = {}; 
    
    const langToggleBtn = document.getElementById('langToggle');
    const langText = document.getElementById('langText');

    async function loadTranslations(lang) {
        try {
            // O caminho do JSON ajusta-se automaticamente com o basePath
            const response = await fetch(`${basePath}locales/${lang}.json`);
            if (!response.ok) throw new Error('Não foi possível carregar as traduções');
            
            translations = await response.json();
            applyTranslationsToDOM(lang);
            
        } catch (error) {
            console.warn("i18n local bloqueado por CORS ou ficheiro não encontrado. A usar textos HTML padrão.", error);
        }
    }

    function applyTranslationsToDOM(lang) {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            
            if (translations[key]) {
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.setAttribute('placeholder', translations[key]);
                } else {
                    el.textContent = translations[key];
                }
            }
        });

        if(langText) {
            langText.textContent = lang === 'pt' ? 'EN' : 'PT';
        }

        if(document.getElementById('redirectPlatformName') && document.getElementById('btnConfirmRedirect').getAttribute('data-plataforma')) {
            const text = lang === 'pt' ? 'Deseja continuar para:' : 'Do you want to proceed to:';
            document.getElementById('redirectPlatformName').innerHTML = `${text} <strong>${document.getElementById('btnConfirmRedirect').getAttribute('data-plataforma')}</strong>?`;
        }

        localStorage.setItem('portfolio_lang', lang);
    }

    if (langToggleBtn) {
        langToggleBtn.addEventListener('click', () => {
            currentLang = currentLang === 'pt' ? 'en' : 'pt';
            loadTranslations(currentLang);
        });
    }

    // Inicializa a tradução
    loadTranslations(currentLang);

    /* ========================================================================== */
    /* 2. NAVBAR E MENU MOBILE                                                    */
    /* ========================================================================== */
    const mainNav = document.getElementById('mainNav');
    const navLinks = document.querySelectorAll('.custom-link');
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            mainNav.classList.add('scrolled');
        } else {
            mainNav.classList.remove('scrolled');
        }
    });

    function updateActiveNavLink() {
        let current = '';
        
        if (isCasePage) {
            current = 'projects'; 
        }

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            
            if (href && href.endsWith(`#${current}`)) {
                link.classList.add('active');
            }
        });
    }
    window.addEventListener('scroll', updateActiveNavLink);

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
    /* 3. ANIMAÇÃO DE DIGITAÇÃO (HERO) - INTEGRADO COM i18n                       */
    /* ========================================================================== */
    const typingElement = document.getElementById('typing-text');
    
    function getTypingTexts() {
        return [
            translations["hero-typing-1"] || "Desenvolvedor Full-Stack",
            translations["hero-typing-2"] || "Sistemas sob Medida",
            translations["hero-typing-3"] || "Integração de APIs",
            translations["hero-typing-4"] || "Código Limpo e Escalável"
        ];
    }
    
    let texts = getTypingTexts();
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function typeText() {
        if (!typingElement) return;
        
        texts = getTypingTexts(); 
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
    /* 4. OBSERVER PARA EFEITO DE FADE-IN                                         */
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
    /* 5. BOTÃO VOLTAR AO TOPO                                                    */
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
    /* 6. MODAIS DINÂMICOS & UX (CERTIFICADOS E REDIRECIONAMENTO)                 */
    /* ========================================================================== */
    const btnCerts = document.querySelectorAll('.btn-cert');
    const dynamicCertModalEl = document.getElementById('dynamicCertModal');
    
    if(dynamicCertModalEl) {
        const certModalTitle = document.getElementById('certModalTitle');
        const certModalLink = document.getElementById('certModalLink');
        const dynamicModal = new bootstrap.Modal(dynamicCertModalEl);

        btnCerts.forEach(btn => {
            btn.addEventListener('click', function() {
                certModalTitle.textContent = this.getAttribute('data-titulo');
                certModalLink.setAttribute('href', this.getAttribute('data-pdf'));
                dynamicModal.show();
            });
        });
    }

    const redirectLinks = document.querySelectorAll('.redirect-link');
    const redirectModalEl = document.getElementById('redirectModal');
    
    if(redirectModalEl) {
        const redirectPlatformName = document.getElementById('redirectPlatformName');
        const btnConfirmRedirect = document.getElementById('btnConfirmRedirect');
        const redirectModal = new bootstrap.Modal(redirectModalEl);

        redirectLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                btnConfirmRedirect.setAttribute('data-plataforma', this.getAttribute('data-plataforma'));
                const text = currentLang === 'pt' ? 'Deseja continuar para:' : 'Do you want to proceed to:';
                redirectPlatformName.innerHTML = `${text} <strong>${this.getAttribute('data-plataforma')}</strong>?`;
                btnConfirmRedirect.setAttribute('href', this.getAttribute('href'));
                redirectModal.show();
            });
        });

        btnConfirmRedirect.addEventListener('click', () => redirectModal.hide());
    }

    /* ========================================================================== */
    /* 7. FORMULÁRIO DE CONTACTO (AJAX)                                           */
    /* ========================================================================== */
    const portfolioContactForm = document.getElementById('portfolioContactForm');
    
    if (portfolioContactForm) {
        portfolioContactForm.addEventListener('submit', function(e) {
            e.preventDefault(); 
            
            if (!portfolioContactForm.checkValidity()) {
                portfolioContactForm.classList.add('was-validated');
                return;
            }

            const btnEnviar = document.getElementById('btnEnviarMensagem');
            const originalText = btnEnviar.innerHTML;
            
            const loadingText = currentLang === 'pt' ? 'ENVIANDO...' : 'SENDING...';
            btnEnviar.innerHTML = `<i class="fas fa-spinner fa-spin me-2"></i> ${loadingText}`;
            btnEnviar.disabled = true;

            const formData = new FormData(portfolioContactForm);

            fetch(portfolioContactForm.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            })
            .then(response => {
                if(response.ok) return response.json();
                throw new Error('Erro na rede');
            })
            .then(data => {
                portfolioContactForm.reset();
                portfolioContactForm.classList.remove('was-validated');
                new bootstrap.Modal(document.getElementById('sucessoContactModal')).show();
            })
            .catch(error => {
                const errorMsg = currentLang === 'pt' ? 'Erro ao enviar mensagem. Tente pelo LinkedIn!' : 'Error sending message. Try via LinkedIn!';
                alert(errorMsg);
                console.error(error);
            })
            .finally(() => {
                btnEnviar.innerHTML = originalText;
                btnEnviar.disabled = false;
            });
        });
    }

    /* ========================================================================== */
    /* 8. ANO DINÂMICO NO RODAPÉ                                                  */
    /* ========================================================================== */
    const timestampElement = document.getElementById('timestamp');
    if (timestampElement) {
        timestampElement.textContent = new Date().getFullYear();
    }

    /* ========================================================================== */
    /* 9. MÁSCARA DE TELEFONE (VANILLA JS)                                        */
    /* ========================================================================== */
    const telefoneInput = document.getElementById('telefoneInput');
    
    if (telefoneInput) {
        telefoneInput.addEventListener('input', function (e) {
            let x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
            e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
        });
    }
});