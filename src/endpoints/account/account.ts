"use strict"

import express = require('express');
import { User } from '../../schemas/user';

const accountRouter = express.Router();

/**
 * @openapi
 * /account/login:
 *   post:
 *     summary: Attempt to log in with given credentials.
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
    const result = await query.exec();
    if (result) {
      /* Found user matching login credentials.  */
      req.session.logged_in = true;
      req.session.user_id = result._id;
      // TODO: Change response message.
      res.status(200).send(JSON.parse(JSON.stringify(result)));
    } else {
      /* Did not find a user with credentials.  */
      res.status(401).send('Invalid credentials.');
    }
  } catch (err) {
    res.status(500).send("Internal server error.");
    console.error("Failed to query database.");
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
 *         $ref: '#/components/responses/401'
 *       500:
 *         $ref: '#/components/responses/500'
 */
accountRouter.post('/logout', (req, res) => {
  console.log(req);
  res.status(501).send('Not Implemented');
});

export { accountRouter };
