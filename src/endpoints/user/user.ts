"use strict"

import express = require('express');
import { Battle } from '../../schemas/battle';
import { Comment } from '../../schemas/comment';
import { Submission } from '../../schemas/submission';

const userRouter = express.Router();

/**
 * @openapi
 * /user/new:
 *   post:
 *     summary: Creating a new user.
 *     requestBody:
 *       description: User profile.
 *     responses:
 *       200:
 *         description: Successfully created new user.
 *       400:
 *         description: Missing information to create a new user.
 *       500:
 *         $ref: '#/components/responses/500'
 */
userRouter.post('/new', async (req, res) => {
  res.status(501).send('Not implemented.');
});

export { userRouter };
