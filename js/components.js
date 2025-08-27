document.addEventListener('DOMContentLoaded', () => {
    // --- LÓGICA DO SIDEBAR ---
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    const mainContent = document.getElementById('main-content');

    function toggleSidebar() {
        const isOpen = sidebar.classList.contains('sidebar-open');
        if (isOpen) {
            sidebar.classList.remove('sidebar-open');
            sidebar.classList.add('sidebar-closed');
            sidebarOverlay.classList.add('hidden');
            if (window.innerWidth >= 769) {
                mainContent.classList.remove('sidebar-active');
            }
        } else {
            sidebar.classList.remove('sidebar-closed');
            sidebar.classList.add('sidebar-open');
            sidebarOverlay.classList.remove('hidden');
            if (window.innerWidth >= 769) {
                mainContent.classList.add('sidebar-active');
            }
        }
    }

    function closeSidebar() {
        sidebar.classList.remove('sidebar-open');
        sidebar.classList.add('sidebar-closed');
        sidebarOverlay.classList.add('hidden');
        if (window.innerWidth >= 769) {
            mainContent.classList.remove('sidebar-active');
        }
    }

    sidebarToggle.addEventListener('click', toggleSidebar);
    sidebarOverlay.addEventListener('click', closeSidebar);

    window.addEventListener('resize', function() {
        if (window.innerWidth < 769) {
            mainContent.classList.remove('sidebar-active');
        } else if (sidebar.classList.contains('sidebar-open')) {
            mainContent.classList.add('sidebar-active');
        }
    });

    // --- EFEITO DE GALÁXIA ---
    const canvas = document.getElementById('galaxy');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;
        const stars = [];
        const starCount = 200;

        for (let i = 0; i < starCount; i++) {
            stars.push({
                x: Math.random() * width,
                y: Math.random() * height,
                size: Math.random() * 2 + 0.5,
                speed: Math.random() * 0.5 + 0.2
            });
        }

        function animate() {
            if(!ctx) return; // Prevenção de erro
            ctx.fillStyle = "rgba(0,0,0,0.5)";
            ctx.fillRect(0, 0, width, height);
            stars.forEach(star => {
                star.y -= star.speed;
                if (star.y < 0) star.y = height;
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                ctx.fillStyle = "white";
                ctx.fill();
            });
            requestAnimationFrame(animate);
        }
        animate();

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });
    }

    // --- EFEITO DE MÁQUINA DE ESCREVER ---
    const typingText = document.getElementById('typing-text');
    if (typingText) {
        const words = ["Desenvolvedor Java", "SQL Server", "Spring Boot", "Full-stack", "AWS", "JavaScript"];
        let wordIndex = 0;
        let charIndex = 0;
        let typingSpeed = 100;
        let deletingSpeed = 50;
        let pause = 1500;

        function typeWord() {
            const currentWord = words[wordIndex];
            if (charIndex < currentWord.length) {
                typingText.textContent += currentWord.charAt(charIndex);
                charIndex++;
                setTimeout(typeWord, typingSpeed);
            } else {
                setTimeout(deleteWord, pause);
            }
        }

        function deleteWord() {
            const currentWord = words[wordIndex];
            if (charIndex > 0) {
                typingText.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
                setTimeout(deleteWord, deletingSpeed);
            } else {
                wordIndex = (wordIndex + 1) % words.length;
                setTimeout(typeWord, typingSpeed);
            }
        }
        typeWord();
    }
});
