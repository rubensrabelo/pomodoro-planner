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
 *         taskId:
 *           type: integer
 *           example: 3
 *         startedAt:
 *           type: string
 *           format: date-time
 *         endedAt:
 *           type: string
 *           format: date-time
 *           nullable: true
 *         durationInMinutes:
 *           type: integer
 *           example: 25
 *         completed:
 *           type: boolean
 *           example: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *       required:
 *         - id
 *         - taskId
 *         - startedAt
 *         - durationInMinutes
 *         - completed
 *
 *     CreatePomodoroSession:
 *       type: object
 *       description: Payload to create a pomodoro session.
 *       properties:
 *         startedAt:
 *           type: string
 *           format: date-time
 *         endedAt:
 *           type: string
 *           format: date-time
 *           nullable: true
 *         durationInMinutes:
 *           type: integer
 *           minimum: 1
 *           example: 25
 *         completed:
 *           type: boolean
 *           example: true
 *       required:
 *         - startedAt
 *         - durationInMinutes
 *         - completed
 */
