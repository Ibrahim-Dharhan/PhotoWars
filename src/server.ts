"use strict"

import express from 'express';
const app = express();

app.use(express.static(__dirname));

app.get('/', function(request: express.Request, response: express.Response) {
  response.send('Simple web server of files from ' + __dirname);
});

const PORT_NUM = 8080;
const server = app.listen(PORT_NUM, function() {
  const port = server.address().port;
  console.log('Listening at http://localhost:' + port
              + ' exporting the directory ' + __dirname);
});
