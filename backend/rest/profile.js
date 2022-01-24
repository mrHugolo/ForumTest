module.exports = function restProfile(app, db) {

  app.get("/rest/profile/:userName", (req, res) => {
    if(!sessionUser.id){
      res.send({response:false})
      return
    }
    
    if (sessionUser.username ==req.params.userName){
      //add timestamp after postId
            db.all(/* sql */`SELECT username, user.description, text,timestamp, postId, (
              SELECT group_concat(name, 'ᴥ') FROM [group] WHERE id IN (
                SELECT groupId FROM userXgroup WHERE userId = (SELECT id FROM user WHERE username = ?)
                )
                ) AS names FROM  user, comment WHERE username = ? AND comment.userId = (SELECT id FROM user WHERE username = ?)`,
          [req.params.userName, req.params.userName, req.params.userName], (err, rows) => {
            if (err) throw err
            if (rows.length){
              res.send({ response : rows })
            } else{
              db.all(/* sql */`SELECT username, user.description, (
                      SELECT group_concat(name, 'ᴥ') FROM [group] WHERE id IN (
                          SELECT groupId FROM userXgroup WHERE userId = (SELECT id FROM user WHERE username = ?)
                        )
                      ) AS names FROM  user WHERE username = ?`,
                   [req.params.userName, req.params.userName], (altErr, altRow) => {
                        if (altErr) throw altErr;
                          else if (!altRow.length) res.sendStatus(404);
                          else res.send({ response: altRow })
                        })
                     
                  }
            })
    }
  })

  //temp fix
  app.get("/rest/profile/comment/:postId",(req,res)=>{
     if(!sessionUser.id){
      res.send({response:false})
      return
    }
    db.all(/* sql */`SELECT title from post where id = ?`,
          [req.params.postId], (err, rows) => {
            if (err) throw err
            else if (!rows.length) res.sendStatus(404)
            else res.send({ response : rows })
            }
          )
  })



  app.patch("/rest/editDescription", (req, res) => {
    db.get(/* sql */`UPDATE [user] SET description = ? WHERE username = ?`, [req.body.description, sessionUser.username], (err, row) => {
      if (err) throw err
      res.send({ response: { status: 200 } })
    }) 
  })

  app.patch("/rest/deleteAccount", (req, res) => {
    db.all("UPDATE [comment] SET text = '[deleted]' WHERE userId = ?", [sessionUser.id], (err1, rows1) => {
      if(err1) throw err1
      db.all("UPDATE [user] SET username = '[deleted]', password = 'password', description = '', email = REPLACE((SELECT email FROM user WHERE id = ?), '@', '#') WHERE id = ?", [sessionUser.id, sessionUser.id], (err2, rows2) => {
        if(err2) throw err2
        db.all("UPDATE [userXgroup] SET role = 'Unauthorized' WHERE userId = ?", [sessionUser.id], (err3, rows3) => {
          if(err3) throw err3
          res.send({response: true})
        })
      })
    })
  })
}