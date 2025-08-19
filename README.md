# Portfolio Mono-repo

Este é um mono-repo contendo uma API em Golang e um frontend em React.

## Estrutura do Projeto

```
portfolio-2/
├── api/                    # Backend em Golang
│   ├── main.go            # Servidor principal
│   ├── go.mod             # Dependências Go
│   ├── docker-compose.yml # PostgreSQL local
│   └── .env.example       # Variáveis de ambiente
└── frontend/              # Frontend React + Vite
    ├── src/               # Código fonte
    ├── package.json       # Dependências Node.js
    └── tailwind.config.js # Configuração Tailwind
```

## Tecnologias

### Backend
- Go
- PostgreSQL
- Driver lib/pq

### Frontend
- React 19
- TypeScript
- Vite
- Tailwind CSS
- Jest (testes)
- Bun (package manager)

## Desenvolvimento

### Backend
```bash
cd api
docker-compose up -d  # Iniciar PostgreSQL
go run main.go        # Iniciar servidor
```

### Frontend
```bash
cd frontend
bun install           # Instalar dependências
bun run dev          # Servidor de desenvolvimento
bun run test         # Executar testes
```

## Deploy

O projeto está configurado para deploy no Railway usando `railway.toml`.