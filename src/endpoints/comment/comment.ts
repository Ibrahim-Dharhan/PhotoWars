"use strict"

import express = require('express');
import { Battle } from '../../schemas/battle';
import { Comment } from '../../schemas/comment';
import { Submission } from '../../schemas/submission';

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
  if (!req.session.logged_in) {
    res.status(401).send('User is not logged in.');
    return;
  }

  const comment_id = req.params.id;
  const query = Comment.findById(comment_id);

  try {
    const result = await query.exec();
    if (!result) {
      /* Did not find comment with id.  */
      res.status(404).send(`Comment with ID ${comment_id} not found.`);
    } else if (req.session.user_id !== result.author_id.toString()) {
      /* User requesting change is not the comment's author.  */
      res.status(403).send('User is not the comment author.');
    } else {
      /* Remove reference to either Battle or Submission.  */
      const bQuery = await Battle.findOne({ comment_ids: result._id });
      const sQuery = await Submission.findOne({ comment_ids: result._id });
      const refDoc = bQuery ? bQuery : sQuery;

      const index = refDoc.comment_ids.indexOf(result._id);
      refDoc.comment_ids.splice(index, 1);
      await refDoc.save();

      await Comment.findByIdAndDelete(comment_id);
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
  if (!req.session.logged_in) {
    res.status(401).send('User is not logged in.');
    return;
  }

  const comment_id = req.params.id;
  const query = Comment.findById(comment_id);

  try {
    const result = await query.exec();
    if (!result) {
      /* Did not find comment with id.  */
      res.status(404).send(`Comment with ID ${comment_id} not found.`);
    } else if (req.session.user_id !== result.author_id.toString()) {
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

export { commentRouter };
