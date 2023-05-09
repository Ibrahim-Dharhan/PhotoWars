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
 *     403NotOwned:
 *       description: User is not the owner of this resource.
 *     404:
 *       description: Resource not found.
 *     404ResourceNotFound:
 *       description: Resource not found.
 *     500:
 *       description: Internal server error.
 */

/**
 * @openapi
 * /battle/{id}:
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
 * /submission/{id}:
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
 * /submission/{id}/vote:
 *   post:
 *     summary: Like a submission.
 *     parameters:
 *       - $ref: '#/components/parameters/idParam'
 *     responses:
 *       200:
 *         description: Successfully voted on the submission.
 *       401:
 *         $ref: '#/components/responses/401NotLoggedIn'
 *       500:
 *         $ref: '#/components/responses/500'
 */

/**
 * @openapi
 * /submission/{id}/unvote:
 *   post:
 *     summary: Unvote a submission.
 *     parameters:
 *       - $ref: '#/components/parameters/idParam'
 *     responses:
 *       200:
 *         description: Successfully unvoted the submission.
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
