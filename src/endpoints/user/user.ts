"use strict"

import express = require('express');
import { checkSchema, validationResult } from 'express-validator';
import { UpdateUser } from '../../definitions/schemas/validation/updateUser';
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

/**
 * @openapi
 * /user:
 *   put:
 *     summary: Update user profile information.
 *     requestBody:
 *       description: User profile information to be updated.
 *       require: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *               displayName:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *             required:
 *               - description
 *               - displayName
 *               - firstName
 *               - lastName
 *     responses:
 *       200:
 *         description: Successfully updated user data.
 *       401:
 *         $ref: '#/components/responses/401NotLoggedIn'
 *       500:
 *         $ref: '#/components/responses/500'
 */
userRouter.put('/', checkSchema(UpdateUser), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      errors: errors.array()
    });
    return;
  }

  if (!req.session.loggedIn) {
    res.status(401).send('User not logged in.');
    return;
  }
  const query = User.findOneAndUpdate({ _id: req.session.userId },
                                      { $set: req.body },
                                      { new: true });
  try {
    const userObj = await query.lean().exec();
    if (!userObj) {
      res.status(500).send('Failed to find user.');
      console.error('Failed to find user.');
    } else {
      res.status(200).json(userObj);
    }
  } catch (err) {
    res.status(500).send('Internal server error.');
    console.error(err);
  }
});

export { userRouter };
