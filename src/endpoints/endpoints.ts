/**
 * @openapi
 * /user/new:
 *   post:
 *     summary: Creating a new user.
 *     responses:
 *       200:
 *         description: Successfully created new user.
 *       400:
 *         description: Missing information to create a new user.
 *       500:
 *         description: Internal server error.
 */

/**
 * @openapi
 * /user:
 *   delete:
 *     summary: Delete logged in user and all of their related content.
 *     responses:
 *       200:
 *         description: Successfully delete user data.
 *       401:
 *         description:
 *           User is not logged in.
 *       500:
 *         description: Internal server error.
 *   put:
 *     summary: Update user profile information.
 *     responses:
 *       200:
 *         description: Successfully delete user data.
 *       401:
 *         description: User is not logged in.
 *       500:
 *         description: Internal server error.
 */

/**
 * @openapi
 * /user/{id}:
 *   get:
 *     summary: Returns information for user with id.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Database ID of user
 *     responses:
 *       200:
 *         description: Successfully returned JSON object with user information.
 *       500:
 *         description: Internal server error.
 */

/**
 * @openapi
 * /battle/new:
 *   post:
 *     summary: Creating a new battle by a user.
 *     responses:
 *       200:
 *         description: Successfully created new battle.
 *       400:
 *         description: Missing information to create a new battle.
 *       401:
 *         description: User is not logged in.
 *       500:
 *         description: Internal server error.
 */

/**
 * @openapi
 * /battle/{id}:
 *   get:
 *     summary: Return information about a battle.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Database ID of user
 *     responses:
 *       200:
 *         description: Successfully returned information about battle.
 *       404:
 *         description: Failed to find battle, or battle did not exist.
 *       500:
 *         description: Internal server error.
 *   put:
 *     summary: Update battle information if user is the battle creator.
 *     responses:
 *       200:
 *         description: Successfully updated battle information.
 *       401:
 *         description: User not logged in.
 *       403:
 *         description: User is not the creator of the battle.
 *       404:
 *         description: Failed to find battle, or battle did not exist.
 *       500:
 *         description: Internal server error.
 */

/**
 * @openapi
 * /battle/{id}/submission:
 *   post:
 *     summary: Creating a new submission to a battle by a user.
 *     responses:
 *       200:
 *         description: Successfully created new submission.
 *       400:
 *         description: Missing information to create a new submission.
 *       401:
 *         description: User is not logged in.
 *       500:
 *         description: Internal server error.
 */

/**
 * @openapi
 * /battle/{id}/comment:
 *   post:
 *     summary: Creating a new comment by a user on a battle.
 *     responses:
 *       200:
 *         description: Successfully created new comment.
 *       400:
 *         description: Missing information to create a new comment.
 *       401:
 *         description: User is not logged in.
 *       500:
 *         description: Internal server error.
 */

/**
 * @openapi
 * /submission/{id}:
 *   get:
 *     summary: Return information about a submission.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Database ID of submission.
 *     responses:
 *       200:
 *         description: Successfully returned information about submission.
 *       404:
 *         description: Failed to find battle, or battle did not exist.
 *       500:
 *         description: Internal server error.
 *   put:
 *     summary: Update submission information if user is the creator.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Database ID of submission.
 *     responses:
 *       200:
 *         description: Successfully commented on submission.
 *       401:
 *         description: User not logged in.
 *       404:
 *         description: Failed to find submission, or submission did not exist.
 *       500:
 *         description: Internal server error.
 */

/**
 * @openapi
 * /submission/{id}/comment:
 *   post:
 *     summary: Creating new comment by a user on a submission.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Database ID of submission.
 *     responses:
 *       200:
 *         description: Successfully commented on submission.
 *       401:
 *         description: User not logged in.
 *       404:
 *         description: Failed to find submission, or submission did not exist.
 *       500:
 *         description: Internal server error.
 */

/**
 * @openapi
 * /comment/{id}:
 *   get:
 *     summary: Get comment information.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Database ID of comment.
 *     responses:
 *       200:
 *         description: Successfully retrieved comment.
 *       404:
 *         description: Failed to find submission, or submission did not exist.
 *       500:
 *         description: Internal server error.
 *   put:
 *     summary: Updating a comment by a user.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Database ID of comment.
 *     responses:
 *       200:
 *         description: Successfully updated user comment.
 *       401:
 *         description: User not logged in.
 *       403:
 *         description: User is not the creator of the comment.
 *       404:
 *         description: Failed to find comment, or comment did not exist.
 *       500:
 *         description: Internal server error.
 */

/**
 * @openapi
 * /swagger/spec:
 *   get:
 *     summary: Returns JSON of Swagger OpenAPI specification.
 *     responses:
 *       200:
 *         description: Successful retrieval of Swagger JSON.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */

/**
 * @openapi
 * /swagger:
 *   get:
 *     summary: Returns OpenAPI specification of APIs.
 *     responses:
 *       200:
 *         description: Successful retrieval of OpenAPI specification.
 */

/**
 * @openapi
 * /test/kitten:
 *   get:
 *     summary: Returns a single Kitten JSON object from MongoDB.
 *     responses:
 *       200:
 *         description: Successfully retrieved Kitten object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Kitten'
 *       500:
 *         description: Internal server error.
 *
 */

/**
 * @openapi
 * /test/ping:
 *   get:
 *     summary: Returns a 200 response on successful ping.
 *     responses:
 *       200:
 *         description: Returns 'Pong' text.
 *         content:
 *           text/plain:
 *            schema:
 *              type: string
 *              example: Pong
 */

