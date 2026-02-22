/**
 * @openapi
 * components:
 *   schemas:
 *     PaginationMeta:
 *       type: object
 *       properties:
 *         total:
 *           type: integer
 *           example: 42
 *         page:
 *           type: integer
 *           example: 1
 *         lastPage:
 *           type: integer
 *           example: 5
 *         limit:
 *           type: integer
 *           example: 10
 *
 *     Tag:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: Backend
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *       required:
 *         - id
 *         - name
 *
 *     Task:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         title:
 *           type: string
 *           example: Implement authentication
 *         description:
 *           type: string
 *           example: Add JWT authentication to the API
 *         estimatedPomodoros:
 *           type: integer
 *           example: 4
 *         startedAt:
 *           type: string
 *           format: date-time
 *         finishedAt:
 *           type: string
 *           format: date-time
 *           nullable: true
 *         status:
 *           type: string
 *           enum: [PENDING, IN_PROGRESS, DONE]
 *           example: PENDING
 *         priority:
 *           type: string
 *           enum: [LOW, MEDIUM, HIGH]
 *           example: MEDIUM
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *         tags:
 *           type: array
 *           description: Tags associated with the task
 *           items:
 *             $ref: '#/components/schemas/Tag'
 *       required:
 *         - id
 *         - title
 *         - description
 *         - estimatedPomodoros
 *         - startedAt
 *         - status
 *         - priority
 *
 *     PaginatedTasks:
 *       type: object
 *       properties:
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Task'
 *         meta:
 *           $ref: '#/components/schemas/PaginationMeta'
 *
 *     CreateTask:
 *       type: object
 *       description: Payload to create a new task.
 *       properties:
 *         title:
 *           type: string
 *           minLength: 2
 *           maxLength: 100
 *         description:
 *           type: string
 *           minLength: 2
 *           maxLength: 500
 *         estimatedPomodoros:
 *           type: integer
 *           minimum: 1
 *         startedAt:
 *           type: string
 *           format: date-time
 *         finishedAt:
 *           type: string
 *           format: date-time
 *           nullable: true
 *         status:
 *           type: string
 *           enum: [PENDING, IN_PROGRESS, DONE]
 *         priority:
 *           type: string
 *           enum: [LOW, MEDIUM, HIGH]
 *       required:
 *         - title
 *         - description
 *         - estimatedPomodoros
 *         - startedAt
 *
 *     UpdateTask:
 *       type: object
 *       description: Payload to update a task.
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         estimatedPomodoros:
 *           type: integer
 *         startedAt:
 *           type: string
 *           format: date-time
 *         finishedAt:
 *           type: string
 *           format: date-time
 *           nullable: true
 *         status:
 *           type: string
 *           enum: [PENDING, IN_PROGRESS, DONE]
 *         priority:
 *           type: string
 *           enum: [LOW, MEDIUM, HIGH]
 */