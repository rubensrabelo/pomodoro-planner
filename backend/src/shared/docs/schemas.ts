/**
 * @openapi
 * components:
 *   schemas:
 *     Tag:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: backend
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
 *     CreateTag:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: backend
 *       required:
 *         - name
 *
 *     UpdateTag:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: backend
 *       required:
 *         - name
 */
