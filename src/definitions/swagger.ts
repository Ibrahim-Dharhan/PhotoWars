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
 *     401Unauthorized:
 *       description: User is not authorized to perform this action.
 *     403Forbidden:
 *       description: Access to this resource is forbidden.
 *     404NotFound:
 *       description: Resource not found.
 *     500:
 *       description: Internal server error.
 */
