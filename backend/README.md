# Backend

## Estrutura de pasta 

```bash
src/
├─ modules/
│  └─ tag/
│     ├─ api/
│     │  ├─ controllers/
│     │  └─ routes/
│     ├─ domain/
│     ├─ application/
│     │  ├─ dtos/
│     │  └─ services/
│     └─ infra/
│        ├─ container/
│        ├─ errors/
│        └─ repositories/
│
├─ infra/
│  └─ prisma/
│     └─ client.ts
│
├─ shared/
│  ├─ errors/
│  └─ middlewares/
│
└─ server.ts
```