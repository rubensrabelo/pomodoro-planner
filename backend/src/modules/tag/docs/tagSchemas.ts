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
 *       description: Payload to create a new tag. Tag name must be unique.
 *       properties:
 *         name:
 *           type: string
 *           minLength: 2
 *           maxLength: 50
 *           example: backend
 *       required:
 *         - name
 *
 *     UpdateTag:
 *       type: object
 *       description: Payload to update a tag. Tag name must be unique.
 *       properties:
 *         name:
 *           type: string
 *           minLength: 2
 *           maxLength: 50
 *           example: backend
 *       required:
 *         - name
 *
 *     PaginatedTagsResponse:
 *       type: object
 *       properties:
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Tag'
 *         meta:
 *           type: object
 *           properties:
 *             total:
 *               type: integer
 *               example: 100
 *             page:
 *               type: integer
 *               example: 1
 *             limit:
 *               type: integer
 *               example: 10
 *             totalPages:
 *               type: integer
 *               example: 10
 *       required:
 *         - data
 *         - meta
 *
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Tag name already exists
 */