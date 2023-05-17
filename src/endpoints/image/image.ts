"use strict"

import express = require('express');
import path = require('path');

import * as constants from '../../definitions/constants';

const IMAGE_DIR = process.env.IMAGE_DIR || constants._imageDir;
const imageRouter = express.Router();

/**
 * @openapi
 * /image/{filename}:
 *   get:
 *     summary: Retrieves image with filename.
 *     parameters:
 *       - in: path
 *         name: filename
 *         schema:
 *           type: string
 *         required: true
 *         description: Filename of the image.
 *     responses:
 *       200:
 *         description: Resource successfully retrieved.
 *       404:
 *         $ref: '#/components/responses/404NotFound'
 *
 */
imageRouter.get('/:filename', (req, res) => {
  const options = {
    root: path.join('.', IMAGE_DIR),
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    }
  };

  const filename = req.params.filename;
  res.sendFile(filename, options, (err) => {
    if (err) {
      console.error('Failed to send file.', err);
      res.status(404).send('Image does not exist.');
    } else {
      console.log(`Sent: ${filename}`);
    }
  });
});

export { imageRouter };
