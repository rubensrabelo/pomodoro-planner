### Cadastro de Tarefa com Tags

```mermaid
flowchart LR
    Inicio([Início]) --> AbrirTarefas[Abrir área de tarefas]

    AbrirTarefas --> NovaTarefa[Criar nova tarefa]
    NovaTarefa --> PreencherDados[Preencher dados da tarefa]

    PreencherDados --> DefinirData[Definir data de início]
    DefinirData --> DefinirPrioridade[Definir prioridade]

    DefinirPrioridade --> SelecionarTags[Selecionar ou criar tags]
    SelecionarTags --> RevisarTarefa[Revisar informações]

    RevisarTarefa --> SalvarTarefa[Salvar tarefa]

    SalvarTarefa --> Salvo{Salvou com sucesso?}
    Salvo -- Não --> Erro[Exibir mensagem de erro]
    Erro --> PreencherDados

    Salvo -- Sim --> ListaTarefas[Exibir lista de tarefas]
    ListaTarefas --> Fim([Fim])
```