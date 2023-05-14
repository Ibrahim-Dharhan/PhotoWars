"use strict"

import express = require('express');
import { Vote } from '../../definitions/schemas/mongoose/vote';

const voteRouter = express.Router();

/**
 * @openapi
 * /vote/{id}:
 *   get:
 *     summary: Get votes.
 *     parameters:
 *       - $ref: '#/components/parameters/idParam'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/200ResourceRetrieved'
 *       500:
 *         $ref: '#/components/responses/500'
*/
voteRouter.get('/:id', async (req, res) => {
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
