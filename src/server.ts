"use strict"

import { Request, Response } from 'express';

let express = require('express');
let app = express();

app.use(express.static(__dirname));

app.get('/', function(request: Request, response: Response) {
  response.send('Simple web server of files from ' + __dirname);
});

let PORT_NUM = 8080;
let server = app.listen(PORT_NUM, function() {
  let port = server.address().port;
  console.log('Listening at http://localhost:' + port
              + ' exporting the directory ' + __dirname);
});
