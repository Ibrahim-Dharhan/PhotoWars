"use strict"

require('dotenv').config();
import fs = require('fs');
import path = require('path');
import * as constants from './constants';
const IMAGE_DIR = process.env.IMAGE_DIR || constants._imageDir;
import AWS = require('aws-sdk');
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID || null;
const AWS_REGION = process.env.AWS_REGION || null;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY || null;
const AWS_BUCKET_NAME = process.env.BUCKET_NAME || null;

const s3 = new AWS.S3({
  region: AWS_REGION,
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY
});

/* Upload file to S3 instance.  */
const uploadFileToS3 = (file) => {
  const fileStream = fs.createReadStream(file.path);
  const uploadParams = {
    Bucket: AWS_BUCKET_NAME,
    Body: fileStream,
    Key: path.join(IMAGE_DIR, file.filename),
  };
  return s3.upload(uploadParams).promise();
};

export { AWS_BUCKET_NAME, uploadFileToS3 };
