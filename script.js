document.addEventListener('DOMContentLoaded', function () {
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const body = document.body;
    
    // Cria e adiciona o overlay
    const overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    document.body.appendChild(overlay);

    // Função para abrir/fechar o sidebar
    function toggleSidebar() {
        sidebar.classList.toggle('expanded');
        overlay.classList.toggle('show');
    }

    // Event listener para o botão de toggle
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', toggleSidebar);
    }
    
    // Event listener para o overlay para fechar o sidebar
    overlay.addEventListener('click', function() {
        if (sidebar.classList.contains('expanded')) {
            toggleSidebar();
        }
    });

    // Event listener para os links do sidebar
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Fecha o sidebar em telas pequenas ao clicar em um link
            if (window.innerWidth <= 768 && sidebar.classList.contains('expanded')) {
                setTimeout(() => {
                    toggleSidebar();
                }, 300); // Pequeno atraso para a animação
            }
        });
    });

    // Ativa a rolagem suave para links de navegação
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Destacar o link da seção ativa no sidebar
    const sections = document.querySelectorAll('section, header.masthead');
    const handleScroll = () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 70; // Offset para ajustar a rolagem
            if (pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        sidebarLinks.forEach(link => {
            link.classList.remove('active');
            if (link.href.includes(current) && current !== '') {
                link.classList.add('active');
            }
        });
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll();
});