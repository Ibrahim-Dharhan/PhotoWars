'use strict';

import express = require('express');
import fs = require('fs');
import path = require('path');
import { Battle } from '../../definitions/schemas/mongoose/battle';
import { checkSchema, matchedData, validationResult } from 'express-validator';
import { NewBattle } from '../../definitions/schemas/validation/newBattle';
import { NewSubmission } from '../../definitions/schemas/validation/newSubmission';
import { Submission } from '../../definitions/schemas/mongoose/submission';
import { UpdateBattle } from '../../definitions/schemas/validation/updateBattle';
import { upload } from '../../server';
import { voteOn, unvoteOn } from '../../definitions/schemas/mongoose/vote';

import * as constants from '../../definitions/constants';
const IMAGE_DIR = process.env.IMAGE_DIR || constants._imageDir;
const battleRouter = express.Router();

/**
 * @openapi
 * /battle/all:
 *   get:
 *     summary: Return information about a battle.
 *     responses:
 *       200:
 *         description: Successfully returned information about battle.
 *       404:
 *         $ref: '#/components/responses/404ResourceNotFound'
 *       500:
 *         $ref: '#/components/responses/500'
 */
battleRouter.get('/ids', async (req, res) => {
  const query = Battle.find();
  try {
    const result = await query.distinct('_id').exec();
    if (result) {
      /* Retrieved battle ids.  */
      res.status(200).json(result);
    } else {
      /* Did not find a battles.  */
      res.status(404).send('Invalid battle id.');
    }
  } catch (err) {
    res.status(500).send('Internal server error.');
    console.error(err);
  }
});

/**
 * @openapi
 * /battle/{id}:
 *   get:
 *     summary: Return information about a battle.
 *     parameters:
 *       - $ref: '#/components/parameters/idParam'
 *     responses:
 *       200:
 *         description: Successfully returned information about battle.
 *       404:
 *         $ref: '#/components/responses/404ResourceNotFound'
 *       500:
 *         $ref: '#/components/responses/500'
 */
battleRouter.get('/:id', async (req, res) => {
  const battleId = req.params.id;
  const query = Battle.findById(battleId);
  try {
    const result = await query.populate('author').lean().exec();
    if (result) {
      /* Found battle matching battle id.  */
      res.status(200).json(result);
    } else {
      /* Did not find a battle with matching battle id.  */
      res.status(404).send('Invalid battle id.');
    }
  } catch (err) {
    res.status(500).send('Internal server error.');
    console.error(err);
  }
});

/**
 * @openapi
 * /battle/{id}:
 *   put:
 *     summary: Update battle information if user is the battle creator.
 *     parameters:
 *       - $ref: '#/components/parameters/idParam'
 *     requestBody:
 *       description: Battle information to be updated.
 *       require: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               caption:
 *                 type: string
 *               deadline:
 *                 type: string
 *                 format: date-time
 *             required:
 *               - caption
 *               - deadline
 *     responses:
 *       200:
 *         description: Successfully updated battle information.
 *       401:
 *         $ref: '#/components/responses/401NotLoggedIn'
 *       403:
 *         $ref: '#/components/responses/403'
 *       404:
 *         $ref: '#/components/responses/404ResourceNotFound'
 *       500:
 *         $ref: '#/components/responses/500'
 */
battleRouter.put('/:id', checkSchema(UpdateBattle), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      errors: errors.array()
    });
    return;
  }

  if (!req.session.loggedIn) {
    res.status(401).send('Not logged in.');
    return;
  }

  const battleId = req.params.id;
  const query = Battle.findById(battleId);
  try {
    const result = await query.exec();
    if (!result) {
      /* Did not find a battle with matching battle id. */
      res.status(404).send('Invalid battle id.');
      return;
    }

    if (result.author.toString() !== req.session.userId) {
      /* User is not the owner of the resource.  */
      res.status(403).send('Access to that resource is forbidden.');
      return;
    }

    const body = matchedData(req);
    const updatedBattle = await Battle.findByIdAndUpdate(
                                  battleId,
                                  { $set: body },
                                  { new: true }
                                ).exec();

    res.status(200).json(updatedBattle);
  } catch (err) {
    res.status(500).send('Internal server error.');
    console.error(err);
  }
});

/**
 * @openapi
 * /battle/new:
 *   post:
 *     summary: Creating a new battle by a user.
 *     requestBody:
 *       description: Battle information to be updated.
 *       require: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               caption:
 *                 type: string
 *               deadline:
 *                 type: string
 *                 format: date-time
 *               file:
 *                 type: string
 *                 format: binary
 *             required:
 *               - caption
 *               - deadline
 *               - file
 *     responses:
 *       200:
 *         description: Successfully created new battle.
 *       400:
 *         description: Missing or invalid information to create a new battle.
 *       401:
 *         $ref: '#/components/responses/401NotLoggedIn'
 *       500:
 *         $ref: '#/components/responses/500'
 */
