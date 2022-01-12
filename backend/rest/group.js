const { json } = require("body-parser");

module.exports = function restGroup(app, db, bpJson) {
  
  app.post("/rest/group", bpJson , (req, res) => {
    db.get("SELECT id FROM [group] WHERE name = ?", [req.body.name], (err1,row1) => {
      if(err1) throw err1
      if(row1?.id) {
        res.send({response : false}) 
        return
      }
      db.get("INSERT INTO [group] (name, description) VALUES (?,?)", [req.body.name, req.body.description], (err2, row2) => {
        if(err2) throw err2
        db.get("SELECT id FROM [group] WHERE name = ?", [req.body.name], (err3, row3) => {
          if (err3) throw err3
          db.get("INSERT INTO [userXgroup] (userId, groupId, role) VALUES (?,?,?)", [1, row3?.id, "GroupAdmin"], (err4, row4) => {
            if (err4) throw err4
            res.send({response : true})
          })
          //TODO: switch userId = 1 to currentUser or bring it in req.body
        })
      })
    })
  });

  app.post("/rest/joinGroup", bpJson, (req,res)=> {
    db.get("SELECT id FROM [group] WHERE name = ?", [req.body.name], (err1, row1) => {
      if(err1) throw err1
      db.get("INSERT INTO [userXgroup] (userId, groupId, role) VALUES (?,?,?)", [req.body.userId, row1.id, "Authorized"], (err2,row2) => {
        if(err2) throw err2
      })
    })
  }) 
  
  function exec(sql, params, res) {
    db.all(sql, params, (err, rows) => {
      if (err) {
        throw err
      }
      res.send(rows)
    });
  }
}