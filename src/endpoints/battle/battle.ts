"use strict";

import express = require("express");
import { Battle } from "../../schemas/battle";

const battleRouter = express.Router();

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
battleRouter.get("/:id", async (req, res) => {
  const battle_id = req.params.id;
  const query = Battle.findOne({
    _id: battle_id,
  });
  try {
    const result = await query.exec();
    console.log(result);
    if (result) {
      /* Found battle matching battle_id.  */
      // TODO: Change response message.
      res.status(200).send(JSON.parse(JSON.stringify(result)));
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
