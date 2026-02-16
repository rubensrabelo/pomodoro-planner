# Backend

## Estrutura de pasta 

```bash
src/
├─ app.ts
├─ server.ts
│
├─ modules/
│  ├─ tag/
│  │  ├─ api/
│  │  │  ├─ controllers/
│  │  │  └─ routes/
│  │  │
│  │  ├─ application/
│  │  │  ├─ dtos/
│  │  │  └─ services/
│  │  │
│  │  ├─ domain/
│  │  │
│  │  ├─ infra/
│  │  │  ├─ container/
│  │  │  └─ repositories/
│  │  │
│  │  ├─ validators/
│  │  │
│  │  └─ docs/
│  │
│  ├─ task/
│  │  ├─ api/
│  │  │  ├─ controllers/
│  │  │  └─ routes/
│  │  │
│  │  ├─ application/
│  │  │  ├─ dtos/
│  │  │  └─ services/
│  │  │
│  │  ├─ domain/
│  │  │
│  │  ├─ infra/
│  │  │  ├─ container/
│  │  │  └─ repositories/
│  │  │
│  │  ├─ validators/
│  │  │
│  │  └─ docs/
│
├─ infra/
│  └─ prisma/
│     ├─ client.ts
│     └─ migrations/
│
├─ shared/
│  ├─ docs/
│  ├─ errors/
│  ├─ middlewares/
│  └─ utils/
│
└─ tests/
   ├─ integration/
   │  ├─ tag/
   │  └─ task/
   ├─ unit/
   └─ helpers/

```