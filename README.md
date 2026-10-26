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
pelo WhatsApp. Ela tem identidade própria e não compartilha estilos com o
portfólio: fundo grafite, JetBrains Mono em toda a página, azul cobalto como
destaque e um card amarelo. A composição foi inspirada no template Framer
Mondragon 6 (palavras gigantes no hero com leque de fotos, faixa de pílulas,
marcas de canto), reinterpretada em código próprio, sem copiar textos ou
imagens do template.

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

### Nativa Casa — `/demos/nativa-casa/`

Loja virtual de decoração de uma marca **fictícia**, usada como demonstração
de e-commerce. Identidade própria: fundo claro neutro, serifa editorial
(Gloock) com Hanken Grotesk na interface, detalhes em tinta escura e verde-musgo.

| Caminho | Conteúdo |
| --- | --- |
| `demos/nativa-casa/index.html` | HTML da loja (título, descrição, `noindex`) |
| `src/demos/nativa/data/catalog.ts` | Categorias, 12 produtos (nome, preço em centavos, categoria, material, descrição, medidas, cuidados, imagem), faixas de preço e ordenações |
| `src/demos/nativa/lib/catalog.ts` | Busca, filtros, ordenação, formatação de preço e filtros ↔ URL |
| `src/demos/nativa/lib/cart.tsx` | Carrinho (reducer + contexto), persistido no navegador |
| `src/demos/nativa/lib/router.ts` | Rotas por hash (`#/loja`, `#/produto/<slug>`, `#/carrinho`, `#/checkout`) |
| `src/demos/nativa/pages/` | Início, catálogo, produto, carrinho, checkout e página não encontrada |
| `src/demos/nativa/components/` | Layout, card de produto, foto, preço, seletor de quantidade, estado vazio |
| `public/demos/nativa-casa/img/` | Fotos dos produtos em WebP (928px + 480px) |

As rotas usam hash para funcionar em qualquer hospedagem estática (Vercel ou
GitHub Pages) sem regras de reescrita.

#### O que funciona no modo demonstrativo

- Página inicial com destaque, categorias, novidades e seção editorial.
- Catálogo com busca por nome (ignora acentos), filtro por categoria, material
  e faixa de preço, ordenação (destaques, preço, nome) e filtros ativos
  removíveis. Os filtros ficam na URL, então dá para compartilhar e recarregar.
- Página de produto com descrição, material, medidas, cuidados, seleção de
  quantidade (1 a 10) e produtos relacionados.
- Carrinho com alteração de quantidade, remoção de itens, subtotal e contador
  no cabeçalho. Ele é salvo no `localStorage` do navegador **apenas com o id e a
  quantidade de cada produto**.
- Checkout em duas etapas (entrega e revisão) com validação de nome, e-mail,
  CEP (com máscara), endereço, cidade e estado, e mensagens de erro por campo.
- Confirmação final que deixa claro que **nenhum pedido foi criado, nenhum
  pagamento foi feito e nenhum dado foi enviado ou salvo**. Os dados de entrega
  ficam só na memória da página e são descartados ao concluir.
- Estados vazios: busca sem resultado, carrinho vazio, checkout sem itens e
  produto inexistente.
- Sem campos de cartão, sem gateway de pagamento, sem avaliações de clientes.

#### O que seria necessário para uma loja de produção

1. **Catálogo e estoque:** mover os produtos para um banco de dados ou CMS de
   e-commerce (por exemplo, Shopify via Storefront API, Nuvemshop, Medusa ou
   um backend próprio), com estoque por produto ou variação, reservado no
   checkout e baixado após a confirmação do pagamento.
2. **Pedidos:** um backend (por exemplo, funções serverless na Vercel e um banco
   como Postgres) para criar pedidos, recalcular preços no servidor (nunca
   confiar no total enviado pelo navegador) e guardar o histórico de status.
3. **Pagamento:** integrar um gateway (Mercado Pago, Pagar.me, Stripe etc.) com
   Pix, cartão e boleto pelo checkout do próprio gateway ou pelos campos
   seguros dele (tokenização). Os dados de cartão nunca devem passar pelo
   servidor da loja. Confirmar o pagamento por **webhook**, não pelo
   redirecionamento do navegador. Chaves secretas ficam só no servidor.
4. **Frete:** cálculo real por CEP (Correios, Melhor Envio ou transportadora)
   e geração de etiquetas.
5. **Clientes e privacidade (LGPD):** política de privacidade, termos de uso,
   base legal para cada dado coletado, prazo de retenção e, se houver contas,
   autenticação segura.
6. **Operação:** e-mails transacionais (pedido recebido, pago, enviado), painel
   administrativo, emissão de nota fiscal, política de trocas e devoluções
   (Código de Defesa do Consumidor) e dados da empresa (CNPJ, endereço,
   contato) no rodapé.
7. **SEO e medição:** URLs sem hash (rotas reais com reescrita na Vercel ou
   um framework com SSR, como Next.js), dados estruturados de produto e
   analytics com consentimento.
8. **Conteúdo real:** fotos dos produtos, preços, textos e marca do cliente;
   remover o aviso de demonstração e o `noindex`.

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
