'use strict';

import express = require('express');
import fs = require('fs');
import mongoose = require('mongoose');
import multer = require('multer');
import session = require('express-session');

import * as constants from './definitions/constants';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images');
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
    secret: 'CS194 Photo Wars',
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
  mongoose.connect('mongodb://127.0.0.1:27017/' + constants._mongoDatabaseName);

  if (!fs.existsSync(constants._imageDir)){
    fs.mkdirSync(constants._imageDir, { recursive: true });
  }

  app.listen(constants._portNum, function() {
    console.log('Listening at http://127.0.0.1:' + constants._portNum
                + ' exporting the directory ' + __dirname + '.');
  });
}
initServer();

export { upload };
