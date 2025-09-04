# AGENTS

Guia de colaboração para agentes (IA e humanos) neste mono‑repo de portfólio. Foque em mudanças pequenas, seguras e alinhadas ao estilo existente.

## Visão Geral
- Monorepo com `api` (Go + Fiber + Gorm + PostgreSQL) e `frontend` (React + TypeScript + Vite + Tailwind + Jest, gerenciador Bun).
- Coleção Postman: `Portfolio_API.postman_collection.json`.
- Deploy via Railway: `railway.toml`.

## Estrutura do Projeto
```
portfolio-2/
├── api/
│   ├── main.go
│   ├── go.mod, go.sum
│   ├── docker-compose.yml
│   ├── .env.example
│   ├── config/        # DB, conexões
│   ├── handlers/      # handlers HTTP (auth, users, ...)
│   ├── middleware/    # CORS, auth, etc.
│   ├── migrations/    # SQL de migrações
│   ├── models/        # modelos Gorm
│   ├── routes/        # definição de rotas
│   └── utils/         # helpers (ex.: auth)
├── frontend/
│   ├── src/           # páginas e componentes
│   ├── package.json   # scripts (vite, jest, eslint)
│   ├── bun.lock       # lockfile do Bun
│   └── tailwind.config.js
├── README.md          # instruções gerais
├── railway.toml       # deploy
└── Portfolio_API.postman_collection.json
```

## Fluxo de Trabalho Recomendado (Agentes)
- Entender contexto: leia `README.md`, esta `AGENTS.md` e o código relevante.
- Planejar: liste passos concisos antes de editar (pequenos, verificáveis).
- Implementar: mudanças cirúrgicas, mínimas e consistentes com o estilo atual.
- Validar: rode, teste e lint apenas o escopo afetado quando possível.
- Documentar: atualize `README.md` e `.env.example` quando necessário.

## Backend (api)
- Stack: Go + Fiber + Gorm + PostgreSQL.
- Rodar local:
  - Banco: `cd api && docker-compose up -d`
  - Servidor: `go run main.go`
- Variáveis (`api/.env.example`):
  - `DATABASE_URL` (ou DSN default local)
  - `PORT` (default `8080`)
  - `JWT_SECRET`
  - `ADMIN_REGISTRATION_CODE`
- Migrações: SQL em `api/migrations` + `AutoMigrate` para `models.User`.
- Onde mudar o quê:
  - Rotas: `api/routes/routes.go`
  - Middlewares: `api/middleware/*`
  - Handlers: `api/handlers/*`
  - Modelos: `api/models/*`
  - DB/Config: `api/config/database.go`

## Frontend (frontend)
- Stack: React 19, TypeScript, Vite, Tailwind CSS, Jest.
- Rodar:
  - `cd frontend && bun install`
  - `bun run dev` (dev server)
  - `bun run test` (Jest)
- Estrutura: páginas em `src/pages/*`, componentes utilitários em `src/components/*`.

## Convenções de Código
- Geral:
  - Evite mudanças fora do escopo solicitado.
  - Não adicione cabeçalhos de licença automaticamente.
  - Mantenha nomes de arquivos e APIs existentes quando possível.
- Go:
  - Formatação padrão (`gofmt`/`goimports`).
  - Erros com contexto; handlers retornam JSON via Fiber com o error handler global.
  - Pacotes curtos e descritivos; structs e campos com nomes claros.
- Frontend:
  - TypeScript estrito quando aplicável; tipos explícitos em APIs públicas.
  - Componentes funcionais; preferir hooks e composição.
  - Tailwind para estilos; evitar CSS ad‑hoc.
  - Siga o ESLint configurado em `frontend/eslint.config.js`.

## Checklist de PRs/MRs
- Escopo pequeno e bem descrito.
- `frontend`: `bun run lint` e `bun run test` sem falhas.
- Build local do `frontend` passa (`bun run build`).
- `api` compila e roda localmente; migrações testadas quando alteradas.
- Documentação atualizada (inclui exemplos de `.env`).
- Sem segredos no repositório; use `.env` local e mantenha `.env.example` atualizado.

## Segurança e Segredos
- Nunca faça commit de chaves reais (`JWT_SECRET`, senhas, tokens).
- Valide entradas no backend; mantenha autenticação/autorizações nos handlers.
- Reveja CORS e middlewares de segurança ao expor novos endpoints.

## Dicas de Solução de Problemas
- DB: confirme `docker-compose up -d` em `api/` e `DATABASE_URL`.
- Portas: `PORT` 8080 pode conflitar; ajuste no `.env`.
- Bun/Node: se `bun` não estiver instalado, use `npm`/`pnpm` adaptando scripts.
- Testes Jest: confira `frontend/jest.config.js` e `frontend/src/setupTests.ts`.

## Verificação da Estrutura (atual)
- `api`: pastas `config`, `handlers`, `middleware`, `migrations`, `models`, `routes`, `utils` presentes; arquivos chave `main.go`, `go.mod`, `.env.example`, `docker-compose.yml` presentes.
- `frontend`: `src/`, `package.json`, `tailwind.config.js` presentes; páginas em `src/pages/*` e componentes em `src/components/*`.
- `README.md` condiz com a estrutura real do repositório.

## Referências
- Coleção Postman: `Portfolio_API.postman_collection.json`
- Deploy: `railway.toml`
- README: instruções rápidas de dev para API e Frontend
