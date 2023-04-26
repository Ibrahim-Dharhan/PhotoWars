"use strict"

import mongoose from 'mongoose';
import express = require('express');

const app = express();
app.use(express.static(__dirname));

import { apiDocsRouter } from './routes/api-docs/api-docs';
app.use('/api-docs', apiDocsRouter);

import { testRouter } from './routes/test/test';
app.use('/test', testRouter);

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
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  app.listen(PORT_NUM, function() {
    console.log('Listening at http://127.0.0.1:' + PORT_NUM
                + ' exporting the directory ' + __dirname + '.');
  });
};
initServer();
