"use strict"

import express = require('express');
import { checkSchema, validationResult } from 'express-validator';
import { User, newUserSchema } from '../../definitions/schemas/user';

const accountRouter = express.Router();

/**
 * @openapi
 * /account/login:
 *   post:
 *     summary: Attempt to log in with given credentials.
 *     requestBody:
 *       description: Username and password for a user.
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               loginName:
 *                 type: string
 *               loginPassword:
 *                 type: string
 *             required:
 *               - loginName
 *               - loginPassword
 *     responses:
 *       200:
 *         description: Successfully logged in.
 *       401:
 *         description: Invalid credentials.
 *       500:
 *         $ref: '#/components/responses/500'
 */
accountRouter.post('/login', async (req, res) => {
  const loginName = req.body.loginName;
  const loginPassword = req.body.loginPassword;
  const query = User.findOne({ loginName: loginName,
                               loginPassword: loginPassword });

  try {
    const result = await query.lean().exec();
    if (result) {
      /* Found user matching login credentials.  */
      req.session.loggedIn = true;
      req.session.userId = result._id.toString();
      // TODO: Change response message.
      res.status(200).json(result);
    } else {
      /* Did not find a user with credentials.  */
      res.status(401).send('Invalid credentials.');
    }
  } catch (err) {
    res.status(500).send('Internal server error.');
    console.error('Failed to query database.');
  }

});

/**
 * @openapi
 * /account/logout:
 *   post:
 *     summary: Log user out.
 *     responses:
 *       200:
 *         description: Successfully logged out.
 *       400:
 *         description: Failed to logout user.
 *       401:
 *         $ref: '#/components/responses/401NotLoggedIn'
 *       500:
 *         $ref: '#/components/responses/500'
 */
accountRouter.post('/logout', (req, res) => {
  req.session.loggedIn = false;
  req.session.userId = null;
  res.status(200).send('Successfully logged out.');
});

/**
 * @openapi
 * /account/new:
 *   post:
 *     summary: Creating a new user account.
 *     requestBody:
 *       description: User account information.
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               displayName:
 *                 type: string
 *               loginName:
 *                 type: string
 *               loginPassword:
 *                 type: string
 *             required:
 *               - displayName
 *               - loginName
 *               - loginPassword
 *     responses:
 *       200:
 *         description: Successfully created new user.
 *       400:
 *         description: Missing information to create new user.
 *       409:
 *         description: User already exists.
 *       500:
 *         $ref: '#/components/responses/500'
 */
accountRouter.post('/new', checkSchema(newUserSchema), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      errors: errors.array()
    });
    return;
  }
  const userObj = await User.create(req.body);
  res.status(200).json(userObj.toObject());
});

export { accountRouter };
