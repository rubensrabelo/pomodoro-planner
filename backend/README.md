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
│        └─ repositories/
│
├─ infra/
│  └─ prisma/
│     └─ client.ts
│
└─ server.ts
```