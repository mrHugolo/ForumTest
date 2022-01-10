let restTest=require('../rest/test')

const sqlite3 = require("sqlite3").verbose();
var express = require("express");
var http = require("http");

var app = express();
var server = http.createServer(app);

let db = new sqlite3.Database("../backend/forum.db", (err) => {
  if (err) {
    console.log(err.message);
  }
  console.log("Connected to forum database");
});

restTest(app,db)



server.listen(4000, function () {
  console.log("server is listening on port: 4000");
});


