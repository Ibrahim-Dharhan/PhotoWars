/**
 * @openapi
 * components:
 *   parameters:
 *     idParam:
 *       in: path
 *       name: id
 *       description: Database ID of object.
 *       schema:
 *         type: string
 *       required: true
 *
 *   responses:
 *     200ResourceRetrieved:
 *       description: Resource successfully retrieved.
 *     401NotLoggedIn:
 *       description: User is not logged in.
 *     403:
 *       description: User is not the owner of this resource.
 *     404:
 *       description: Resource not found.
 *     500:
 *       description: Internal server error.
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
 *         $ref: '#/components/responses/401NotLoggedIn'
 *       500:
 *         $ref: '#/components/responses/500'
 */

/**
 * @openapi
 * /battle/{id}:
 *   get:
 *     summary: Return information about a battle.
 *     parameters:
 *       - $ref: '#/components/parameters/idParam'
 *     responses:
 *       200:
 *         description: Successfully returned information about battle.
 *       404:
 *         $ref: '#/components/responses/404'
 *       500:
 *         $ref: '#/components/responses/500'
 *   put:
 *     summary: Update battle information if user is the battle creator.
 *     parameters:
 *       - $ref: '#/components/parameters/idParam'
 *     responses:
 *       200:
 *         description: Successfully updated battle information.
 *       401:
 *         $ref: '#/components/responses/401NotLoggedIn'
 *       403:
 *         $ref: '#/components/responses/403'
 *       404:
 *         $ref: '#/components/responses/404'
 *       500:
 *         $ref: '#/components/responses/500'
 *   delete:
 *     summary: Delete battle if user is the battle creator.
 *     parameters:
 *       - $ref: '#/components/parameters/idParam'
 *     responses:
 *       200:
 *         description: Successfully deleted battle.
 *       401:
 *         $ref: '#/components/responses/401NotLoggedIn'
 *       403:
 *         $ref: '#/components/responses/403'
 *       404:
 *         $ref: '#/components/responses/404'
 *       500:
 *         $ref: '#/components/responses/500'
 */

/**
 * @openapi
 * /battle/{id}/comment:
 *   get:
 *     summary: Retrieve comments for battle.
 *     parameters:
 *       - $ref: '#/components/parameters/idParam'
 *     responses:
 *       200:
 *         description: Successfully returned comments.
 *       404:
 *         $ref: '#/components/responses/404'
 *       500:
 *         $ref: '#/components/responses/500'
 *   post:
 *     summary: Creating a new comment by a user on a battle.
 *     parameters:
 *       - $ref: '#/components/parameters/idParam'
 *     responses:
 *       200:
 *         description: Successfully created new comment.
 *       400:
 *         description: Missing information to create a new comment.
 *       401:
 *         $ref: '#/components/responses/401NotLoggedIn'
 *       500:
 *         $ref: '#/components/responses/500'
 */

/**
 * @openapi
 * /battle/{id}/like:
 *   post:
 *     summary: Like a battle.
 *     parameters:
 *       - $ref: '#/components/parameters/idParam'
 *     responses:
 *       200:
 *         description: Successfully liked the battle.
 *       401:
 *         $ref: '#/components/responses/401NotLoggedIn'
 *       500:
 *         $ref: '#/components/responses/500'
 */

/**
 * @openapi
 * /battle/{id}/submit:
 *   post:
 *     summary: Creating a new submission to a battle by a user.
 *     parameters:
 *       - $ref: '#/components/parameters/idParam'
 *     responses:
 *       200:
 *         description: Successfully created new submission.
 *       400:
 *         description: Missing information to create a new submission.
 *       401:
 *         $ref: '#/components/responses/401NotLoggedIn'
 *       500:
 *         $ref: '#/components/responses/500'
 */

/**
 * @openapi
 * /battle/{id}/unlike:
 *   post:
 *     summary: Unlike a battle.
 *     parameters:
 *       - $ref: '#/components/parameters/idParam'
 *     responses:
 *       200:
 *         description: Successfully unliked the battle.
 *       401:
 *         $ref: '#/components/responses/401NotLoggedIn'
 *       500:
 *         $ref: '#/components/responses/500'
 */

/**
 * @openapi
 * /comment/{id}:
 *   put:
 *     summary: Updating a comment by a user.
 *     parameters:
 *       - $ref: '#/components/parameters/idParam'
 *     responses:
 *       200:
 *         description: Successfully updated user comment.
 *       401:
 *         $ref: '#/components/responses/401NotLoggedIn'
 *       403:
 *         $ref: '#/components/responses/403'
 *       404:
 *         $ref: '#/components/responses/404'
 *       500:
 *         $ref: '#/components/responses/500'
 *   delete:
 *     summary: Delete comment if user is the comment owner.
 *     parameters:
 *       - $ref: '#/components/parameters/idParam'
 *     responses:
 *       200:
 *         description: Successfully deleted comment.
 *       401:
 *         $ref: '#/components/responses/401NotLoggedIn'
 *       403:
 *         $ref: '#/components/responses/403'
 *       404:
 *         $ref: '#/components/responses/404'
 *       500:
 *         $ref: '#/components/responses/500'
 */

