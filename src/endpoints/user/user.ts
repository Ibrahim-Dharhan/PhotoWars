'use strict';

import express = require('express');
import fs = require('fs');
import path = require('path');
import { AWS_BUCKET_NAME, deleteFileFromS3, uploadFileToS3 } from '../../definitions/s3';
import { checkSchema, matchedData, validationResult } from 'express-validator';
import { Battle } from '../../definitions/schemas/mongoose/battle';
import { Comment } from '../../definitions/schemas/mongoose/comment';
import { Submission } from '../../definitions/schemas/mongoose/submission';
import { upload } from '../../server';
import { User } from '../../definitions/schemas/mongoose/user';
import { Vote } from '../../definitions/schemas/mongoose/vote';
import { UpdateUser } from '../../definitions/schemas/validation/updateUser';

import * as constants from '../../definitions/constants';
const IMAGE_DIR = process.env.IMAGE_DIR || constants._imageDir;

const userRouter = express.Router();

/**
 * @openapi
 * /user/{id}:
 *   get:
 *     summary: Returns information for user with id.
 *     parameters:
 *       - $ref: '#/components/parameters/idParam'
 *     responses:
 *       200:
 *         description: Resource successfully retrieved.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 description:
 *                   type: string
 *                 displayName:
 *                   type: string
 *                 filename:
 *                   type: string
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *       404:
 *         $ref: '#/components/responses/404NotFound'
 *       500:
 *         $ref: '#/components/responses/500'
 */
userRouter.get('/:id', async (req, res) => {
  const userId = req.params.id;
  const query = User.findOne({ _id: userId }, [
    '-__v',
    '-loginName',
    '-loginPassword',
  ]);

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
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *               displayName:
 *                 type: string
 *               filename:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *             required:
 *               - description
 *               - displayName
 *               - filename
 *               - firstName
 *               - lastName
 *     responses:
 *       200:
 *         description: Successfully updated user data.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid information to update user.
 *       401:
 *         $ref: '#/components/responses/401Unauthorized'
 *       404:
 *         $ref: '#/components/responses/404NotFound'
 *       500:
 *         $ref: '#/components/responses/500'
 */
userRouter.put('/', upload.single('file'), checkSchema(UpdateUser), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    await fs.promises.unlink(path.join(IMAGE_DIR, req.file.filename));
    res.status(400).json({
      errors: errors.array(),
    });
    return;
  }

  if (!req.session.loggedIn) {
    await fs.promises.unlink(path.join(IMAGE_DIR, req.file.filename));
    res.status(401).send('User not logged in.');
    return;
  }
  
  const query = User.findOneAndUpdate(
    { _id: req.session.userId },
    {
      $set: {
        ...{filename: req.file.filename},
        ...matchedData(req)
      }
    }
  );
  try {
    const userObj = await query.lean().exec();
    if (!userObj) {
      await fs.promises.unlink(path.join(IMAGE_DIR, req.file.filename));
      res.status(404).send('Failed to find user.');
      console.error('Failed to find user.');
    } else {
      if (AWS_BUCKET_NAME) {
        /* Uploading profile picture to S3 and delete old profile picture.  */
        await deleteFileFromS3(userObj.filename);
        await uploadFileToS3(req.file);
        // await fs.promises.unlink(path.join(IMAGE_DIR, req.file.filename));
      }

      const newQuery = User.findById(req.session.userId, [
        '-__v',
        '-loginName',
        '-loginPassword',
      ]);
      const newUserObj = await newQuery.lean().exec();
      res.status(200).json(newUserObj);
    }
  } catch (err) {
    await fs.promises.unlink(path.join(IMAGE_DIR, req.file.filename));
    res.status(500).send('Internal server error.');
    console.error(err);
  }
});

/**
 * @openapi
 * /user:
 *   delete:
 *     summary: Delete user.
 *     responses:
 *       200:
 *         description: Successfully deleted user.
 *       401:
 *         $ref: '#/components/responses/401Unauthorized'
 *       404:
 *         $ref: '#/components/responses/404NotFound'
 *       500:
 *         $ref: '#/components/responses/500'
 */
userRouter.delete('/', async (req, res) => {
  if (!req.session.loggedIn) {
    res.status(401).send('User not logged in.');
    return;
  }

  /* Delete user.  */
  const query = User.findOneAndDelete({ _id: req.session.userId });
  try {
    const userObj = await query.lean().exec();
    if (!userObj) {
      res.status(404).send('Failed to find user.');
      console.error('Failed to find user.');
    } else {
      res.status(200).send('Successfully deleted user.');
    }
  } catch (err) {
    res.status(500).send('Internal server error.');
    console.error(err);
  }
});

/**
 * @openapi
 * /user/{id}/battles:
 *   get:
 *     summary: Returns all battles created by user.
 *     parameters:
 *       - $ref: '#/components/parameters/idParam'
 *     responses:
 *       200:
 *         description: Resource successfully retrieved.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *       500:
 *         $ref: '#/components/responses/500'
 */
userRouter.get('/:id/battles', async (req, res) => {
  const userId = req.params.id;
  const query = Battle.find({ author: userId }, ['_id']);

  try {
    const battleIds = await query.lean().exec();
    res.status(200).json(battleIds);
  } catch (err) {
    res.status(500).send('Internal server error.');
    return;
  }
});

/**
 * @openapi
 * /user/{id}/comments:
 *   get:
 *     summary: Returns all comments created by user.
 *     parameters:
 *       - $ref: '#/components/parameters/idParam'
 *     responses:
 *       200:
 *         description: Resource successfully retrieved.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *       500:
 *         $ref: '#/components/responses/500'
 */
userRouter.get('/:id/comments', async (req, res) => {
  const userId = req.params.id;
  const query = Comment.find({ author: userId }, ['_id', 'text', 'post']);

  try {
    const commentProps = await query.lean().exec();
    res.status(200).json(commentProps);
  } catch (err) {
    res.status(500).send('Internal server error.');
    return;
  }
});

/**
 * @openapi
 * /user/{id}/submissions:
 *   get:
 *     summary: Returns all submissions created by user.
 *     parameters:
 *       - $ref: '#/components/parameters/idParam'
 *     responses:
 *       200:
 *         description: Resource successfully retrieved.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *       500:
 *         $ref: '#/components/responses/500'
 */
userRouter.get('/:id/submissions', async (req, res) => {
  const userId = req.params.id;
  const query = Submission.find({ author: userId }, ['_id', 'battle']);

  try {
    const submissionProps = await query.lean().exec();
    res.status(200).json(submissionProps);
  } catch (err) {
    res.status(500).send('Internal server error.');
    return;
  }
});

/**
 * @openapi
 * /user/{id}/votes:
 *   get:
 *     summary: Returns all content voted on by user.
 *     parameters:
 *       - $ref: '#/components/parameters/idParam'
 *     responses:
 *       200:
 *         description: Resource successfully retrieved.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *       500:
 *         $ref: '#/components/responses/500'
 */
userRouter.get('/:id/votes', async (req, res) => {
  const userId = req.params.id;
  const query = Vote.find({ user: userId }, ['-_id', '-__v']);

  try {
    const voteIds = await query.populate('post', ['_id']).lean().exec();
    res.status(200).json(voteIds);
  } catch (err) {
    res.status(500).send('Internal server error.');
    return;
  }
});

export { userRouter };
