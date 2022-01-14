module.exports = function restProfile(app, db) {

  app.get("/rest/profile/:userName", (req, res) => {
    //add timestamp after postId
    db.all(`SELECT username, user.description, text, postId, (
              SELECT group_concat(name, 'ᴥ') FROM [group] WHERE id IN (
                SELECT groupId FROM userXgroup WHERE userId = (SELECT id FROM user WHERE username = ?)
              )
            ) AS names FROM  user, comment WHERE username = ? AND comment.userId = (SELECT id FROM user WHERE username = ?)`,
      [req.params.userName, req.params.userName, req.params.userName], (err, rows) => {
        if(err) throw err
        res.send({response: rows})
      })
  })
}