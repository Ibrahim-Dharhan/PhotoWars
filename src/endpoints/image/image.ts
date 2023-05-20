"use strict"

import express = require('express');
import path = require('path');

import { AWS_BUCKET_NAME, getFileFromS3 } from '../../definitions/s3';
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
  const filename = req.params.filename;
  if (AWS_BUCKET_NAME) {
    /* Get file from Amazon S3 storage.  */
    const fileKey = path.join(IMAGE_DIR, filename);
    try {
      const readStream = getFileFromS3(fileKey);
      console.log(fileKey);
      readStream.pipe(res);
    } catch (err) {
      console.error(err);
      res.status(404).send('Not Found');
    }
  } else {
    /* Get file from local file system.  */
    const options = {
      root: IMAGE_DIR,
      headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
      }
    };

    res.sendFile(filename, options, (err) => {
      if (err) {
        console.error('Failed to send file.', err);
        res.status(404).send('Image does not exist.');
      } else {
        console.log(`Sent: ${filename}`);
      }
    });
  }
});

export { imageRouter };
