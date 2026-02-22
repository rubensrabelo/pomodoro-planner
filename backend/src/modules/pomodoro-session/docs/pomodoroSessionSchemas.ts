/**
 * @openapi
 * components:
 *   schemas:
 *     PomodoroSession:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         startedAt:
 *           type: string
 *           format: date-time
 *         finishedAt:
 *           type: string
 *           format: date-time
 *           nullable: true
 *         durationMinutes:
 *           type: integer
 *           example: 25
 *         isCompleted:
 *           type: boolean
 *           example: false
 *         taskId:
 *           type: integer
 *           example: 3
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *       required:
 *         - id
 *         - startedAt
 *         - durationMinutes
 *         - isCompleted
 *         - taskId
 *         - createdAt
 *         - updatedAt
 *
 *     PaginatedPomodoroSessionsResponse:
 *       type: object
 *       properties:
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/PomodoroSession'
 *         meta:
 *           type: object
 *           properties:
 *             total:
 *               type: integer
 *               example: 50
 *             page:
 *               type: integer
 *               example: 1
 *             limit:
 *               type: integer
 *               example: 10
 *             totalPages:
 *               type: integer
 *               example: 5
 *       required:
 *         - data
 *         - meta
 *
 *     CreatePomodoroSession:
 *       type: object
 *       description: Payload to create a new pomodoro session.
 *       properties:
 *         startedAt:
 *           type: string
 *           format: date-time
 *         durationMinutes:
 *           type: integer
 *           minimum: 1
 *           example: 25
 *         taskId:
 *           type: integer
 *           example: 3
 *       required:
 *         - startedAt
 *         - durationMinutes
 *         - taskId
 *
 *     UpdatePomodoroSession:
 *       type: object
 *       description: Payload to update a pomodoro session.
 *       properties:
 *         startedAt:
 *           type: string
 *           format: date-time
 *         finishedAt:
 *           type: string
 *           format: date-time
 *           nullable: true
 *         durationMinutes:
 *           type: integer
 *           minimum: 1
 *         isCompleted:
 *           type: boolean
 *
 *     CompletePomodoroSession:
 *       type: object
 *       description: Payload to complete a pomodoro session.
 *       properties:
 *         finishedAt:
 *           type: string
 *           format: date-time
 *       required:
 *         - finishedAt
 */