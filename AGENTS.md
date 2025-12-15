# AGENTS

Guia de colaboração para agentes (IA e humanos) neste mono‑repo de portfólio. Foque em mudanças pequenas, seguras e alinhadas ao estilo existente.
<Important>
Você está em um repositório em que você pode fazer alterações. Basta pedir para que você possa executar alterações e edições do código.
<Important/>

## Visão Geral
- Monorepo com `api` (Go + Fiber + Huma + Gorm + PostgreSQL - Arquitetura Hexagonal) e `frontend` (React + TypeScript + Vite + Tailwind + Jest, gerenciador Bun).
- Coleção Postman: `Portfolio_API.postman_collection.json`.
- Deploy via Docker Compose na raiz (`docker-compose.yml`), ideal para VPS/Coolify.

## Estrutura do Projeto
```
portfolio-2/
├── api/
│   ├── main.go        # Ponto de entrada, injeção de dependências
│   ├── go.mod, go.sum
│   ├── docker-compose.yml
│   ├── .env.example
│   ├── internal/
│   │   ├── core/                # Regras de negócio (Puro Go)
│   │   │   ├── domain/          # Entidades (ex: User)
│   │   │   ├── ports/           # Interfaces (ex: UserRepository)
│   │   │   └── services/        # Implementação dos casos de uso
│   │   └── adapters/            # Integrações externas
│   │       ├── handler/         # HTTP/Web (Huma + Fiber)
│   │       ├── repository/      # Banco de dados (GORM/Postgres)
│   │       └── security/        # Auth (Bcrypt, JWT)
│   └── migrations/    # SQL de migrações (se aplicável)
├── frontend/
│   ├── src/
│   │   ├── features/      # Módulos de Negócio (Auth, Portfolio, Chat)
│   │   │   ├── auth/      # Ex: components, hooks, services, types
│   │   │   └── ...
│   │   ├── shared/        # Componentes Genéricos e Utils
│   │   │   ├── components/# UI Kit (Button, GlassCard, Typography)
│   │   │   └── lib/       # Configurações globais (apiClient)
│   │   └── pages/         # Roteamento e Composição (Thin Wrappers)
│   ├── package.json       # scripts (vite, jest, eslint)
│   ├── bun.lock           # lockfile do Bun
│   └── tailwind.config.js
├── README.md              # instruções gerais
├── railway.toml           # deploy
```

## Fluxo de Trabalho Recomendado (Agentes)
- Entender contexto: leia `README.md`, esta `AGENTS.md` e o código relevante.
- Planejar: liste passos concisos antes de editar (pequenos, verificáveis).
- Implementar: mudanças cirúrgicas, mínimas e consistentes com o estilo atual.
- Validar: rode, teste e lint apenas o escopo afetado quando possível.
- Documentar: atualize `README.md` e `.env.example` quando necessário.

## Backend (api)
- Stack: Go + Fiber (Huma adapter) + Gorm + PostgreSQL.
- Arquitetura: Hexagonal (Ports and Adapters).
- Rodar local:
  - Banco: `cd api && docker-compose up -d`
  - Servidor: `go run main.go`
- Variáveis (`api/.env.example`):
  - `DATABASE_URL` (ou DSN default local)
  - `PORT` (default `8080`)
  - `JWT_SECRET`
  - `ADMIN_REGISTRATION_CODE`
- Migrações: `AutoMigrate` em `main.go` para `repository.UserGorm` (dev).
- Onde mudar o quê:
  - **Regras de Negócio**: `api/internal/core/services/`
  - **Definição de Entidades**: `api/internal/core/domain/`
  - **Novos Endpoints (Contrato)**: `api/internal/adapters/handler/handler.go` e `types.go`
  - **Banco de Dados**: `api/internal/adapters/repository/`
  - **Segurança/Auth**: `api/internal/adapters/security/`

## Frontend (frontend)
- Stack: React 19, TypeScript, Vite, Tailwind CSS, Jest.
- Arquitetura: **Feature-Based** (Inspirada em Feature-Sliced Design).
- Rodar:
  - `cd frontend && bun install`
  - `bun run dev` (dev server)
  - `bun run test` (Jest)

### Estrutura de Diretórios
- **`src/features/`**: Contém o código de domínio, agrupado por funcionalidade (ex: `auth`, `portfolio`, `chat`).
  - Cada feature possui seus próprios `components`, `hooks`, `services` e `types`.
  - O objetivo é alta coesão: tudo relacionado a uma feature fica junto.
- **`src/shared/`**: Código reutilizável e agnóstico ao domínio.
  - `components/`: UI Kit base (Botões, Inputs, Cards) e Tipografia.
  - `lib/`: Utilitários e configurações de infraestrutura (ex: cliente HTTP `apiClient`).
- **`src/pages/`**: Camada de Roteamento.
  - Arquivos aqui devem ser apenas "Cola" ou Wrappers que importam componentes das `features`. Não devem conter lógica de negócio ou estilização complexa.

### Componentização Global (Decisão de Arquitetura)
- Objetivo: todo markup e atributos HTML devem ficar encapsulados em componentes reutilizáveis.
- Componentes base atuais (agora em `src/shared/components`):
  - `GlassCard.tsx`: card com efeito glass.
  - Tipografia (`typography/*`): `Title`, `Text`, `Inline`.
- Regras de uso:
  - Prefira compor com componentes de `shared/components` ao invés de usar HTML cru.
  - Se um componente é usado apenas em uma feature, ele deve ficar em `features/<feature>/components`.
  - Se for usado em mais de uma feature, mova para `shared/components`.

## Convenções de Código
- Geral:
  - Evite mudanças fora do escopo solicitado.
  - Não adicione cabeçalhos de licença automaticamente.
  - Mantenha nomes de arquivos e APIs existentes quando possível.
- Go:
  - Formatação padrão (`gofmt`/`goimports`).
  - Erros com contexto.
- Frontend:
  - TypeScript estrito.
  - Imports devem usar o alias `@/` (mapeado para `src/`).
  - Componentes funcionais; preferir hooks e composição.
  - Tailwind para estilos.

## Checklist de PRs/MRs
- Escopo pequeno e bem descrito.
- `frontend`: `bun run lint` e `bun run test` sem falhas.
- Build local do `frontend` passa (`bun run build`).
- `api` compila e roda localmente; testes unitários (`go test ./...`) passam.
- Documentação atualizada.

## Verificação da Estrutura (atual)
- `api`: Arquitetura Hexagonal preservada.
- `frontend`: Estrutura Feature-Based (`src/features`, `src/shared`, `src/pages`).
- `README.md` condiz com a estrutura real do repositório.
