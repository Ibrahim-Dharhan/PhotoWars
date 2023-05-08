"use strict"

import express = require('express');

const imageRouter = express.Router();
const IMAGE_DIR = 'public/images';

/**
 * @openapi
 * /image/{filename}:
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
imageRouter.get('/image/:filename', (req, res) => {
  const options = {
    root: path.join(__dirname, IMAGE_DIR),
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    }
  };

  const filename = req.params.name;
  res.sendFile(filename, options, (err) => {
    if (err) {
      console.error('Failed to send file.', err);
    } else {
      console.log(`Send: ${filename}`);
    }
  });
});

export { imageRouter };
