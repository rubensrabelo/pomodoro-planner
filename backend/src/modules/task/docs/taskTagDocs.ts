/**
 * @openapi
 * tags:
 *   - name: Task Tags
 *     description: Manage tags attached to tasks
 */

/**
 * @openapi
 * /tasks/{taskId}/tags/{tagId}:
 *   post:
 *     summary: Add a tag to a task
 *     tags: [Task Tags]
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: tagId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Tag successfully attached to task
 *       404:
 *         description: Task or Tag not found
 *
 *   delete:
 *     summary: Remove a tag from a task
 *     tags: [Task Tags]
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: tagId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Tag successfully removed from task
 *       404:
 *         description: Task or Tag not found
 */
