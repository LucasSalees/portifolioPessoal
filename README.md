# 👨‍💻 Portfólio Profissional | Lucas Sales

Bem-vindo ao repositório do meu portfólio profissional! Este projeto foi desenvolvido para ir além de um simples currículo online. Ele é uma vitrine técnica da minha capacidade de arquitetar soluções web modernas, com alta performance, design imersivo e código limpo.

🔗 **Acesse online:** [https://portifolio-lucas-sales.netlify.app/](https://portifolio-lucas-sales.netlify.app/)

---

## 🎯 Sobre o Projeto

O portfólio foi construído do zero utilizando **Vanilla JavaScript**, **HTML5 semântico** e **CSS3 avançado** (com Bootstrap 5 atuando como facilitador de grid estrutural). 

A arquitetura foca na entrega de uma **Single Page Application (SPA)** leve, componentizada e totalmente internacionalizada, refletindo o meu direcionamento de carreira para arquiteturas de software escaláveis, plataformas Multi-tenant (SaaS) e integração de Inteligência Artificial.

## ✨ Destaques de Engenharia Front-end

Este projeto não utiliza frameworks pesados (como React ou Angular), mas replica os seus principais conceitos de arquitetura utilizando apenas as APIs nativas do navegador:

* 🌐 **Sistema de Internacionalização (i18n) Assíncrono:** Tradução dinâmica (PT/EN) através da Fetch API, consumindo dicionários JSON externos na pasta `locales/` e salvando a preferência do usuário via `localStorage`.
* 🧩 **Componentização via Injeção de DOM:** Modais globais (Aviso de Saída, Visualização de PDF, Alertas de Sucesso) são construídos e injetados dinamicamente no DOM através do JavaScript, mantendo os arquivos HTML extremamente enxutos (conceito DRY).
* 🚀 **Performance e Glassmorphism:** Otimização severa de renderização. O design utiliza UI/UX avançada com efeitos de `backdrop-filter` (Glassmorphism), aliados a animações e efeitos de *scroll* (ScrollSpy) calculados via JS sem causar *stuttering* no dispositivo mobile.
* 📬 **Formulário de Contato via AJAX:** Captação de leads e mensagens integradas com API de e-mail assíncrona, prevenindo o recarregamento de página e mantendo o usuário engajado.

---

## 🛠️ Stack Tecnológica

* **Linguagens:** HTML5, CSS3, JavaScript (ES6+)
* **Framework de Estilo:** Bootstrap 5.3.3 & Bootstrap Icons
* **Integrações:** Fetch API, FormSubmit (AJAX)
* **Design/UX:** Figma, Glassmorphism UI, Mobile-First
* **Deploy:** Netlify

---

## 📂 Estrutura de Diretórios (Arquitetura)

```text
/
├── assets/                 # Certificados e arquivos PDF para download
├── css/                    # Folhas de estilo customizadas e variáveis CSS
├── images/                 # Recursos gráficos e imagens otimizadas
├── js/                     # Lógica global da aplicação (script.js)
├── locales/                # Dicionários de tradução JSON (pt.json, en.json)
├── projects/               # Páginas detalhadas de Cases de Estudo
│   ├── case-ouvemed.html
│   ├── case-brbee.html
│   ├── case-ctus.html
│   ├── case-seguranca.html
│   └── case-contador.html
├── index.html              # Página inicial da aplicação
└── README.md
```

---

## 💼 Cases de Estudo em Destaque
Neste portfólio, detalho a engenharia por trás dos meus principais projetos:

* **Ouvemed**: Plataforma SaaS Multi-tenant para gestão médica e transcrição autônoma via Inteligência Artificial Generativa.

* **brbee.SOLUTIONS**: Portal institucional com foco em retenção de leads e renderização de alta performance.

* **CTUS**: Acervo digital e plataforma oficial para o Colóquio Transdisciplinar da UNIP Sorocaba.

* **Segurança Elétrica**: Projeto de extensão de impacto social com foco em conscientização digital e gamificação para baixa renda.

* **Contador de Amor**: Experiência interativa focada em manipulação pura de DOM e algoritmos de tempo real.

---

## ⚙️ Como executar localmente
Como o projeto utiliza a função **fetch()** do JavaScript para buscar os arquivos **.json** de tradução, executá-lo com um simples "duplo-clique" no arquivo index.html resultará em um bloqueio de CORS imposto por navegadores modernos.

Para rodar perfeitamente no seu ambiente local:

Clone o repositório:

```Bash
git clone [https://github.com/LucasSalees/portifolioPessoal.git](https://github.com/LucasSalees/portifolioPessoal.git)
```

Abra a pasta do projeto no VSCode.

Utilize a extensão Live Server ou qualquer servidor HTTP estático para rodar o projeto e testar a funcionalidade de tradução sem bloqueios de segurança do navegador.