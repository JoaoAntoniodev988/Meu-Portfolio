#  Portfólio Profissional Estilo LinkedIn com Painel de Produtividade Ativo

O Problema Resolvido: "Portfólios convencionais tendem a ser estáticos e falham em reter a atenção do recrutador. Este projeto resolve isso ao utilizar uma interface altamente familiar (LinkedIn), integrando uma área de gerenciamento de foco diário para demonstrar habilidades em desenvolvimento de software interativo."

Habilidades Praticadas (A sua Stack):

HTML5 Semântico: Estruturação em 3 colunas baseada em blocos lógicos isolados.

CSS3 Moderno: Arquitetura de layout utilizando CSS Grid para a malha principal e Flexbox para componentes internos responsivos.

JavaScript (ES6+): Manipulação dinâmica do DOM, criação e remoção de nós em tempo real (CRUD de tarefas) e lógica de filtragem condicional baseada em datasets.

O Diferencial Técnico: o projeto foi desenhado sob uma perspectiva de Mobile-First/Responsividade, garantindo que se a pessoa abrir o link pelo telemóvel, as barras laterais colapsem de forma elegante para priorizar o conteúdo.

O "Porquê" por trás do motor: Como o JavaScript funcionou no site

O que fiz no script.js baseia-se em dois pilares fundamentais do desenvolvimento de aplicações modernas:

1. Manipulação do DOM (Document Object Model) e Eventos
Quando o navegador lê o seu HTML, ele cria uma árvore de objetos (o DOM).
    • O que o JS fez: Funções como document.getElementById ou querySelectorAll servem como "pontes" para o JavaScript encontrar o HTML na memória.
    • Ao usar o .addEventListener('click', ...) ou o keypress, você ensinou o navegador a ficar "escutando" as ações do usuário em tempo real. Isso transforma um documento estático em uma aplicação web interativa.
2. O Poder dos Data Attributes (data-*)
Nos botões de filtro, usamos o atributo data-filter. Essa é uma especificação do HTML5 criada justamente para podermos armazenar dados proprietários diretamente na tag, sem impactar o design. O JavaScript consegue ler esse valor instantaneamente. É uma forma limpa, segura e performática de trafegar informações entre a estrutura (HTML) e a lógica (JS).
