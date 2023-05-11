'use strict';

import express = require('express');
import fs = require('fs');
import mongoose = require('mongoose');
import multer = require('multer');
import session = require('express-session');

import * as constants from './definitions/constants';

const IMAGE_DIR = process.env.IMAGE_DIR || constants._imageDir;
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, IMAGE_DIR);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

const app = express();
/* Allowing express to use middlewares. */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));
app.use(
  session({
    cookie: {},
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSIONSECRET || constants._sessionSecret,
  })
);

import { accountRouter } from './endpoints/account/account';
app.use('/account', accountRouter);

import { battleRouter } from './endpoints/battle/battle';
app.use('/battle', battleRouter);

import { imageRouter } from './endpoints/image/image';
app.use('/image', imageRouter);

import { commentRouter } from './endpoints/comment/comment';
app.use('/comment', commentRouter );

import { swaggerRouter } from './endpoints/swagger/swagger';
app.use('/swagger', swaggerRouter);

import { testRouter } from './endpoints/test/test';
app.use('/test', testRouter);

import { userRouter } from './endpoints/user/user';
app.use('/user', userRouter);

/*
 * Not called on because index.html is served instead, as expected.
app.get('/', function(request: express.Request, response: express.Response) {
  response.send('Simple web server of files from ' + __dirname);
});
*/

async function initServer() {
  const MONGODB_URI = process.env.MONGODB_URL
                      || 'mongodb://127.0.0.1:27017/'
                         + constants._mongoDatabaseName;
  mongoose.connect(MONGODB_URI);

  if (!fs.existsSync(IMAGE_DIR)){
    fs.mkdirSync(IMAGE_DIR, { recursive: true });
  }

  const PORT = process.env.PORT || constants._portNum;
  app.listen(PORT, function() {
    console.log('Listening at http://127.0.0.1:' + PORT
                + ' exporting the directory ' + __dirname + '.');
  });
}
initServer();

export { upload };
