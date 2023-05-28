"use strict"

import express = require('express');
import { checkSchema, validationResult } from 'express-validator';
import { ValidObjectId } from '../../definitions/schemas/validation/validObjectId';
import { Vote } from '../../definitions/schemas/mongoose/vote';

const voteRouter = express.Router();

/**
 * @openapi
 * /vote/{id}:
 *   get:
 *     summary: Get vote for a post.
 *     parameters:
 *       - $ref: '#/components/parameters/idParam'
 *     responses:
 *       200:
 *         description: Resource successfully retrieved.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 numVotes:
 *                   type: number
 *                 votedOn:
 *                   type: boolean
 *       500:
 *         $ref: '#/components/responses/500'
*/
voteRouter.get('/:id', checkSchema(ValidObjectId), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(404).json({
      errors: errors.array(),
    });
    return;
  }
  const voteModelId = req.params.id;
  const numVotesQuery = Vote.countDocuments({ post: voteModelId });
  const votedOnQuery = Vote.findOne({ post: voteModelId, user: req.session.userId });

  try {
    const numVotes = await numVotesQuery.exec();
    const votedOn = !!(await votedOnQuery.lean().exec());
    res.status(200).json({ numVotes: numVotes, votedOn: votedOn });
  } catch (err) {
    res.status(500).send('Internal server error.');
    console.error(err);
  }
});

export { voteRouter };
