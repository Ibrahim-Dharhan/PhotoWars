import path = require('path');
import async = require('async');
import { fakeUsers } from "./users";
import { User } from "../definitions/schemas/mongoose/user";
import { uploadFileToS3 } from '../definitions/s3';

/* Get constants.  */
import * as constants from '../definitions/constants';
import dotenv = require('dotenv');
import { moveImagesToPublic } from './loadDatabaseNew';
dotenv.config();
const IMAGE_DIR = process.env['IMAGE_DIR'] || constants._imageDir;

const generateUserData = async () => {
  try {
    await async.each(fakeUsers, async (user, callback) => {
      await User.create(user);
      if (process.env['IMAGE_DIR']) {
        await uploadFileToS3({
          path: path.join(IMAGE_DIR, user.filename),
          filename: user.filename
        });
        console.log(`Uploaded file ${user.filename} to Amazon S3.`);
      } else {
        const imagePath = 'development/images';
        await moveImagesToPublic(imagePath, user.filename);
      }
      callback();
    });
  } catch (err) {
    console.error(err);
  }
};

export { generateUserData };