/**
 * @openapi
 * /comment/{id}/like:
 *   post:
 *     summary: Like a comment.
 *     parameters:
 *       - $ref: '#/components/parameters/idParam'
 *     responses:
 *       200:
 *         description: Successfully liked the comment.
 *       401:
 *         $ref: '#/components/responses/401NotLoggedIn'
 *       500:
 *         $ref: '#/components/responses/500'
 */

/**
 * @openapi
 * /comment/{id}/unlike:
 *   post:
 *     summary: Unlike a comment.
 *     parameters:
 *       - $ref: '#/components/parameters/idParam'
 *     responses:
 *       200:
 *         description: Successfully unliked the comment.
 *       401:
 *         $ref: '#/components/responses/401NotLoggedIn'
 *       500:
 *         $ref: '#/components/responses/500'
 */

/**
 * @openapi
 * /submission/{id}:
 *   get:
 *     summary: Return information about a submission.
 *     parameters:
 *       - $ref: '#/components/parameters/idParam'
 *     responses:
 *       200:
 *         description: Successfully returned information about submission.
 *       404:
 *         $ref: '#/components/responses/404'
 *       500:
 *         $ref: '#/components/responses/500'
 *   put:
 *     summary: Update submission information if user is the creator.
 *     parameters:
 *       - $ref: '#/components/parameters/idParam'
 *     responses:
 *       200:
 *         description: Successfully commented on submission.
 *       401:
 *         $ref: '#/components/responses/401NotLoggedIn'
 *       404:
 *         $ref: '#/components/responses/404'
 *       500:
 *         $ref: '#/components/responses/500'
 *   delete:
 *     summary: Delete submission if user is the comment owner.
 *     parameters:
 *       - $ref: '#/components/parameters/idParam'
 *     responses:
 *       200:
 *         description: Successfully deleted submission.
 *       401:
 *         $ref: '#/components/responses/401NotLoggedIn'
 *       403:
 *         $ref: '#/components/responses/403'
 *       404:
 *         $ref: '#/components/responses/404'
 *       500:
 *         $ref: '#/components/responses/500'
 */

/**
 * @openapi
 * /submission/{id}/comment:
 *   get:
 *     summary: Retrieve comments for submission.
 *     parameters:
 *       - $ref: '#/components/parameters/idParam'
 *     responses:
 *       200:
 *         description: Successfully returned comments.
 *       404:
 *         $ref: '#/components/responses/404'
 *       500:
 *         $ref: '#/components/responses/500'
 *   post:
 *     summary: Creating new comment by a user on a submission.
 *     parameters:
 *       - $ref: '#/components/parameters/idParam'
 *     responses:
 *       200:
 *         description: Successfully commented on submission.
 *       401:
 *         $ref: '#/components/responses/401NotLoggedIn'
 *       404:
 *         $ref: '#/components/responses/404'
 *       500:
 *         $ref: '#/components/responses/500'
 */

/**
 * @openapi
 * /submission/{id}/like:
 *   post:
 *     summary: Like a submission.
 *     parameters:
 *       - $ref: '#/components/parameters/idParam'
 *     responses:
 *       200:
 *         description: Successfully liked the submission.
 *       401:
 *         $ref: '#/components/responses/401NotLoggedIn'
 *       500:
 *         $ref: '#/components/responses/500'
 */

/**
 * @openapi
 * /submission/{id}/unlike:
 *   post:
 *     summary: Unlike a submission.
 *     parameters:
 *       - $ref: '#/components/parameters/idParam'
 *     responses:
 *       200:
 *         description: Successfully unliked the submission.
 *       401:
 *         $ref: '#/components/responses/401NotLoggedIn'
 *       500:
 *         $ref: '#/components/responses/500'
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
 *         $ref: '#/components/responses/401NotLoggedIn'
 *       500:
 *         $ref: '#/components/responses/500'
 *   put:
 *     summary: Update user profile information.
 *     responses:
 *       200:
 *         description: Successfully delete user data.
 *       401:
 *         $ref: '#/components/responses/401NotLoggedIn'
 *       500:
 *         $ref: '#/components/responses/500'
 */

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
 *         $ref: '#/components/responses/500'
 */

/**
 * @openapi
 * /user/{id}:
 *   get:
 *     summary: Returns information for user with id.
 *     parameters:
 *       - $ref: '#/components/parameters/idParam'
 *     responses:
 *       200:
 *         description: Successfully returned JSON object with user information.
 *       500:
 *         $ref: '#/components/responses/500'
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
 *         $ref: '#/components/responses/500'
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
