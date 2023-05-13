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
