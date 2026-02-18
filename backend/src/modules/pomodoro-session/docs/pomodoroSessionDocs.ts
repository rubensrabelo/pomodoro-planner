/**
 * @openapi
 * tags:
 *   - name: PomodoroSessions
 *     description: Pomodoro session management
 */

/**
 * @openapi
 * /tasks/{taskId}/pomodoro-sessions:
 *   get:
 *     summary: List all pomodoro sessions for a task
 *     tags: [PomodoroSessions]
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of pomodoro sessions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PomodoroSession'
 *       404:
 *         description: Task not found
 */

/**
 * @openapi
 * /tasks/{taskId}/pomodoro-sessions/{id}:
 *   get:
 *     summary: Get pomodoro session by ID
 *     tags: [PomodoroSessions]
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: integer
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
 * /tasks/{taskId}/pomodoro-sessions:
 *   post:
 *     summary: Create a new pomodoro session for a task
 *     tags: [PomodoroSessions]
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: integer
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
 *       404:
 *         description: Task not found
 */

/**
 * @openapi
 * /tasks/{taskId}/pomodoro-sessions/{id}:
 *   delete:
 *     summary: Delete a pomodoro session
 *     tags: [PomodoroSessions]
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: integer
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
