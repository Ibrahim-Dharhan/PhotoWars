"use strict";

import express = require("express");
import { Battle } from "../../schemas/battle";

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
battleRouter.get("/:id", async (req, res) => {
  const battle_id = req.params.id;
  const query = Battle.findById(battle_id);
  try {
    const result = await query.lean().exec();
    if (result) {
      /* Found battle matching battle_id.  */
      // TODO: Change response message.
      res.status(200).json(result);
    } else {
      /* Did not find a user with credentials.  */
      res.status(401).send("Invalid battle id.");
    }
  } catch (err) {
    res.status(500).send("Internal server error.");
    console.error("Failed to query database.");
  }
});

export { battleRouter };
