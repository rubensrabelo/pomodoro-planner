# PomoPlanner

**PomoPlanner** é um aplicativo de produtividade baseado na técnica **Pomodoro**, desenvolvido para auxiliar pessoas a planejarem e executarem suas tarefas de forma mais focada, organizada e eficiente.

A proposta do projeto é permitir que o usuário **cadastre tarefas** e defina **a quantidade de pomodoros estimados** para cada uma delas. Conforme as tarefas são executadas, os pomodoros concluídos são registrados, possibilitando o acompanhamento do progresso ao longo do tempo.

---

## Objetivo

O PomoPlanner tem como objetivo transformar tarefas em unidades claras de tempo, ajudando o usuário a:

* Planejar melhor suas atividades diárias
* Manter o foco durante a execução das tarefas
* Visualizar o progresso de forma simples e objetiva
* Desenvolver hábitos consistentes de produtividade

---

## Estrutura do Projeto

O projeto está organizado em camadas bem definidas, separando responsabilidades e facilitando manutenção, testes e evolução.

```bash
pomodoro-planner/
├─ backend/
│  └─ README.md
├─ frontend/
│  └─ README.md
├─ docs/
│  ├─ bpmn/
│  └─ diagrams/
```

---

## Backend

A camada de **backend** é responsável pela lógica de negócio do sistema, incluindo:

* Cadastro e gerenciamento de tarefas
* Controle da quantidade de pomodoros por tarefa
* Registro de sessões de pomodoro
* Regras de progresso e status das tarefas

Mais detalhes sobre arquitetura, tecnologias, estrutura de pastas e decisões técnicas podem ser encontrados no README específico do backend:

➡️ **[Documentação do Backend](./backend/README.md)**

---

## Frontend

A camada de **frontend** é responsável pela interface do usuário e pela experiência de uso do sistema, incluindo:

* Criação e edição de tarefas
* Definição de pomodoros estimados
* Visualização do progresso das tarefas
* Interação com o temporizador de pomodoro

Mais detalhes sobre layout, fluxos de tela, tecnologias e organização do código podem ser encontrados no README específico do frontend:

➡️ **[Documentação do Frontend](./frontend/README.md)**

---

## Documentação e Diagramas

A pasta `docs` concentra os artefatos de apoio ao projeto, como diagramas e modelagens.

### BPMN

* [Cadastro de tarefas com pomodoros](./docs/bpmn/register_tasks.md)
* [Cadastro Manual de Pomodoros em uma Tarefa](./docs/bpmn/register_pomodor_in_task.md)

### Diagrama de Classes

* [Diagrama de Classes](./docs/diagrams/class_diagram.md)

---

## Status do Projeto

Projeto em desenvolvimento, com foco inicial em um **MVP simples**, voltado para estudo, prática de modelagem e desenvolvimento de software. Novas funcionalidades e melhorias serão adicionadas de forma incremental.

