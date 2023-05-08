'use strict';

import express = require('express');
import { Battle } from '../../schemas/battle';
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
 *         $ref: '#/components/responses/404'
 *       500:
 *         $ref: '#/components/responses/500'
 */
battleRouter.get('/:id', async (req, res) => {
  const battle_id = req.params.id;
  const query = Battle.findById(battle_id);
  try {
    const result = await query.lean().exec();
    if (result) {
      /* Found battle matching battle_id.  */
      res.status(200).json(result);
    } else {
      /* Did not find a battle with matching battle_id.  */
      res.status(401).send('Invalid battle id.');
    }
  } catch (err) {
    res.status(500).send('Internal server error.');
    console.error('Failed to query database.');
  }
});

/**
 * @openapi
 * /battle/{id}:
 *   put:
 *     summary: Update battle information if user is the battle creator.
 *     parameters:
 *       - $ref: '#/components/parameters/idParam'
 *     responses:
 *       200:
 *         description: Successfully updated battle information.
 *       401:
 *         $ref: '#/components/responses/401NotLoggedIn'
 *       403:
 *         $ref: '#/components/responses/403'
 *       404:
 *         $ref: '#/components/responses/404'
 *       500:
 *         $ref: '#/components/responses/500'
 */
battleRouter.put('/:id', async (req, res) => {
  try {
    const battle_id = req.params.id;
    const query = Battle.findById(battle_id);
    const result = await query.exec();
    if (result) {
      /* Found battle matching battle_id. */
      if (!req.session.logged_in) {
        res.status(401).send('Not logged in');
      } else if (result.author_id.toString() !== req.session.user_id) {
        res.status(403).send('Access to that resource is forbidden');
      } else {
        const caption =
          req.body.caption !== null ? req.body.caption : result.caption;
        const deadline =
          req.body.deadline !== null ? req.body.deadline : result.deadline;
        Battle.updateOne(
          { _id: battle_id },
          {
            $set: {
              caption: caption,
              deadline: deadline,
            },
          }
        );
        const updatedBattle = await Battle.findById(battle_id).exec();
        res.status(200).json(updatedBattle);
      }
    } else {
      /* Did not find a battle with matching battle_id. */
      res.status(401).send('Invalid battle id.');
    }
  } catch (err) {
    res.status(500).send('Internal server error.');
    console.error('Failed to query database.');
  }
});

/**
 * @openapi
 * /battle/new:
 *   post:
 *     summary: Creating a new battle by a user.
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
    if (req.session.logged_in) {
      // TODO: Ensure all params are valid
      const newBattleObj = await Battle.create({
        author_id: req.session.user_id,
        caption: req.body.caption,
        deadline: req.body.deadline,
        file_name: req.file.filename,
        num_likes: 1,
        num_submissions: 1,
      });
      await newBattleObj.save();
      res.status(200).json(newBattleObj);
    } else {
      res.status(401).send('Not logged in');
    }
  } catch (err) {
    res.status(500).send('Internal server error.');
    console.error('Failed to query database.');
  }
});

export { battleRouter };
