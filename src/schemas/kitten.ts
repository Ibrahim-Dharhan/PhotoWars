"use strict"

import mongoose from 'mongoose';

/**
 * @openapi
 * components:
 *   schemas:
 *     Kitten:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 */
const kittenSchema = new mongoose.Schema({
  name: String
});

const Kitten = mongoose.model('Kitten', kittenSchema);

export { Kitten };
