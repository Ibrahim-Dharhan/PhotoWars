"use strict"

import mongoose from 'mongoose';

/**
 * @openapi
 * components:
 *   schemas:
 *     Kitten:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         __v:
 *           type: integer
 */
const kittenSchema = new mongoose.Schema({
  name: String
});

const Kitten = mongoose.model('Kitten', kittenSchema);

export { Kitten };
