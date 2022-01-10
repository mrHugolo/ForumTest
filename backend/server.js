const sqlite3 = require('sqlite3').verbose();
var express = require('express');
var http = require('http');

var app = express();

let db = new sqlite3.Database('../backend/forum.db', (err) => {
  if(err) {
    console.log(err.message)
  }
  console.log('Connected to forum database')
})

app.get("/rest/test", (req, res) => {
  console.log('can you see me?')
  let sql = `SELECT * FROM Test`
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.send(rows)
  })
})
