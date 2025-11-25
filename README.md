# Portfolio Mono-repo

Este é um mono-repo contendo uma API em Golang e um frontend em React.

## Estrutura do Projeto

```
portfolio-2/
├── api/                    # Backend em Golang (Arquitetura Hexagonal)
│   ├── main.go            # Servidor principal (Injeção de dependências)
│   ├── go.mod             # Dependências Go
│   ├── docker-compose.yml # PostgreSQL local
│   ├── .env.example       # Variáveis de ambiente
│   └── internal/          # Código interno da aplicação
│       ├── core/          # Lógica de negócio pura (Domínio, Portas, Serviços)
│       └── adapters/      # Implementações externas (HTTP, Repositório, Segurança)
└── frontend/              # Frontend React + Vite
    ├── src/
    │   ├── features/      # Funcionalidades por domínio (Auth, Portfolio, Chat)
    │   ├── shared/        # Componentes UI e utilitários compartilhados
    │   └── pages/         # Roteamento
    ├── package.json       # Dependências Node.js
    └── tailwind.config.js # Configuração Tailwind
```

## Tecnologias

### Backend
- **Linguagem**: Go
- **Web Framework**: Fiber + Huma (OpenAPI/Swagger automático)
- **ORM**: GORM
- **Banco de Dados**: PostgreSQL
- **Arquitetura**: Hexagonal (Ports & Adapters)

### Frontend
- React 19
- TypeScript
- Vite
- Tailwind CSS
- Jest (testes)
- Bun (package manager)
- **Arquitetura**: Feature-Based (Modular)

## Desenvolvimento

### Backend
```bash
cd api
docker-compose up -d  # Iniciar PostgreSQL
go run main.go        # Iniciar servidor
```

A documentação da API (Swagger UI) estará disponível em: `http://localhost:8080/docs`

### Frontend
```bash
cd frontend
bun install           # Instalar dependências
bun run dev          # Servidor de desenvolvimento
bun run test         # Executar testes
```

## Deploy

O projeto está configurado para deploy no Railway usando `railway.toml`.