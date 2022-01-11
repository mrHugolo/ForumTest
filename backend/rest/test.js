function restTest(app, db) {
  app.get("/rest/test/:id", (req, res) => {
    let sql = /*sql*/ `SELECT * FROM Test WHERE id = ?`;
    exec(sql, req.params.id, res);
  });

  function exec(sql, params, res) {
    db.all(sql, params, (err, rows) => {
      if (err) {
        throw err;
      }
      res.send(rows);
    });
  }
}

module.exports = restTest;
