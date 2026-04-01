# Agentic Code Architecture Docs

Aplicação web estática para navegar uma base documental sobre arquitetura de sistemas de código agentic no estilo Claude Code.

O projeto renderiza arquivos Markdown locais, organiza o conteúdo por seções e oferece navegação lateral, busca textual, sumário por página e suporte a tema claro/escuro.

## Visão geral

- Frontend em React 19 + TypeScript com Vite.
- Estilização com Tailwind CSS.
- Roteamento por `HashRouter`, facilitando publicação como site estático.
- Renderização de Markdown com suporte a GFM e highlight de código.
- Busca local com `Fuse.js`.
- Documentação organizada em seções temáticas dentro de `docs/`.

## Funcionalidades

- Página inicial com navegação por seções.
- Sidebar com estrutura da documentação.
- Busca rápida por título e conteúdo com atalho `Ctrl + K`.
- Sumário automático para headings `##` e `###`.
- Navegação entre documento anterior e próximo.
- Persistência de tema via `localStorage`.

## Stack

- `react`
- `react-router-dom`
- `react-markdown`
- `remark-gfm`
- `rehype-highlight`
- `fuse.js`
- `tailwindcss`
- `vite`

## Como executar

### Pré-requisitos

- Node.js 20+ recomendado
- npm

### Instalação

```bash
npm install
```

### Ambiente de desenvolvimento

```bash
npm run dev
```

### Build de produção

```bash
npm run build
```

### Visualizar o build

```bash
npm run preview
```

## Estrutura do projeto

```text
.
|-- docs/                  # Base documental em Markdown
|-- src/
|   |-- components/        # Layout, sidebar, busca, renderer, TOC
|   |-- config/docs.ts     # Estrutura de seções e navegação
|   |-- lib/docs-loader.ts # Importação manual dos arquivos .md
|   |-- pages/             # Home, documento e 404
|   |-- hooks/             # Busca e table of contents
|   `-- styles/            # Estilos globais
|-- index.html
|-- package.json
|-- tailwind.config.ts
`-- vite.config.ts
```

## Organização da documentação

O conteúdo fica em `docs/`, dividido por áreas como:

- índice
- visão geral
- CLI e experiência
- web e API
- extensibilidade
- agentes e contexto
- backend e dados
- operação
- avaliação
- referências

Atualmente o site carrega os documentos por import estático em tempo de build.

## Como adicionar um novo documento

1. Crie o arquivo Markdown dentro da seção correspondente em `docs/`.
2. Importe o arquivo em [src/lib/docs-loader.ts](C:\Users\carlos.fonseca\Documents\Typewith\GIT Public\agentic-code-architeture-docs\src\lib\docs-loader.ts).
3. Registre o documento em [src/config/docs.ts](C:\Users\carlos.fonseca\Documents\Typewith\GIT Public\agentic-code-architeture-docs\src\config\docs.ts).
4. Garanta que o Markdown tenha um heading `#` principal, usado como título da página.
5. Use headings `##` e `###` quando quiser que o item apareça no sumário lateral.

## Observações de manutenção

- O conteúdo da busca é indexado localmente no frontend.
- Como os documentos são importados manualmente, adicionar um arquivo em `docs/` sem atualizar `docs-loader.ts` e `docs.ts` não o torna visível na aplicação.
- O uso de `HashRouter` ajuda no deploy em hosting estático sem configuração especial de rewrite.

## Scripts disponíveis

- `npm run dev`: inicia o servidor de desenvolvimento
- `npm run build`: gera o bundle de produção
- `npm run preview`: serve o build localmente
