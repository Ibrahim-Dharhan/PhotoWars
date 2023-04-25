"use strict"

import async from 'async';

const MONGODB_NAME = 'cs194';
import mongoose from 'mongoose';
mongoose.connect('mongodb://127.0.0.1:27017/' + MONGODB_NAME)
        .then(()=>console.log('Mongoose successfully connected to MongoDB.'));

const kittySchema = new mongoose.Schema({
  name: String
});

const Kitten = mongoose.model('Kitten', kittySchema);
Promise.all([Kitten.deleteMany({})]).then(function() {
  Kitten.create({
                    name: 'Silence'
                  }).then(function(kittyObj) {
                    kittyObj.save();
                  });

  const kittens = Kitten.find().then(function(kitten) { console.log(kitten) });
});

import express from 'express';
const app = express();

app.use(express.static(__dirname));

app.get('/', function(request: express.Request, response: express.Response) {
  response.send('Simple web server of files from ' + __dirname);
});

app.get('/test', function(request, response) {
  interface Collection {
    name: string;
    collection: any;
    count?: number;
  }
  let collections: Collection[] = [
      {name: 'kittens', collection: Kitten, count: 0}
  ];
  async.each(collections, function (col: any, done_callback: any) {
      col.collection.countDocuments({}).then(function (err: any, count: any) {
          col.count = count;
          done_callback(err);
      });
  }, function (err: any) {
      if (err) {
          response.status(500).send(JSON.stringify(err));
      } else {
          let obj: any;
          for (let i = 0; i < collections.length; i++) {
              obj[collections[i].name] = collections[i].count;
          }
          response.end(JSON.stringify(obj));

      }
  });
});

const PORT_NUM = 8080;
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
const server = app.listen(PORT_NUM, function() {
  console.log('Listening at http://127.0.0.1:' + PORT_NUM
              + ' exporting the directory ' + __dirname);
});
