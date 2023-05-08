'use strict';

import express = require('express');
import session = require('express-session');
import mongoose = require('mongoose');
import multer = require('multer');

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

import { swaggerRouter } from './endpoints/swagger/swagger';
app.use('/swagger', swaggerRouter);

import { testRouter } from './endpoints/test/test';
app.use('/test', testRouter);

import { battleRouter } from './endpoints/battle/battle';
app.use('/battle', battleRouter);

/*
 * Not called on because index.html is served instead, as expected.
app.get('/', function(request: express.Request, response: express.Response) {
  response.send('Simple web server of files from ' + __dirname);
});
*/

async function initServer() {
  const MONGODB_NAME = 'cs194';
  await mongoose.connect('mongodb://127.0.0.1:27017/' + MONGODB_NAME);
  console.log('Mongoose successfully connected to MongoDB.');

  const PORT_NUM = 8080;
  app.listen(PORT_NUM, function () {
    console.log(
      'Listening at http://127.0.0.1:' +
        PORT_NUM +
        ' exporting the directory ' +
        __dirname +
        '.'
    );
  });
}
initServer();

export { upload };
