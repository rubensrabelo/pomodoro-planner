### Arquitetura do PomoPlanner (C4 – Container)

```mermaid
flowchart LR
    %% Person
    User[User]

    %% Frontend
    subgraph Frontend [Frontend Container]
        FE[Web Application<br/>React + Vite]
    end

    %% Backend
    subgraph Backend [Backend Container - Node.js + TypeScript]
        Controller[Controllers<br/>Express Routes]
        IService[IService Interfaces]
        Service[Application Services]
        IRepository[IRepository Interfaces]
        Repository[Prisma Repositories]
        Prisma[Prisma ORM]
    end

    %% Database
    subgraph Database [Database Container]
        DB[(PostgreSQL)]
    end

    %% Flow
    User -->|Uses| FE
    FE -->|HTTP/JSON| Controller

    Controller --> IService
    IService --> Service

    Service --> IRepository
    IRepository --> Repository

    Repository --> Prisma
    Prisma -->|SQL| DB
```