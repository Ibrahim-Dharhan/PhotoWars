"use strict"

import express = require('express');
import { Battle } from '../../definitions/schemas/battle';
import { Comment } from '../../definitions/schemas/comment';
import { Submission } from '../../definitions/schemas/submission';

const userRouter = express.Router();

/**
 * @openapi
 * /user/{id}:
 *   get:
 *     summary: Returns information for user with id.
 *     parameters:
 *       - $ref: '#components/parameters/idParam'
 *     responses:
 *       200:
 *         description: Successfully found and returned user data.
 *       404:
 *         $ref: '#/components/responses/404ResourceNotFound'
 *       500:
 *         $ref: '#/components/responses/500'
 */
userRouter.post('/:id', async (req, res) => {
  res.status(501).send('Not implemented.');
});

export { userRouter };
