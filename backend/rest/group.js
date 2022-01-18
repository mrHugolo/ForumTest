const { json } = require("body-parser");

module.exports = function restGroup(app, db) {

  app.get("/rest/g/:groupName", (req, res) => {
    db.all(/*sql*/`SELECT [group].id AS id, name, description, userId, title, post.id AS postId, (
        SELECT COUNT(*) FROM [user], userXgroup WHERE user.id = userXgroup.userId AND userXgroup.groupId = (SELECT id FROM [group] WHERE name = ?)
        ) AS amount FROM [group], post WHERE groupId = (
        SELECT id FROM [group] WHERE name = ?
        ) AND name = ?`, [req.params.groupName, req.params.groupName, req.params.groupName], (err, rows) => {
      if (err) throw err
      if(rows.length) res.send({ response: rows })
      else {
        db.all(/* sql */`SELECT *, (SELECT COUNT(*) FROM userXgroup WHERE groupId = (SELECT id FROM [group] WHERE name = ?)) AS amount FROM [group] WHERE name = ?`, [req.params.groupName, req.params.groupName], (elseErr, elseRow) => {
          if(elseErr) throw elseErr
          if(!elseRow.length) res.send({response: {status: 404}})
          else res.send({response: elseRow})
        })
      }      
    })
  })

  app.get("/rest/groups", (req, res) => {
    db.all("SELECT * FROM [group]", [], (err, rows) => {
      if (err) throw err
      res.send({ response: rows })
    })
  })

  app.get("/rest/isJoined/:groupName", (req, res) => {
    db.get("SELECT id FROM [group] WHERE name = ?", [req.params.groupName], (err1, row1) => {
      if (err1) throw err1
      db.get("SELECT role FROM [userXgroup] WHERE userId = ? AND groupId = ?", [sessionUser.id, row1.id], (err2, row2) => {
        if (err2) throw err2
        res.send({ response: row2?.role })
      })
    })
  })

  app.get("/rest/members/:groupName", (req, res) => {
    db.get(`SELECT id FROM [group] WHERE name = ?`, [req.params.groupName], (err1, row1) => {
      if (err1) throw err1
      db.all(
        /*sql*/`SELECT username FROM user WHERE id IN (
        SELECT user.id FROM [user], userXgroup WHERE user.id = userXgroup.userId AND userXgroup.groupId = ?
        )`,
        [row1.id], (err2, rows2) => {
          if (err2) throw err2
          res.send({ response: rows2 })
        })
    })
  })

  app.get("/rest/posts/:groupName", (req, res) => {
    db.get("SELECT id FROM [group] WHERE name = ?", [req.params.groupName], (err1, row1) => {
      if (err1) throw err1
      db.all("SELECT id, title FROM [post] WHERE groupId = ?", [row1?.id], (err2, rows2) => {
        if (err2) throw err2
        res.send({ response: rows2 })
      })
    })
  })

  app.get("/rest/groupName/:postId", (req,res)=>{
    db.get(/* sql */`SELECT name from [group] WHERE id=(SELECT groupId FROM post WHERE id=?)`,[req.params.postId],(err,row)=>{
      if(err) throw err
      res.send({response: row})
    })

  })

  app.get("/rest/isGroupAdmin", (req, res)=> {
    db.get("SELECT groupId from userXgroup WHERE userId = ? AND role = 'GroupAdmin'", [sessionUser.id], (err, row) => {
      if(err) throw err
      res.send({response: row?.groupId})
    })
  })

  app.post("/rest/group", (req, res) => {
    if (!req.body.name || req.body.name.includes('ᴥ') || req.body.name == "Name not available" || !sessionUser?.id) {
      res.send({ response: false })
      return
    }
    db.get("SELECT id FROM [group] WHERE name = ?", [req.body.name], (err1, row1) => {
      if (err1) throw err1
      if (row1?.id) {
        res.send({ response: false })
        return
      }
      db.get("INSERT INTO [group] (name, description) VALUES (?,?)", [req.body.name, req.body.description], (err2, row2) => {
        if (err2) throw err2
        db.get("SELECT id FROM [group] WHERE name = ?", [req.body.name], (err3, row3) => {
          if (err3) throw err3
          db.get("INSERT INTO [userXgroup] (userId, groupId, role) VALUES (?,?,?)", [sessionUser.id, row3?.id, "GroupAdmin"], (err4, row4) => {
            if (err4) throw err4
            res.send({ response: true })
          })
        })
      })
    })
  });

  app.post("/rest/joinGroup", (req, res) => {
    if (!sessionUser.id) {
      res.send({ response: false })
      return
    }
    db.get("SELECT id FROM [group] WHERE name = ?", [req.body.name], (err1, row1) => {
      if (err1) throw err1
      if (row1 == undefined) {
        res.send({ response: false })
        return
      }
      db.get("SELECT role FROM [userXgroup] WHERE userId = ? AND groupID = ?", [sessionUser.id, row1.id], (err2, row2) => {
        if (err2) throw err2
        if (row2 != undefined) {
          res.send({ response: false, role: row2?.role })
          return
        }
        db.get("INSERT INTO [userXgroup] (userId, groupId, role) VALUES (?,?,?)", [sessionUser.id, row1.id, "Authorized"], (err3, row3) => {
          if (err3) throw err3
          res.send({ response: true })
        })
      })
    })
  })

  app.delete("/rest/leaveGroup", (req, res) => {
    db.get("SELECT id FROM [group] WHERE name = ?", [req.body.name], (err1, row1) => {
      if (err1) throw err1
      if (row1 == undefined) {
        res.send({ response: false })
        return
      }
      db.get("SELECT role FROM [userXgroup] WHERE userId = ? AND groupID = ?", [sessionUser.id, row1.id], (err2, row2) => {
        if (err2) throw err2
        if (row2 == undefined || row2?.role == "GroupAdmin") {
          res.send({ response: false, role: row2?.role })
          return
        }
        db.get("DELETE FROM [userXgroup] WHERE userId = ? AND groupId = ?", [sessionUser.id, row1.id], (err3, row3) => {
          if (err3) throw err3
          res.send({ response: true })
        })
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