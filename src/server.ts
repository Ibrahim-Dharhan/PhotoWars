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
  const MONGODB_NAME = 'cs194';
  mongoose.connect('mongodb://127.0.0.1:27017/' + MONGODB_NAME);

  if (!fs.existsSync(constants.IMAGE_DIR)){
    fs.mkdirSync(constants.IMAGE_DIR, { recursive: true });
  }

  const PORT_NUM = 8080;
  app.listen(PORT_NUM, function() {
    console.log('Listening at http://127.0.0.1:' + PORT_NUM
                + ' exporting the directory ' + __dirname + '.');
  });
}
initServer();
