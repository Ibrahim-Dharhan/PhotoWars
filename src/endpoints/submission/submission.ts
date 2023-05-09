'use strict';

import express = require('express');
import { Submission } from '../../definitions/schemas/submission';

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

export { submissionRouter };
