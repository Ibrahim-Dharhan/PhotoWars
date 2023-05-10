"use strict"

import express = require('express');
import { Comment } from '../../definitions/schemas/mongoose/comment';
import { Vote, voteOn } from '../../definitions/schemas/mongoose/vote';

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
  const commentId = req.params.id;
  const query = Comment.findById(commentId);

  try {
    const result = await query.lean().exec();
    if (result) {
      /* Found comment with id.  */
      res.status(200).json(result);
    } else {
      /* Did not find comment with id.  */
      res.status(404).send(`Comment with ID ${commentId} not found.`);
    }
  } catch (err) {
    res.status(500).send('Internal server error.');
    console.error('Failed to query database.');
  }
});

/**
 * @openapi
 * /comment/{id}:
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
 *         $ref: '#/components/responses/403NotOwned'
 *       404:
 *         $ref: '#/components/responses/404'
 *       500:
 *         $ref: '#/components/responses/500'
 */
commentRouter.delete('/:id', async (req, res) => {
  if (!req.session.loggedIn) {
    res.status(401).send('User is not logged in.');
    return;
  }

  const commentId = req.params.id;
  const query = Comment.findById(commentId);

  try {
    const result = await query.exec();
    if (!result) {
      /* Did not find comment with id.  */
      res.status(404).send(`Comment with ID ${commentId} not found.`);
    } else if (req.session.userId !== result.authorId.toString()) {
      /* User requesting change is not the comment's author.  */
      res.status(403).send('User is not the comment author.');
    } else {
      await Comment.findByIdAndDelete(commentId);
      res.status(200).send('Successfully deleted comment text.');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error.');
  }
});

/**
 * @openapi
 * /comment/{id}:
 *   put:
 *     summary: Updating a comment by a user.
 *     requestBody:
 *       description: Comment object.
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *             required:
 *               - text
 *     parameters:
 *       - $ref: '#/components/parameters/idParam'
 *     responses:
 *       200:
 *         description: Successfully updated user comment.
 *       401:
 *         $ref: '#/components/responses/401NotLoggedIn'
 *       403:
 *         $ref: '#/components/responses/403NotOwned'
 *       404:
 *         $ref: '#/components/responses/404'
 *       500:
 *         $ref: '#/components/responses/500'
 */
commentRouter.put('/:id', async (req, res) => {
  if (!req.session.loggedIn) {
    res.status(401).send('User is not logged in.');
    return;
  }

  const commentId = req.params.id;
  const query = Comment.findById(commentId);

  try {
    const result = await query.exec();
    if (!result) {
      /* Did not find comment with id.  */
      res.status(404).send(`Comment with ID ${commentId} not found.`);
    } else if (req.session.userId !== result.authorId.toString()) {
      /* User requesting change is not the comment's author.  */
      res.status(403).send('User is not the comment author.');
    } else {
      result.text = req.body.text;
      await result.save();
      res.status(200).send('Successfully updated comment text.');
    }
  } catch (err) {
    res.status(500).send('Internal server error.');
  }
});

/**
 * @openapi
 * /comment/{id}/vote:
 *   put:
 *     summary: Vote on a comment.
 *     parameters:
 *       - $ref: '#/components/parameters/idParam'
 *     responses:
 *       200:
 *         description: Successfully voted on the comment.
 *       401:
 *         $ref: '#/components/responses/401NotLoggedIn'
 *       404:
 *         $ref: '#/components/responses/404ResourceNotFound'
 *       500:
 *         $ref: '#/components/responses/500'
 */
commentRouter.put('/:id/vote', async (req, res) => {
  if (!req.session.loggedIn) {
    res.status(401).send('Must be logged in to perform this action.');
    return;
  }

  const commentId = req.params.id;
  const query = Comment.findOne({ _id: commentId });
  try {
    const result = await query.lean().exec();
    if (!result) {
      res.status(404).send('Resource not found.');
      return;
    }

    await voteOn('Comment', commentId, req.session.userId);
    res.status(200).send('Successfully voted on comment.');

  } catch (err) {
    res.status(500).send('Internal server error.');
    console.error(err);
  }
});

export { commentRouter };
