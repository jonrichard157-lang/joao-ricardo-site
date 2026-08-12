# João Ricardo — Site Comercial

Site institucional / landing page de prospecção para João Ricardo, desenvolvedor
de sites e landing pages voltado a pequenos negócios e prestadores de serviços.

O site não é um portfólio de programação — é uma ferramenta comercial. Cada
seção segue a lógica **Problema → Entendimento → Estratégia → Solução →
Conversão**, e todos os CTAs levam ao WhatsApp ou ao formulário de orçamento.

## Objetivo

Transformar visitantes em contatos comerciais: pedidos de orçamento, conversas
no WhatsApp e oportunidades de projeto.

## Stack

- **HTML5** semântico
- **CSS3** puro, organizado por responsabilidade (sem framework de UI)
- **JavaScript moderno (ES Modules)**, sem framework
- **Vite** como bundler e servidor de desenvolvimento
- **SVG** para ilustrações e ícones
- **Git**

Não há React, Next.js, Tailwind ou Bootstrap neste projeto. A stack é
intencionalmente enxuta: o site é uma página só, com conteúdo majoritariamente
estático, e um framework pesado adicionaria complexidade sem ganho real de
manutenibilidade. TypeScript é um caminho natural de evolução caso o projeto
cresça, mas não foi introduzido sem necessidade.

## Estrutura do projeto

```
joao-ricardo-site/
├── public/
│   ├── favicon.svg
│   ├── og-image.png        # TODO: adicionar imagem 1200×630 para redes sociais
│   └── robots.txt
│
├── src/
│   ├── assets/
│   │   ├── images/          # fotos e imagens reais de projetos, quando houver
│   │   └── icons/
│   │
│   ├── css/
│   │   ├── variables.css    # cores, tipografia, espaçamentos, sombras
│   │   ├── base.css         # reset + tipografia base + acessibilidade
│   │   ├── layout.css       # container, grids, nav, hero, footer
│   │   ├── components.css   # botões, cards, formulário, FAQ etc.
│   │   ├── responsive.css   # ajustes finos que não pertencem a 1 componente
│   │   ├── animations.css   # reveal on scroll
│   │   └── main.css         # importa tudo, na ordem certa
│   │
│   ├── js/
│   │   ├── main.js          # ponto de entrada — orquestra os módulos abaixo
│   │   ├── render.js         # gera o HTML das seções a partir de src/data
│   │   ├── navigation.js    # menu mobile acessível
│   │   ├── faq.js            # acordeão de FAQ acessível
│   │   ├── reveal.js         # animação de entrada ao rolar a página
│   │   ├── form.js           # validação e estados do formulário de lead
│   │   ├── whatsapp.js       # injeta os links de WhatsApp centralizados
│   │   └── analytics.js      # camada simples de eventos (trackEvent)
│   │
│   ├── data/
│   │   ├── services.js       # os 3 serviços oferecidos
│   │   ├── projects.js       # cases reais + demonstrações do portfólio
│   │   └── content.js        # problemas, processo, diferenciais, FAQ
│   │
│   └── config.js             # nome, WhatsApp, e-mail, links — fonte única
│
├── index.html
├── package.json
├── vite.config.js
├── .gitignore
└── README.md
```

### Por que um arquivo `render.js` além dos módulos pedidos originalmente?

O prompt original listava `main.js, navigation.js, faq.js, reveal.js, form.js,
whatsapp.js`. Mantive todos, mas adicionei **`render.js`** e **`analytics.js`**:

- `render.js` monta as seções repetitivas (serviços, cases de portfólio,
  demonstrações, processo, diferenciais, FAQ) a partir de `src/data/*.js`.
  Sem ele, `services.js`/`projects.js` existiriam mas o HTML continuaria
  duplicado manualmente — o que contradiz o pedido de "evitar repetir HTML
  desnecessariamente" (item 13 do prompt). Adicionar um novo projeto ou
  serviço agora é editar um objeto em `src/data/`, não mexer em marcação.
- `analytics.js` isola `trackEvent(...)` em um único lugar, como pedido no
  item 22, para que conectar Google Analytics/Plausible no futuro não exija
  tocar em `form.js`, `whatsapp.js` ou `main.js`.

## Identidade visual (preservada)

- Fundo escuro (`--color-bg: #0a0d12`), painéis em `#0f141b` / `#12181f`
- Ciano como cor primária (`--color-primary: #00e5c5`) e violeta como
  secundária (`--color-secondary: #8b7cff`)
- Tipografia: **Space Grotesk** (títulos), **Inter** (corpo), **JetBrains
  Mono** (rótulos, tags, CTAs) — mesmas fontes do design original
- Grid técnico e linhas de "blueprint" no hero e nos cards
- Estética de código/desenvolvimento (bloco de código no hero, tags tipo
  terminal nos cards de demonstração)

Todas as cores, espaçamentos, raios de borda e sombras agora vivem em
`src/css/variables.css` — nenhum valor de cor está solto pelo CSS.

## Como executar localmente

Pré-requisito: Node.js 18+.