battleRouter.post('/new', upload.single('file'), checkSchema(NewBattle), async (req, res) => {
  if (!req.file) {
    res.status(400).send('Invalid file.');
    return;
  }
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    await fs.promises.unlink(path.join('.', IMAGE_DIR, req.file.filename));
    res.status(400).json({
      errors: errors.array()
    });
    return;
  }

  if (!req.session.loggedIn) {
    await fs.promises.unlink(path.join('.', IMAGE_DIR, req.file.filename));
    res.status(401).send('Not logged in.');
    return;
  }

  try {
    const newBattleObj = await Battle.create({
      ...{ 
        author: req.session.userId,
        filename: req.file.filename
      },
      ...matchedData(req)
    });
    res.status(200).json(newBattleObj);
  } catch (err) {
    res.status(500).send('Internal server error.');
    await fs.promises.unlink(path.join('.', IMAGE_DIR, req.file.filename));
    console.error(err);
  }
});

/**
 * @openapi
 * /battle/{id}/submit:
 *   post:
 *     summary: Creating a new submission to a battle by a user.
 *     parameters:
 *       - $ref: '#/components/parameters/idParam'
 *     requestBody:
 *       description: Submission object.
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               caption:
 *                 type: string
 *               file:
 *                 type: string
 *                 format: binary
 *             required:
 *               - caption
 *               - file
 *     responses:
 *       200:
 *         description: Successfully created new submission.
 *       400:
 *         description: Missing information to create a new submission.
 *       401:
 *         $ref: '#/components/responses/401NotLoggedIn'
 *       404:
 *         $ref: '#/components/responses/404ResourceNotFound'
 *       500:
 *         $ref: '#/components/responses/500'
 */
battleRouter.post('/:id/submit', upload.single('file'), checkSchema(NewSubmission), async (req, res) => {
  if (!req.file) {
    res.status(400).send('Invalid file.');
    return;
  }
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    await fs.promises.unlink(path.join('.', IMAGE_DIR, req.file.filename));
    res.status(400).json({
      errors: errors.array()
    });
    return;
  }

  if (!req.session.loggedIn) {
    await fs.promises.unlink(path.join('.', IMAGE_DIR, req.file.filename));
    res.status(401).send('Not logged in.');
    return;
  }

  const battleId = req.params.id;
  try {
    const battleObj = await Battle.findById(battleId).lean().exec();
    if (!battleObj) {
      /* Battle does not exist.  */
      await fs.promises.unlink(path.join('.', IMAGE_DIR, req.file.filename));
      res.status(404).send('Battle does not exist.');
      return;
    }
    const newSubmissionObj = await Submission.create({
      ...{
        author: req.session.userId,
        filename: req.file.filename
      },
      ...matchedData(req)
    });
    res.status(200).json(newSubmissionObj);
  } catch (err) {
    await fs.promises.unlink(path.join('.', IMAGE_DIR, req.file.filename));
    res.status(500).send('Internal server error.');
  }
});

/**
 * @openapi
 * /battle/{id}/vote:
 *   put:
 *     summary: Vote on a battle.
 *     parameters:
 *       - $ref: '#/components/parameters/idParam'
 *     responses:
 *       200:
 *         description: Successfully vote on battle.
 *       401:
 *         $ref: '#/components/responses/401NotLoggedIn'
 *       404:
 *         $ref: '#/components/responses/404ResourceNotFound'
 *       500:
 *         $ref: '#/components/responses/500'
 */
battleRouter.put('/:id/vote', async (req, res) => {
  if (!req.session.loggedIn) {
    res.status(401).send('Must be logged in to perform this action.');
    return;
  }

  const battleId = req.params.id;
  const query = Battle.findOne({ _id: battleId });
  try {
    const result = await query.lean().exec();
    if (!result) {
      res.status(404).send('Resource not found.');
      return;
    }

    await voteOn('Battle', battleId, req.session.userId);
    res.status(200).send('Successfully voted on battle.');

  } catch (err) {
    res.status(500).send('Internal server error.');
    console.error(err);
  }
});

/**
 * @openapi
 * /battle/{id}/unvote:
 *   put:
 *     summary: Unvote a battle.
 *     parameters:
 *       - $ref: '#/components/parameters/idParam'
 *     responses:
 *       200:
 *         description: Successfully unvoted battle.
 *       401:
 *         $ref: '#/components/responses/401NotLoggedIn'
 *       404:
 *         $ref: '#/components/responses/404ResourceNotFound'
 *       500:
 *         $ref: '#/components/responses/500'
 */
battleRouter.put('/:id/unvote', async (req, res) => {
  if (!req.session.loggedIn) {
    res.status(401).send('Must be logged in to perform this action.');
    return;
  }

  const battleId = req.params.id;
  const query = Battle.findOne({ _id: battleId });
  try {
    const result = await query.lean().exec();
    if (!result) {
      res.status(404).send('Resource not found.');
      return;
    }

    await unvoteOn('Battle', battleId, req.session.userId);
    res.status(200).send('Successfully unvoted battle.');

  } catch (err) {
    res.status(500).send('Internal server error.');
    console.error(err);
  }
});

export { battleRouter };
