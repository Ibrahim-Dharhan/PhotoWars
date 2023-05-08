"use strict"

import express = require('express');
import { User } from '../../definitions/schemas/user';

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
userRouter.get('/:id', async (req, res) => {
  const userId = req.params.id;
  const query = User.findOne({ _id: userId });

  try {
    const userObj = await query.lean().exec();
    if (!userObj) {
      res.status(404).send('Resource not found.');
      return;
    }
    res.status(200).json(userObj);
  } catch (err) {
    res.status(500).send('Internal server error.');
    return;
  }
});

export { userRouter };
