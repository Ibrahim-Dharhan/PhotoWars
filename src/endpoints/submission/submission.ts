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
 *         description: Successfully returned information about submission.
 *       404:
 *         $ref: '#/components/responses/404'
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
 *         description: Successfully commented on submission.
 *       401:
 *         $ref: '#/components/responses/401NotLoggedIn'
 *       404:
 *         $ref: '#/components/responses/404'
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
 *         $ref: '#/components/responses/401NotLoggedIn'
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
 *         $ref: '#/components/responses/401NotLoggedIn'
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
 * /submission/{id}/comment:
 *   get:
 *     summary: Retrieve comments for submission.
 *     parameters:
 *       - $ref: '#/components/parameters/idParam'
 *     responses:
 *       200:
 *         description: Successfully returned comments.
 *       404:
 *         $ref: '#/components/responses/404'
 *       500:
 *         $ref: '#/components/responses/500'
 */
submissionRouter.get('/:id/comment', async (req, res) => {
  try {
    const submissionId = req.params.id;
    const query = Comment.find({
      commentedModel: 'Submission',
      post: { $eq: submissionId },
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
 *       401:
 *         $ref: '#/components/responses/401NotLoggedIn'
 *       404:
 *         $ref: '#/components/responses/404'
 *       500:
 *         $ref: '#/components/responses/500'
 */
submissionRouter.post('/:id/comment', async (req, res) => {
  const submissionId = req.params.id;
  if (!req.session.loggedIn) {
    res.status(401).send('Not logged in.');
    return;
  }
  try {
    const newCommentObj = await Comment.create({
      author: req.session.userId,
      commentedModel: 'Submission',
      post: submissionId,
      text: req.body.comment,
    });
    res.status(200).json(newCommentObj);
  } catch (err) {
    res.status(500).send('Internal server error.');
    console.error(err);
  }
});

export { submissionRouter };
