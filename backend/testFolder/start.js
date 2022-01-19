let restTest=require('../rest/test')
let restGroup = require('../rest/group')
let restProfile = require('../rest/profile')
let restPost = require('../rest/post')
let restComment = require('../rest/comment')

const sqlite3 = require("sqlite3").verbose();
var express = require("express");
var bp = require("body-parser")
var http = require("http");
const auth = require('../api/auth');

var app = express();
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
var server = http.createServer(app);

let db = new sqlite3.Database("../backend/forum.db", (err) => {
  if (err) {
    console.log(err.message);
  }
  console.log("Connected to forum database");
});

restTest(app,db)
restGroup(app, db)
restProfile(app, db)
restPost(app,db)
restComment(app,db)
auth(app,db)


server.listen(4000, function () {
  console.log("server is listening on port: 4000");
});


