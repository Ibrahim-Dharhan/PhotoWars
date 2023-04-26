"use strict"

import express = require('express');

import { Kitten } from '../../schemas/kitten';

const testRouter = express.Router();

/**
 * @openapi
 * /test/kitten:
 *   get:
 *     summary: Returns a single Kitten JSON object from MongoDB.
 *     responses:
 *       200:
 *         description: Successfully retrieved Kitten object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Kitten'
 *       500:
 *         description: Internal server error.
 *
 */
testRouter.get('/kitten', (request, response) => {
  Kitten.deleteMany({}).then(function() {
    Kitten.create({
      name: 'Silence'
    }).then(function(kittyObj) {
      kittyObj.save().then(() => {
        Kitten.findOne().then(function(kitten) {
          console.log(kitten);
          response.status(200).send(JSON.stringify(kitten));
          Kitten.collection.drop();
        }).catch(function() {
          response.status(500).send("Internal Server Error");
        });
      });
    });
  });
});

export { testRouter };
