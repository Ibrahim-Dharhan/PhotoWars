"use strict"

import express = require('express');
import fs = require('fs');
import mongoose = require('mongoose');
import session = require('express-session');

import * as constants from './definitions/constants';

const app = express();
/* Allowing express to use middlewares. */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));
app.use(session({
  cookie: {},
  resave: false,
  saveUninitialized: false,
  secret: 'CS194 Photo Wars',
}));

import { accountRouter } from './endpoints/account/account';
app.use('/account', accountRouter);

import { imageRouter } from './endpoints/image/image';
app.use('/image', imageRouter);

import { commentRouter } from './endpoints/comment/comment';
app.use('/comment', commentRouter );

import { swaggerRouter } from './endpoints/swagger/swagger';
app.use('/swagger', swaggerRouter);

import { testRouter } from './endpoints/test/test';
app.use('/test', testRouter);

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
