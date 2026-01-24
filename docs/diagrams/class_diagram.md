    ### Diagrama de classes

    ```mermaid
    classDiagram
        direction LR

        class Task {
            id: int
            title: str
            started_at: date
            finished_at: date
            status: StatusEnum
            priority: PriorityEnum
            created_at: datetime
            updated_at: datetime
        }

        class PomodoroSession {
            id: int
            started_at: date
            duration_minutes: int
            is_completed: bool
            created_at: datetime
            updated_at: datetime
        }

        class Tag {
            id: int
            name: str
            created_at: datetime
            updated_at: datetime
        }

        class StatusEnum {
            <<enumeration>>
            PENDING
            IN_PROGRESS
            COMPLETED
        }

        class PriorityEnum {
            <<enumeration>>
            HIGH
            MEDIUM
            LOW
        }

        Task "1" --> "0..*" PomodoroSession : has
        Task "0..*" --> "0..*" Tag : tagged_with
    ```