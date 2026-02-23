# PomoPlanner

**PomoPlanner** é um aplicativo de produtividade baseado na técnica **Pomodoro**, desenvolvido para auxiliar pessoas a planejarem e executarem suas tarefas de forma mais focada, organizada e eficiente.

A proposta do projeto é permitir que o usuário **cadastre tarefas** e defina **a quantidade estimada de pomodoros** necessária para cada uma. À medida que as tarefas são executadas, os pomodoros concluídos são registrados, possibilitando o acompanhamento do progresso ao longo do tempo.

Obs.: A Camada de Frontend ainda não foi implementada

---

## Objetivo

O PomoPlanner tem como objetivo transformar tarefas em unidades claras de tempo, ajudando o usuário a:

* Planejar melhor suas atividades diárias
* Manter o foco durante a execução das tarefas
* Visualizar o progresso de forma simples e objetiva
* Desenvolver hábitos consistentes de produtividade

---

## Estrutura do Projeto

O projeto está organizado em camadas bem definidas, separando responsabilidades e facilitando a manutenção, os testes e a evolução do sistema.

```bash
pomodoro-planner/
├─ backend/        # API, regras de negócio e persistência
├─ frontend/       # Interface do usuário
├─ docs/           # Documentação, diagramas e modelagens
```

---

## Arquitetura

O PomoPlanner foi projetado com uma arquitetura **simples, modular e evolutiva**, priorizando clareza, baixo acoplamento e facilidade de crescimento ao longo do tempo.

A arquitetura adota uma separação clara entre **frontend**, **backend** e **persistência de dados**, sendo inspirada no **modelo C4 (nível de containers)**.

### Visão Geral

* **Frontend**: responsável pela interface com o usuário e pela interação com o sistema
* **Backend**: API responsável pelas regras de negócio, validações e controle do fluxo da aplicação
* **Banco de Dados**: camada de persistência das tarefas, sessões de pomodoro e tags

A comunicação entre as camadas ocorre por meio de **requisições HTTP (REST)**.

### Diagrama de Arquitetura

Para a visualização do diagrama de arquitetura, consulte:

➡️ **[Arquitetura do PomoPlanner (C4 – Container)](./docs/diagrams/architecture.md)**

> Este diagrama representa a arquitetura do sistema em alto nível.
> Detalhes específicos de implementação e decisões técnicas estão documentados nos READMEs do backend e do frontend.

---

## Backend

A camada de **backend** é responsável pela lógica de negócio do sistema, incluindo:

* Cadastro e gerenciamento de tarefas
* Controle da quantidade de pomodoros por tarefa
* Registro de sessões de pomodoro
* Aplicação das regras de progresso e status das tarefas

Mais detalhes sobre a arquitetura interna, tecnologias, estrutura de pastas e decisões técnicas podem ser encontrados no README específico do backend:

➡️ **[Documentação do Backend](./backend/README.md)**

---

## Frontend

A camada de **frontend** é responsável pela interface do usuário e pela experiência de uso do sistema, incluindo:

* Criação e edição de tarefas
* Definição de pomodoros estimados
* Visualização do progresso das tarefas
* Interação com o registro manual de pomodoros

Mais detalhes sobre layout, fluxos de tela, tecnologias e organização do código podem ser encontrados no README específico do frontend:

➡️ **[Documentação do Frontend](./frontend/README.md)**

---

## Documentação e Diagramas

A pasta `docs` concentra os artefatos de apoio ao projeto, como diagramas e modelagens utilizadas durante o desenvolvimento.

### BPMN

* [Cadastro de tarefas com pomodoros](./docs/bpmn/register_tasks.md)
* [Cadastro manual de pomodoros em uma tarefa](./docs/bpmn/register_pomodor_in_task.md)

### Diagrama de Classes

* [Diagrama de Classes](./docs/diagrams/class_diagram.md)

---

## Status do Projeto

Projeto em desenvolvimento, com foco inicial em um **MVP simples**, voltado para estudo, prática de modelagem e desenvolvimento de software. Novas funcionalidades e melhorias serão adicionadas de forma incremental, conforme a evolução do projeto.
