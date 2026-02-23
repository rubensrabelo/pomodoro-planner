# Backend

API REST do PomoPlanner desenvolvida com Node.js, TypeScript, Express, Prisma ORM e PostgreSQL.

A aplicação segue organização modular e princípios de separação de responsabilidades, facilitando escalabilidade, testes e manutenção.

---

## Tecnologias

* Node.js
* TypeScript
* Express
* Prisma ORM
* PostgreSQL
* Vitest
* Supertest

---

## Estrutura do Projeto

```
backend/
├─ src/
│  ├─ app.ts
│  ├─ server.ts
│  │
│  ├─ modules/
│  │  ├─ entity/
│  │  │  ├─ api/
│  │  │  │  ├─ controllers/
│  │  │  │  └─ routes/
│  │  │  ├─ application/
│  │  │  │  ├─ dtos/
│  │  │  │  └─ services/
│  │  │  ├─ domain/
│  │  │  ├─ infra/
│  │  │  │  ├─ container/
│  │  │  │  └─ repositories/
│  │  │  ├─ types/
│  │  │  ├─ validators/
│  │  │  └─ docs/
│  │
│  ├─ infra/
│  │  └─ prisma/
│  │     └─ client.ts
│  │
│  └─ shared/
│     ├─ docs/
│     ├─ errors/
│     ├─ middlewares/
│     └─ utils/
│
├─ prisma/
│  ├─ schemas/
│  └─ migrations/
│
└─ tests/
   ├─ integration/
   │  ├─ tag/
   │  └─ task/
   ├─ unit/
   └─ helpers/
```

---

## Organização Arquitetural

### Modules

Cada módulo representa um contexto de domínio (ex: tag, task) e contém:

* **api**: camada HTTP (controllers e rotas)
* **application**: regras de negócio e DTOs
* **domain**: definições e contratos de domínio
* **infra**: implementação concreta (repositórios e injeção de dependência)
* **validators**: validação de entrada
* **types**: tipos auxiliares específicos do módulo

---

### Shared

Contém código reutilizável entre módulos:

* Tratamento de erros
* Middlewares
* Utilitários
* Documentação comum

---

### Prisma

A pasta `prisma` na raiz contém:

* `schemas`: definição dos modelos
* `migrations`: controle de versão do banco de dados

O cliente Prisma é configurado em:

```
src/infra/prisma/client.ts
```

---

### Testes

Os testes ficam fora do `src`, na raiz do backend.

* `unit/`: testes unitários de services
* `integration/`: testes das rotas HTTP
* `helpers/`: utilitários para ambiente de teste (ex: limpeza de banco)

Executar todos os testes:

```
npm run test
```

Executar um arquivo específico:

```
npm run test:run nome-do-arquivo.spec.ts
```

---

## Padrões Utilizados

* Arquitetura modular por domínio
* Inversão de dependência (services dependem de interfaces)
* Separação entre camadas (Controller → Service → Repository)
* Paginação padronizada (`data` + `meta`)
* Tratamento centralizado de erros
* Cobertura com testes unitários e de integração