```bash
npm install
npm run dev
```

O Vite abre o site em `http://localhost:5173` com hot reload.

## Como gerar build de produção

```bash
npm run build
npm run preview   # serve a build gerada em dist/, para conferir antes do deploy
```

O resultado fica em `dist/` — é isso que deve ser publicado (Vercel, Netlify,
GitHub Pages, etc.).

## Como configurar o WhatsApp

Edite **um único lugar**: `src/config.js`.

```js
export const config = {
  whatsappNumber: "55DDDNUMERO", // só dígitos, com DDI e DDD
  email: "seu@email.com",
  formEndpoint: null, // ver seção "Formulário" abaixo
};
```

Todo elemento com o atributo `data-wa` no HTML recebe automaticamente o link
correto do WhatsApp via `src/js/whatsapp.js` — não é preciso editar links em
mais nenhum arquivo.

## Como adicionar um novo projeto ao portfólio

Edite `src/data/projects.js` e adicione um objeto ao array `projects`:

```js
{
  id: "novo-cliente",
  isDemo: false,
  segment: "Segmento do negócio",
  title: "Nome do projeto",
  challenge: "Qual problema o negócio precisava resolver.",
  solution: "O que foi desenvolvido.",
  result: "O que a solução permite o negócio fazer (sem inventar métricas).",
  technologies: ["React", "..."],
}
```

O card é gerado automaticamente por `render.js` — não é necessário editar
`index.html`.

## Formulário de lead

O formulário (`#lead-form`) valida nome e WhatsApp no navegador e tem quatro
estados visuais: inicial, preenchendo, erro e sucesso.

Não existe backend neste projeto. Enquanto `config.formEndpoint` for `null`,
o envio é simulado (o usuário vê a mensagem de sucesso e é incentivado a
confirmar pelo WhatsApp). Para conectar um backend real:

1. Escolha um provedor (Web3Forms, Formspree, um webhook próprio).
2. Defina `formEndpoint` em `src/config.js` com a URL do endpoint.
3. `src/js/form.js` já está preparado para fazer o `POST` — nenhuma outra
   mudança é necessária.

Nunca exponha chaves de API secretas no frontend. Se o provedor exigir uma
chave privada, ela deve passar por uma função serverless (Vercel/Netlify
Functions) e não pelo `config.js` do site.

## Deploy

Qualquer host de arquivos estáticos serve:

1. `npm run build`
2. Publique a pasta `dist/` (Vercel, Netlify, Cloudflare Pages, GitHub Pages).
3. Atualize `domain` em `src/config.js` e a URL `canonical`/Open Graph em
   `index.html` para o domínio real antes de publicar.

## Decisões técnicas principais

- **Sem framework de UI**: o site é uma página só e majoritariamente
  estática; React/Vue adicionariam build step e complexidade sem ganho real.
- **Dados separados de marcação**: serviços, portfólio e FAQ vivem em
  `src/data/`, renderizados via `render.js`. Isso é o meio-termo pedido no
  prompt — dados em JS, mas sem abstrair a ponto de perder legibilidade.
- **Config centralizada**: WhatsApp, e-mail e links vivem só em
  `config.js`, evitando duplicação e facilitando trocar o contato real.
- **CSS por responsabilidade, com variáveis**: nenhuma cor ou espaçamento
  "mágico" solto no meio do código — tudo referencia `variables.css`.
- **Acessibilidade nativa sempre que possível**: FAQ usa `<button>` real com
  `aria-expanded`, o formulário tem `<label>` reais e mensagens de erro
  ligadas por `aria-live`, o menu mobile funciona por teclado (Enter, Espaço,
  Escape) e todo o site respeita `prefers-reduced-motion`.
- **Analytics preparado, não implementado**: `trackEvent()` já dispara nos
  pontos certos (`hero_cta_click`, `portfolio_view`, `whatsapp_click`,
  `form_start`, `form_submit`), mas nenhuma ferramenta de terceiros foi
  conectada — a decisão de qual usar (e a chave de configuração) fica a
  cargo do cliente.

## O que ficou preparado para implementação futura

- Endpoint real de formulário (`config.formEndpoint`)
- Conexão de analytics real dentro de `trackEvent()`
- Migração para TypeScript, se o projeto crescer (a separação atual em
  módulos ES já facilita essa transição)
- Imagens reais de projetos (hoje os cases usam uma ilustração SVG
  genérica como placeholder — trocar por prints reais em
  `src/assets/images/` quando disponíveis)
- `public/og-image.png` — a tag Open Graph já aponta para o arquivo; falta
  gerar a imagem (1200×630) e adicioná-la

## Antes de publicar (checklist)

- [ ] Substituir `whatsappNumber` em `src/config.js` pelo número real
- [ ] Substituir `email` e `domain` em `src/config.js`
- [ ] Atualizar `canonical` e URLs de Open Graph em `index.html`
- [ ] Adicionar `public/og-image.png`
- [ ] Rodar `npm run build` e `npm run preview` para conferir a build final
- [ ] Testar o formulário e todos os CTAs de WhatsApp em mobile
