# VeyzaTech — site oficial

Site comercial da VeyzaTech, o estúdio de desenvolvimento web freelancer de
João Ricardo. A página funciona como ferramenta de aquisição de clientes:
apresenta serviços, projetos reais, demonstrações e o processo de trabalho,
e leva o visitante ao pedido de orçamento.

## Stack

- React 19 + TypeScript
- Vite 8
- Tailwind CSS 4 (via `@tailwindcss/vite`, tokens em `src/index.css`)
- Nenhuma outra dependência de runtime

## Executar localmente

Pré-requisito: Node.js 20 ou superior.

```bash
npm install
cp .env.example .env.local   # opcional: preencha WhatsApp, e-mail e endpoint
npm run dev                  # http://localhost:5173
npm run build                # checa tipos e gera dist/
npm run preview              # serve a build de produção
```

## Configuração externa (variáveis de ambiente)

Todas são públicas (`VITE_*` vão para o navegador). **Nunca** coloque chaves
secretas nelas. Configure em `.env.local` ou na Vercel
(Project → Settings → Environment Variables).

| Variável | O que faz | Se ficar vazia |
| --- | --- | --- |
| `VITE_WHATSAPP_NUMBER` | Número com DDI+DDD, só dígitos (ex.: `5511999998888`) | Botões de WhatsApp são trocados por "Enviar pedido pelo formulário" |
| `VITE_CONTACT_EMAIL` | E-mail exibido no contato e no rodapé | E-mail não aparece |
| `VITE_FORM_ENDPOINT` | URL `https://` que recebe o formulário via `POST` JSON | O formulário valida, mas **não envia**: avisa o visitante e oferece WhatsApp, e-mail ou copiar o texto |
| `VITE_VETRA_WHATSAPP` | WhatsApp da landing page Vetra Academia (demo) | Os CTAs da demo mostram a mensagem pré-preenchida em uma janela, sem abrir conversa |
| `VITE_SITE_URL` | Domínio final (reservado para uso futuro) | — |

### Formulário

Com `VITE_FORM_ENDPOINT` definido, o formulário envia
`{ name, contact, projectType, goal, budget, description, _subject }` com
`Accept: application/json`. Funciona direto com o Formspree
(`https://formspree.io/f/SEU_ID`). Se o serviço exigir chave secreta, crie
uma função serverless na Vercel (`/api/...`) que guarde a chave em variável
de ambiente **sem** prefixo `VITE_` e aponte o endpoint para ela.

## Onde editar o conteúdo

Todo o conteúdo fica em `src/data/`, separado dos componentes:

| Arquivo | Conteúdo |
| --- | --- |
| `projects.ts` | Portfólio. `status`: `real`, `conceitual` ou `em-desenvolvimento`. `visible: false` esconde o projeto. `liveUrl: null` não exibe botão de visita. |
| `demos.ts` | Demonstrações. `availability`: `disponivel`, `em-construcao` ou `em-breve`. O botão "Experimentar" só aparece com `disponivel` **e** `url` preenchida. |
| `services.ts` | Serviços (problema, público, CTA) e tipos de projeto do formulário. |
| `content.ts` | Navegação, etapas do processo, trajetória, tecnologias e FAQ. |

### Imagens reais de projetos

