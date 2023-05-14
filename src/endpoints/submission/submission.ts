'use strict';

import express = require('express');
import { Submission } from '../../definitions/schemas/mongoose/submission';
import { Comment } from '../../definitions/schemas/mongoose/comment';
import { voteOn, unvoteOn } from '../../definitions/schemas/mongoose/vote';

const submissionRouter = express.Router();

/**
 * @openapi
 * /submission/{id}:
 *   get:
 *     summary: Return information about a submission.
 *     parameters:
 *       - $ref: '#/components/parameters/idParam'
 *     responses:
 *       200:
 *         description: Resource successfully retrieved.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Submission'
 *       404:
 *         $ref: '#/components/responses/404NotFound'
 *       500:
 *         $ref: '#/components/responses/500'
 */
submissionRouter.get('/:id', async (req, res) => {
  const submissionId = req.params.id;
  const query = Submission.findById(submissionId);
  try {
    const result = await query.lean().exec();
    if (result) {
      /* Found submission matching submissionId.  */
      res.status(200).json(result);
    } else {
      /* Did not find a submission with matching submissionId.  */
      res.status(404).send('Invalid submission id.');
    }
  } catch (err) {
    res.status(500).send('Internal server error.');
    console.error(err);
  }
});

/**
 * @openapi
 * /submission/{id}:
 *   put:
 *     summary: Update submission information if user is the creator.
 *     parameters:
 *       - $ref: '#/components/parameters/idParam'
 *     responses:
 *       200:
 *         description: Successfully updated submission.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Submission'
 *       401:
 *         $ref: '#/components/responses/401Unauthorized'
 *       404:
 *         $ref: '#/components/responses/404NotFound'
 *       500:
 *         $ref: '#/components/responses/500'
 */
submissionRouter.put('/:id', async (req, res) => {
  try {
    const submissionId = req.params.id;
    const query = Submission.findById(submissionId);
    const result = await query.exec();
    if (result) {
      /* Found submission matching submissionId. */
      if (!req.session.loggedIn) {
        res.status(401).send('Not logged in');
      } else if (result.author.toString() !== req.session.userId) {
        res.status(403).send('Access to that resource is forbidden');
      } else {
        const caption =
          req.body.caption !== null ? req.body.caption : result.caption;
        await Submission.updateOne(
          { _id: submissionId },
          {
            $set: {
              caption: caption,
            },
          }
        );
        const updatedSubmission = await Submission.findById(
          submissionId
        ).exec();
        res.status(200).json(updatedSubmission);
      }
    } else {
      /* Did not find a submission with matching submissionId. */
      res.status(404).send('Invalid submission id.');
    }
  } catch (err) {
    res.status(500).send('Internal server error.');
    console.error(err);
  }
});

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
 *         $ref: '#/components/responses/401Unauthorized'
 *       500:
 *         $ref: '#/components/responses/500'
 */
submissionRouter.post('/:id/vote', async (req, res) => {
  if (!req.session.loggedIn) {
    res.status(401).send('Must be logged in to perform this action.');
    return;
  }
  const submissionId = req.params.id;
  const query = Submission.findById(submissionId);
  try {
    const result = await query.lean().exec();
    if (!result) {
      res.status(404).send('Resource not found.');
      return;
    }

    await voteOn('Submission', submissionId, req.session.userId);
    res.status(200).send('Successfully voted on submission.');
  } catch (err) {
    res.status(500).send('Internal server error.');
    console.error(err);
  }
});

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
 *         $ref: '#/components/responses/401Unauthorized'
 *       500:
 *         $ref: '#/components/responses/500'
 */
submissionRouter.post('/:id/unvote', async (req, res) => {
  if (!req.session.loggedIn) {
    res.status(401).send('Must be logged in to perform this action.');
    return;
  }
  const submissionId = req.params.id;
  const query = Submission.findById(submissionId);
  try {
    const result = await query.lean().exec();
    if (!result) {
      res.status(404).send('Resource not found.');
      return;
    }

    await unvoteOn('Submission', submissionId, req.session.userId);
    res.status(200).send('Successfully unvoted on submission.');
  } catch (err) {
    res.status(500).send('Internal server error.');
    console.error(err);
  }
});

/**
 * @openapi
 * /submission/{id}/comments:
 *   get:
 *     summary: Retrieve comments for submission.
 *     parameters:
 *       - $ref: '#/components/parameters/idParam'
 *     responses:
 *       200:
 *         description: Resource successfully retrieved.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 *       404:
 *         $ref: '#/components/responses/404NotFound'
 *       500:
 *         $ref: '#/components/responses/500'
 */
submissionRouter.get('/:id/comments', async (req, res) => {
  try {
    const submissionId = req.params.id;
    const query = Comment.find({
      commentedModel: 'Submission',
      post: submissionId,
    });
    const result = await query.exec();
    if (result) {
      /* Found comments on submission. */
      res.status(200).json(result);
    } else {
      /* Did not find a submission with matching submissionId. */
      res.status(404).send('Invalid submission id.');
    }
  } catch (err) {
    res.status(500).send('Internal server error.');
    console.error(err);
  }
});

/**
 * @openapi
 * /submission/{id}/comment:
 *   post:
 *     summary: Creating new comment by a user on a submission.
 *     parameters:
 *       - $ref: '#/components/parameters/idParam'
 *     responses:
 *       200:
 *         description: Successfully commented on submission.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       401:
 *         $ref: '#/components/responses/401Unauthorized'
 *       404:
 *         $ref: '#/components/responses/404NotFound'
 *       500:
 *         $ref: '#/components/responses/500'
 */
submissionRouter.post('/:id/comment', async (req, res) => {
  if (!req.session.loggedIn) {
    res.status(401).send('Not logged in.');
    return;
  }
  const submissionId = req.params.id;
  try {
    const newComment = await Comment.create({
      author: req.session.userId,
      commentedModel: 'Submission',
      post: submissionId,
      text: req.body.comment,
    });
    res.status(200).json(newComment);
  } catch (err) {
    res.status(500).send('Internal server error.');
    console.error(err);
  }
});

/**
 * @openapi
 * /submission/{id}:
 *   delete:
 *     summary: Delete submission if user is the submission owner.
 *     parameters:
 *       - $ref: '#/components/parameters/idParam'
 *     responses:
 *       200:
 *         description: Successfully deleted submission.
 *       401:
 *         $ref: '#/components/responses/401Unauthorized'
 *       403:
 *         $ref: '#/components/responses/403Forbidden'
 *       404:
 *         $ref: '#/components/responses/404NotFound'
 *       500:
 *         $ref: '#/components/responses/500'
 */
submissionRouter.delete('/:id', async (req, res) => {
  if (!req.session.loggedIn) {
    res.status(401).send('User not logged in.');
    return;
  }
  const submissionId = req.params.id;
  /* Delete submission.  */
  const query = Submission.findOneAndDelete({
    _id: submissionId,
    author: req.session.userId,
  });
  try {
    const submissionObj = await query.lean().exec();
    if (!submissionObj) {
      res.status(404).send('Failed to find submission.');
      console.error('Failed to find submission.');
    } else {
      res.status(200).send('Successfully deleted submission.');
    }
  } catch (err) {
    res.status(500).send('Internal server error.');
    console.error(err);
  }
});

export { submissionRouter };
