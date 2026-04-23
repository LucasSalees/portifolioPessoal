document.addEventListener('DOMContentLoaded', function() {

    /* ========================================================================== */
    /* 0. MODAIS GLOBAIS (INJEÇÃO DINÂMICA)                                       */
    /* ========================================================================== */
    function injectGlobalModals() {
        // Se o modal de currículo já existir na página, não faz nada para evitar duplicidade
        if (document.getElementById('resumeModal')) return;

        const globaisHTML = `
            <div class="modal fade custom-modal" id="resumeModal" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header border-0 pb-0">
                            <h5 class="modal-title accent-text fw-bold">Currículo Profissional</h5>
                            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body text-center py-4">
                            <p>Clique no botão abaixo para fazer o download do meu currículo em PDF.</p>
                        </div>
                        <div class="modal-footer border-0 d-flex justify-content-center pt-0">
                            <a href="assets/lucasCurriculo.pdf" class="btn-action" download target="_blank">
                                <i class="bi bi-download me-2"></i> Baixar PDF
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal fade custom-modal" id="redirectModal" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header border-0 pb-0">
                            <h5 class="modal-title accent-text fw-bold">Aviso de Saída</h5>
                            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body text-center py-4">
                            <p>Você está saindo do meu portfólio.</p>
                            <p class="mt-2 mb-0" id="redirectPlatformName" style="opacity: 0.8; font-size: 0.9em;">Deseja acessar a plataforma externa?</p>
                        </div>
                        <div class="modal-footer border-0 d-flex justify-content-center pt-0 gap-2">
                            <button type="button" class="btn-action-outline m-0" data-bs-dismiss="modal">Ficar Aqui</button>
                            <a href="#" id="btnConfirmRedirect" class="btn-action m-0" target="_blank">Continuar</a>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal fade custom-modal" id="sucessoContactModal" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header border-0 pb-0 text-center w-100 justify-content-center">
                            <h5 class="modal-title accent-text fw-bold w-100"><i class="bi bi-check-circle-fill me-2"></i>Enviado!</h5>
                        </div>
                        <div class="modal-body text-center py-4">
                            <p>Sua mensagem foi entregue com sucesso.</p>
                            <p class="mt-2 mb-0" style="opacity: 0.8; font-size: 0.9em;">Retornarei o contato o mais breve possível.</p>
                        </div>
                        <div class="modal-footer border-0 d-flex justify-content-center pt-0">
                            <button type="button" class="btn-action" data-bs-dismiss="modal">Fechar</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Insere o HTML dos modais no final do <body>
        document.body.insertAdjacentHTML('beforeend', globaisHTML);
    }

    // Executa a injeção antes de rodar os scripts de clique
    injectGlobalModals();
    
    /* ========================================================================== */
    /* 1. NAVBAR & MENU MOBILE                                                    */
    /* ========================================================================== */
    const mainNav = document.getElementById('mainNav');
    const navLinks = document.querySelectorAll('.custom-link');
    const sections = document.querySelectorAll('section[id]');
    
    // Navbar transparente vs sólida ao rolar
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            mainNav.classList.add('scrolled');
        } else {
            mainNav.classList.remove('scrolled');
        }
    });

    // ScrollSpy: Link Ativo na Navegação
    function updateActiveNavLink() {
        let current = '';
        
        // CÉREBRO DO SCROLLSPY: Se a página não tem a seção 'home', sabemos que é uma página de Case de Estudo.
        const isCasePage = !document.getElementById('home'); 
        
        if (isCasePage) {
            current = 'projects'; // Mantém "Projetos" aceso por padrão nas páginas de case
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
            
            // Usamos endsWith para o JS reconhecer tanto "#contact" quanto "index.html#contact"
            if (href && href.endsWith(`#${current}`)) {
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
    /* 2. ANIMAÇÃO DE DIGITAÇÃO (HERO)                                            */
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
    /* 3. OBSERVER PARA EFEITO DE FADE-IN                                         */
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
    /* 4. BOTÃO VOLTAR AO TOPO                                                    */
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
    /* 5. MODAIS DINÂMICOS & UX (CERTIFICADOS E REDIRECIONAMENTO)                 */
    /* ========================================================================== */
    // Certificados
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

    // Redirecionamento Externo
    const redirectLinks = document.querySelectorAll('.redirect-link');
    const redirectModalEl = document.getElementById('redirectModal');
    
    if(redirectModalEl) {
        const redirectPlatformName = document.getElementById('redirectPlatformName');
        const btnConfirmRedirect = document.getElementById('btnConfirmRedirect');
        const redirectModal = new bootstrap.Modal(redirectModalEl);

        redirectLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                redirectPlatformName.innerHTML = `Deseja continuar para: <strong>${this.getAttribute('data-plataforma')}</strong>?`;
                btnConfirmRedirect.setAttribute('href', this.getAttribute('href'));
                redirectModal.show();
            });
        });

        btnConfirmRedirect.addEventListener('click', () => redirectModal.hide());
    }

    /* ========================================================================== */
    /* 6. FORMULÁRIO DE CONTATO (AJAX)                                            */
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
            
            btnEnviar.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i> ENVIANDO...';
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
                alert('Erro ao enviar mensagem. Tente pelo LinkedIn!');
                console.error(error);
            })
            .finally(() => {
                btnEnviar.innerHTML = originalText;
                btnEnviar.disabled = false;
            });
        });
    }

    /* ========================================================================== */
    /* 7. ANO DINÂMICO NO FOOTER                                                  */
    /* ========================================================================== */
    const timestampElement = document.getElementById('timestamp');
    if (timestampElement) {
        timestampElement.textContent = new Date().getFullYear();
    }

    /* ========================================================================== */
    /* 8. MÁSCARA DE TELEFONE (VANILLA JS)                                        */
    /* ========================================================================== */
    const telefoneInput = document.getElementById('telefoneInput');
    
    if (telefoneInput) {
        telefoneInput.addEventListener('input', function (e) {
            // Remove tudo que não for número
            let x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
            
            // Aplica a formatação (XX) XXXXX-XXXX
            e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
        });
    }
});