Enquanto um projeto não tiver captura de tela, o site desenha uma prévia
ilustrativa em código e indica isso na barra do navegador ("representação
ilustrativa"). Para usar uma captura real:

1. Salve a imagem em `public/projects/` (WebP, ~1600×1000, proporção 16:10).
2. Preencha `image` no projeto:

```ts
image: { src: "/projects/esl-eletrica.webp", alt: "Página inicial do site da ESL Elétrica", width: 1600, height: 1000 },
```

As imagens são carregadas com `loading="lazy"` e dimensões explícitas.

## Estrutura

```
src/
├── App.tsx              # ordem das seções
├── config.ts            # lê as variáveis VITE_*
├── index.css            # Tailwind + tokens de cor/tipografia
├── types.ts
├── data/                # conteúdo (editar aqui)
├── lib/
│   ├── contact.ts       # links de WhatsApp e e-mail
│   └── validation.ts    # validação do formulário
└── components/          # Header, Hero, Projects, Services, Demos,
                         # Process, About (+ Tecnologias), Faq,
                         # Contact, QuoteForm, Footer e peças reutilizáveis
```

## Landing pages demonstrativas

Além do portfólio, o projeto gera landing pages independentes que aparecem
na seção Demonstrações (`src/data/demos.ts`).

### Vetra Academia — `/demos/vetra-academia/`

Landing page de uma academia **fictícia**, feita para gerar pedidos de visita
pelo WhatsApp. Ela tem identidade própria (Archivo condensada, giz, ferro e
azul cobalto) e não compartilha estilos com o portfólio.

| Caminho | Conteúdo |
| --- | --- |
| `demos/vetra-academia/index.html` | HTML da página (título, descrição, `noindex`) |
| `src/demos/vetra/data/content.ts` | Textos, horários, benefícios, áreas, planos, diferenciais, depoimentos, FAQ e mensagens do WhatsApp |
| `src/demos/vetra/components/` | Seções (cada uma com composição própria) |
| `src/demos/vetra/whatsapp.tsx` | CTAs de WhatsApp e modo demonstração |
| `public/demos/vetra-academia/img/` | Fotos em WebP (1 tamanho grande + 640px) |

Comportamento dos CTAs de WhatsApp:

- **Sem `VITE_VETRA_WHATSAPP`** (padrão da demo): cada botão abre uma janela
  explicando que é uma demonstração e mostrando a mensagem pré-preenchida.
  Nenhum link aponta para um número inexistente.
- **Com `VITE_VETRA_WHATSAPP`**: os botões viram links `wa.me` reais, e o
  formulário de visita abre o WhatsApp com nome, telefone, objetivo e período.

O formulário não envia dados a nenhum servidor: ele só valida os campos e
monta a mensagem do WhatsApp.

Honestidade do conteúdo: a página exibe um aviso de marca fictícia no topo e
no rodapé, os valores dos planos são marcados como ilustrativos (sem descontos,
cronômetros ou urgência), e os depoimentos são identificados como exemplos
fictícios. A página tem `noindex` para não aparecer em buscas como se fosse
uma academia real.

**Fotos:** geradas por IA (Figma AI), sem marcas de equipamentos, e
identificadas como ilustrativas no rodapé. Para um cliente real, troque os
arquivos em `public/demos/vetra-academia/img/` mantendo os mesmos nomes e
tamanhos, ou ajuste os nomes em `content.ts` e nos componentes.

**Para adaptar a um cliente real:** edite `content.ts`, troque as fotos,
defina `VITE_VETRA_WHATSAPP`, remova o `DemoBanner` (`components/Header.tsx`),
o `noindex` do HTML e a nota de demonstração do rodapé.

## Identidade visual

- Base creme `#F8F3E3`, texto grafite `#222222`
- Verde escuro `#182421` e verde suave `#B6C6A5`
- Tons quentes: âmbar `#E2A23B`, ferrugem `#9C4221`, areia `#ECDFC2`
- Tipografia: Bricolage Grotesque (títulos e interface) e Newsreader (texto)
- A única animação automática é a montagem da colagem do hero, desativada
  com `prefers-reduced-motion`

## Deploy na Vercel

1. Importe o repositório na Vercel (o framework Vite é detectado; `vercel.json`
   já define build, saída e cabeçalhos de cache).
2. Configure as variáveis de ambiente acima.
3. Depois de definir o domínio, adicione `<link rel="canonical">` e troque
   `og:image` por URL absoluta em `index.html`.

## Deploy no GitHub Pages

O workflow `.github/workflows/pages.yml` compila e publica o site a cada push
na `main` (ou manualmente, em Actions → Deploy no GitHub Pages → Run workflow).

1. No GitHub: Settings → Pages → Source: **GitHub Actions** (uma vez só).
2. Opcional: em Settings → Secrets and variables → Actions → **Variables**,
   crie `VITE_WHATSAPP_NUMBER`, `VITE_CONTACT_EMAIL` e `VITE_FORM_ENDPOINT`.
3. O site fica em `https://jonrichard157-lang.github.io/joao-ricardo-site/`.

O caminho base vem de `BASE_PATH` (definido no workflow); na Vercel ele não
é usado e o site fica na raiz do domínio.

## Antes de publicar

- [ ] Definir `VITE_WHATSAPP_NUMBER`, `VITE_CONTACT_EMAIL` e `VITE_FORM_ENDPOINT`
- [ ] Revisar o texto do LeadFinder em `projects.ts` (marcado com `TODO`)
- [ ] Revisar as listas de tecnologias em `content.ts`
- [ ] Adicionar capturas reais e `liveUrl` dos projetos publicados
- [ ] Publicar as demos e mudar `availability` para `disponivel` com a `url`
- [ ] Canonical e `og:image` absolutos após definir o domínio
- [ ] Opcional: `VITE_VETRA_WHATSAPP` para a demo da Vetra abrir conversas reais
