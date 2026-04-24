# Portfólio Profissional | Lucas Sales

<p align="center">
  <strong>Engenharia Front-end, Arquitetura de Software e Design Imersivo.</strong>
</p>

<p align="center">
  <a href="https://portifolio-lucas-sales.netlify.app/" target="_blank">Acessar Portfólio Online</a>
</p>

---

## Sobre o Projeto

Bem-vindo ao repositório do meu portfólio profissional! Este projeto foi desenvolvido para ir muito além de um simples currículo online. Ele é uma vitrine técnica da minha capacidade de arquitetar soluções web modernas, com alta performance, design responsivo e código limpo.

A arquitetura foca na entrega de uma experiência de **Single Page Application (SPA)** leve e componentizada, refletindo o meu direcionamento de carreira para arquiteturas de software escaláveis, plataformas Multi-tenant (SaaS) e integração de Inteligência Artificial.

---

## Destaques de Engenharia Front-end

Este projeto não utiliza frameworks pesados (como React ou Angular), mas replica os seus principais conceitos de arquitetura utilizando apenas as APIs nativas do navegador:

- **Dark & Light Mode Persistente:** Alternância de temas (com uma estética premium *Earthy / Brown Glassmorphism* no modo escuro) utilizando variáveis CSS dinâmicas, transições suaves e salvamento de preferência via `localStorage`.
- **Internacionalização (i18n) Assíncrona:** Tradução dinâmica (PT/EN) através da `Fetch API`, consumindo dicionários JSON externos na pasta `locales/` sem a necessidade de recarregar a página.
- **Componentização via Injeção de DOM:** Modais globais (Aviso de Saída, Visualização de PDF, Alertas de Sucesso) são construídos e injetados dinamicamente no DOM através do JavaScript, mantendo o HTML base extremamente enxuto (conceito DRY).
- **UI/UX Avançada e Glassmorphism:** Implementação de uma *Navbar Adaptativa* (transparente no topo e efeito *glass* no scroll), menu mobile suave (accordion nativo) e um *ScrollSpy* inteligente calculado via JS para destacar *active links* sem causar *stuttering* em dispositivos móveis.
- **Formulário de Contato via AJAX:** Captação de leads com *feedback* de carregamento animado e integração com API de e-mail assíncrona, mantendo o usuário engajado na mesma tela.

---

## Stack Tecnológica

- **Linguagens:** HTML5, CSS3, JavaScript (ES6+ / Vanilla)
- **Framework de Estilo:** Bootstrap 5.3.3 & Bootstrap Icons
- **Integrações:** Fetch API, FormSubmit (AJAX)
- **Design/UI:** Figma, Glassmorphism UI, Earthy Palette, Mobile-First
- **Deploy:** Netlify

---

## Estrutura de Diretórios (Arquitetura)

```text
/
├── assets/                 # Certificados e arquivos PDF para download dinâmico
├── css/                    # Folhas de estilo customizadas e variáveis de Tema (Light/Dark)
├── img/                    # Recursos gráficos e imagens otimizadas
├── js/                     # Lógica global da aplicação (script.js)
├── locales/                # Dicionários de tradução JSON (pt.json, en.json)
├── projects/               # Páginas detalhadas de Cases de Estudo
│   ├── case-ouvemed.html
│   ├── case-brbee.html
│   ├── case-ctus.html
│   ├── case-seguranca.html
│   └── case-contador.html
├── index.html              # Página inicial da aplicação
└── README.md               # Documentação do projeto
```

---

## Cases de Estudo em Destaque
Neste portfólio, detalho a engenharia por trás dos meus principais projetos:

* **Ouvemed**: Plataforma SaaS Multi-tenant para gestão médica e transcrição autônoma via Inteligência Artificial Generativa.

* **brbee.SOLUTIONS**: Portal institucional com foco em retenção de leads e renderização de alta performance.

* **CTUS**: Acervo digital e plataforma oficial para o Colóquio Transdisciplinar da UNIP Sorocaba.

* **Segurança Elétrica**: Projeto de extensão de impacto social com foco em conscientização digital e gamificação para baixa renda.

* **Contador de Amor**: Experiência interativa focada em manipulação pura de DOM e algoritmos de tempo real.

---

## Como executar localmente
Como o projeto utiliza a função **fetch()** do JavaScript para buscar os arquivos **.json** de tradução, executá-lo com um simples "duplo-clique" no arquivo index.html resultará em um bloqueio de CORS imposto por navegadores modernos.

Para rodar perfeitamente no seu ambiente local:

Clone o repositório:

```Bash
git clone [https://github.com/LucasSalees/portifolioPessoal.git](https://github.com/LucasSalees/portifolioPessoal.git)
```

Abra a pasta do projeto no VSCode.

Utilize a extensão Live Server ou qualquer servidor HTTP estático para rodar o projeto e testar a funcionalidade de tradução sem bloqueios de segurança do navegador.