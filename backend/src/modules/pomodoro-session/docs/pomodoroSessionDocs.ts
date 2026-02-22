/**
 * @openapi
 * tags:
 *   - name: Pomodoros
 *     description: Pomodoro session management
 */

/**
 * @openapi
 * /pomodoros:
 *   get:
 *     summary: List pomodoro sessions (paginated)
 *     tags: [Pomodoros]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         required: false
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 50
 *           default: 10
 *         required: false
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: Paginated list of pomodoro sessions
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginatedPomodoroSessionsResponse'
 */

/**
 * @openapi
 * /pomodoros/{id}:
 *   get:
 *     summary: Get pomodoro session by ID
 *     tags: [Pomodoros]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pomodoro session found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PomodoroSession'
 *       404:
 *         description: Pomodoro session not found
 */

/**
 * @openapi
 * /pomodoros/task/{taskId}:
 *   get:
 *     summary: List pomodoro sessions by task (paginated)
 *     tags: [Pomodoros]
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         required: false
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 50
 *           default: 10
 *         required: false
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: Paginated list of pomodoro sessions for the task
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginatedPomodoroSessionsResponse'
 */

/**
 * @openapi
 * /pomodoros:
 *   post:
 *     summary: Create a new pomodoro session
 *     tags: [Pomodoros]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreatePomodoroSession'
 *     responses:
 *       201:
 *         description: Pomodoro session created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PomodoroSession'
 *       400:
 *         description: Validation error
 */

/**
 * @openapi
 * /pomodoros/{id}:
 *   put:
 *     summary: Update a pomodoro session
 *     tags: [Pomodoros]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdatePomodoroSession'
 *     responses:
 *       200:
 *         description: Pomodoro session updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PomodoroSession'
 *       404:
 *         description: Pomodoro session not found
 */

/**
 * @openapi
 * /pomodoros/{id}/complete:
 *   patch:
 *     summary: Complete a pomodoro session
 *     tags: [Pomodoros]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CompletePomodoroSession'
 *     responses:
 *       200:
 *         description: Pomodoro session completed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PomodoroSession'
 *       404:
 *         description: Pomodoro session not found
 */

/**
 * @openapi
 * /pomodoros/{id}:
 *   delete:
 *     summary: Delete a pomodoro session
 *     tags: [Pomodoros]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Pomodoro session deleted
 *       404:
 *         description: Pomodoro session not found
 */