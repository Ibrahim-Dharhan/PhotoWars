'use strict';

import express = require('express');
import { Battle } from '../../definitions/schemas/mongoose/battle';
import { UpdateBattle } from '../../definitions/schemas/validation/updateBattle';
import { upload } from '../../server';

const battleRouter = express.Router();

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
    const result = await query.lean().exec();
    if (result) {
      /* Found battle matching battleId.  */
      res.status(200).json(result);
    } else {
      /* Did not find a battle with matching battleId.  */
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

  try {
    const battleId = req.params.id;
    const query = Battle.findById(battleId);
    const result = await query.exec();
    if (result) {
      /* Found battle matching battleId. */
      if (!req.session.loggedIn) {
        res.status(401).send('Not logged in');
      } else if (result.authorId.toString() !== req.session.userId) {
        res.status(403).send('Access to that resource is forbidden');
      } else {
        const caption =
          req.body.caption !== null ? req.body.caption : result.caption;
        const deadline =
          req.body.deadline !== null ? req.body.deadline : result.deadline;
        await Battle.updateOne(
          { _id: battleId },
          {
            $set: {
              caption: caption,
              deadline: deadline,
            },
          }
        );
        const updatedBattle = await Battle.findById(battleId).exec();
        res.status(200).json(updatedBattle);
      }
    } else {
      /* Did not find a battle with matching battleId. */
      res.status(404).send('Invalid battle id.');
    }
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
 *         description: Missing information to create a new battle.
 *       401:
 *         $ref: '#/components/responses/401NotLoggedIn'
 *       500:
 *         $ref: '#/components/responses/500'
 */
battleRouter.post('/new', upload.single('file'), async (req, res) => {
  try {
    if (req.session.loggedIn) {
      // TODO: Ensure all params are valid
      const newBattleObj = await Battle.create({
        authorId: req.session.userId,
        caption: req.body.caption,
        deadline: req.body.deadline,
        filename: req.file.filename,
        numLikes: 1,
        numSubmissions: 1,
      });
      await newBattleObj.save();
      res.status(200).json(newBattleObj);
    } else {
      res.status(401).send('Not logged in');
    }
  } catch (err) {
    res.status(500).send('Internal server error.');
    console.error(err);
  }
});

export { battleRouter };
