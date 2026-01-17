# AGENTS

Guia de colaboração para agentes (IA e humanos) neste mono‑repo de portfólio. Foque em mudanças pequenas, seguras e alinhadas ao estilo existente.
<Important>
Você está em um repositório em que você pode fazer alterações. Basta pedir para que você possa executar alterações e edições do código.
<Important/>

## Visão Geral
- Monorepo com `api` (TypeScript + FOA - Flux-Oriented Architecture + PostgreSQL) e `frontend` (React + TypeScript + Vite + Tailwind + Jest, gerenciador Bun).
- Deploy via Docker Compose na raiz (`docker-compose.yml`), ideal para VPS/Coolify.

## Estrutura do Projeto
```
portfolio-2/
├── api/
│   ├── src/
│   │   ├── actions/           # Lógica de negócio (TypeScript)
│   │   │   ├── auth/          # login, register, getMe, changePassword
│   │   │   ├── users/         # list, create, getById, update, delete
│   │   │   └── shared/        # validateAuth, requireAdmin, etc.
│   │   ├── flux/              # Definições de rotas (JSON declarativo)
│   │   │   ├── auth/          # Fluxos de autenticação
│   │   │   └── users/         # Fluxos de CRUD de usuários
│   │   └── types.ts           # Tipos compartilhados
│   ├── migrations/            # SQL de migrações
│   ├── scripts/               # Scripts utilitários (migrate.js)
│   ├── foa.config.json        # Configuração do FOA (plugins, paths)
│   ├── package.json
│   └── .env.example
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
- Stack: TypeScript + FOA (Flux-Oriented Architecture) + PostgreSQL (plugin nativo).
- Arquitetura: **Flux-Oriented** (Actions + Flows declarativos em JSON).
- Rodar local:
  - Banco: `cd api-go-backup && docker compose up -d` (usa o docker-compose do backup)
  - Migrações: `cd api && npm run migrate`
  - Servidor: `cd api && npm run dev`
- Variáveis (`api/.env.example`):
  - `DATABASE_URL` (PostgreSQL connection string)
  - `PORT` (default `8080`)
  - `JWT_SECRET`
  - `ADMIN_REGISTRATION_CODE`
- Onde mudar o quê:
  - **Lógica de Negócio**: `api/src/actions/` (cada arquivo é uma action)
  - **Definição de Rotas**: `api/src/flux/` (arquivos JSON declarativos)
  - **Autenticação**: `api/src/actions/shared/validateAuth.ts`
  - **Configuração de Plugins**: `api/foa.config.json`
- CLI útil:
  - `npx foa validate` - Valida todos os fluxes JSON
  - `npx foa list` - Lista endpoints registrados
  - `npx foa dev` - Inicia servidor em modo desenvolvimento

### Endpoints Disponíveis
| Método | Path | Descrição | Auth |
|--------|------|-----------|------|
| POST | `/api/auth/login` | Login | Não |
| POST | `/api/auth/register` | Registro | Não |
| GET | `/api/auth/me` | Perfil do usuário | Sim |
| PUT | `/api/auth/change-password` | Trocar senha | Sim |
| GET | `/api/users` | Listar usuários | Admin |
| POST | `/api/users` | Criar usuário | Admin |
| GET | `/api/users/:id` | Buscar usuário | Admin |
| PUT | `/api/users/:id` | Atualizar usuário | Admin |
| DELETE | `/api/users/:id` | Deletar usuário | Admin |

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
- API (FOA):
  - Actions são funções async que recebem `ctx: FluxContext`.
  - Use `validateOrThrow` para validação de input.
  - Retorne objetos com `success: boolean` para controle de fluxo.
  - Fluxes são JSON declarativos em `src/flux/`.
- Frontend:
  - TypeScript estrito.
  - Imports devem usar o alias `@/` (mapeado para `src/`).
  - Componentes funcionais; preferir hooks e composição.
  - Tailwind para estilos.

## Checklist de PRs/MRs
- Escopo pequeno e bem descrito.
- `frontend`: `bun run lint` e `bun run test` sem falhas.
- Build local do `frontend` passa (`bun run build`).
- `api`: `npx foa validate` passa sem erros.
- Documentação atualizada.

## Verificação da Estrutura (atual)
- `api`: Arquitetura FOA (Flux-Oriented Architecture).
- `frontend`: Estrutura Feature-Based (`src/features`, `src/shared`, `src/pages`).
- `README.md` condiz com a estrutura real do repositório.
