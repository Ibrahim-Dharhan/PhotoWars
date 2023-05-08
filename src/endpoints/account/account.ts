"use strict"

import express = require('express');
import { User } from '../../schemas/user';

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
 *               login_name:
 *                 type: string
 *               login_password:
 *                 type: string
 *             required:
 *               - login_name
 *               - login_password
 *     responses:
 *       200:
 *         description: Successfully logged in.
 *       401:
 *         description: Invalid credentials.
 *       500:
 *         $ref: '#/components/responses/500'
 */
accountRouter.post('/login', async (req, res) => {
  const login_name = req.body.login_name;
  const login_password = req.body.login_password;
  const query = User.findOne({ login_name: login_name,
                               login_password: login_password });

  try {
    const result = await query.lean().exec();
    if (result) {
      /* Found user matching login credentials.  */
      req.session.logged_in = true;
      req.session.user_id = result._id;
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
  req.session.logged_in = false;
  req.session.user_id = null;
  res.status(200).send('Successfully logged out.');
});

export { accountRouter };
