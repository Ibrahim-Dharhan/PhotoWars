"use strict"

import express = require('express');
import { Comment } from '../../schemas/comment';

const commentRouter = express.Router();

/**
 * @openapi
 * /comment/{id}:
 *   get:
 *     summary: Get comment information.
 *     parameters:
 *       - $ref: '#/components/parameters/idParam'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/200ResourceRetrieved'
 *       404:
 *         $ref: '#/components/responses/404'
 *       500:
 *         $ref: '#/components/responses/500'
*/
commentRouter.get('/:id', async (req, res) => {
  const comment_id = req.params.id;
  const query = Comment.findById(comment_id);

  try {
    const result = await query.lean().exec();
    if (result) {
      /* Found comment with id.  */
      res.status(200).json(result);
    } else {
      /* Did not find comment with id.  */
      res.status(404).send(`Comment with ID ${comment_id} not found.`);
    }
  } catch (err) {
    res.status(500).send('Internal server error.');
    console.error('Failed to query database.');
  }

});

export { commentRouter };
