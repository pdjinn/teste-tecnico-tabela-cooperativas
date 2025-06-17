# Sistema de Cooperativas - Teste Frontend

## Sobre o Projeto

Aplicação web desenvolvida com **Next.js** e **shadcn/ui** para exibição de informações de cooperativas obtidas de uma API REST. O projeto implementa uma tabela responsiva com funcionalidades de paginação, ordenação e formatação de dados.

##  Tecnologias Utilizadas

- **Next.js 13+** (App Router)
- **TypeScript**
- **shadcn/ui** (componentes de interface)
- **Tailwind CSS** (estilização)
- **Lucide React** (ícones)

## Como Executar o Projeto

### Pré-requisitos

- Node.js 18+
- npm, yarn ou pnpm

### Instalação

```bash
# Clone o repositório
git clone https://github.com/pdjinn/teste-tecnico-tabela-cooperativas

# Entre na pasta do projeto

# Instale as dependências
npm install
# ou
yarn install
# ou
pnpm install
```

### Executar em ambiente de desenvolvimento

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

Acesse [http://localhost:3000](http://localhost:3000) no seu navegador.

##  Funcionalidades Implementadas

###  Tabela de Cooperativas
- Exibição responsiva de dados das cooperativas
- Colunas: Nome, CNPJ, Estado, Sistema Cooperativo
- Design limpo e profissional utilizando componentes shadcn/ui

###  Formatação de Dados
- **CNPJ formatado** com máscara: `XX.XXX.XXX/XXXX-XX`
- Exemplo: `42898825000115` → `42.898.825/0001-15`

###  Paginação
- 10 registros por página
- Controles de navegação (Anterior/Próxima)
- Indicador de página atual e total de páginas
- Componentes shadcn/ui para interface consistente

###  Ordenação
- Ordenação clicável em todos os headers da tabela
- Três estados por coluna:
  - 1º clique: **Ordem crescente** ↑
  - 2º clique: **Ordem decrescente** ↓
  - 3º clique: **Estado original**
- Indicadores visuais para estado da ordenação

###  Responsividade
- Layout adaptativo para diferentes tamanhos de tela
- Testado em dispositivos mobile e tablet
- Tabela otimizada para visualização em telas pequenas

###  Estados da Aplicação
- **Loading spinner** durante carregamento dos dados
- **Tratamento de erros** da API
- **Estados de loading** com feedback visual

##  API Utilizada

- **Endpoint**: `https://subscribe-api-production.up.railway.app/api/v1/coops`
- **Método**: GET
- **Autenticação**: Não necessária
- **Formato**: Array de objetos JSON

##  Estrutura do Projeto

```
src/
├── app/                    # App Router (Next.js 13+)
│   ├── globals.css        # Estilos globais
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Página inicial
├── components/            # Componentes React
│   ├── cooperativas/      # Componentes específicos
│   │   └── CooperativasTable.tsx
│   └── ui/               # Componentes shadcn/ui
├── lib/                  # Utilitários
│   └── utils.ts          # Funções auxiliares
└── types/               # Definições TypeScript
    └── cooperativa.ts   # Tipos da aplicação
```

##  Decisões Técnicas

### Arquitetura
- **App Router** do Next.js 13+ para roteamento moderno
- **Componentes funcionais** com hooks do React
- **TypeScript** para tipagem estática e maior segurança
- **Separação de responsabilidades** entre componentes

### Performance
- **useState** para gerenciamento de estado local
- **useEffect** otimizado para chamadas da API
- **Paginação** para limitar dados renderizados
- **Memoização** implícita dos componentes funcionais

### Interface
- **shadcn/ui** para componentes consistentes e acessíveis
- **Tailwind CSS** para estilização utilitária
- **Design system** coeso com tema personalizado
- **Indicadores visuais** para melhor UX

### Tratamento de Dados
- **Formatação de CNPJ** com função utilitária reutilizável
- **Ordenação** implementada com algoritmos JavaScript nativos
- **Validação** de tipos com TypeScript

##  Melhorias Futuras

### Funcionalidades
- Busca/filtro por nome ou CNPJ
- Exportação de dados (CSV/Excel)

### Interface
- Modo escuro (dark mode)
- Animações de transição

##  Testes

### Testes realizados
- Responsividade em diferentes dispositivos
- Funcionalidade de paginação
- Ordenação em todas as colunas
- Formatação correta do CNPJ
- Loading states
- Tratamento de erros da API

## Desenvolvedor

Desenvolvido por Pedro Nunes de Lima para o teste técnico da Fenasbac.

---

**Obrigado pela oportunidade de demonstrar minhas habilidades técnicas!** 

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
