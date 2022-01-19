

module.exports = function restComment(app, db) {
    app.post("/rest/comment", (req, res) => {

        console.log(req.body.postId)
        console.log(req.body.userId)
        console.log(req.body.text)
        console.log("sesh ", sessionUser.id)

        if (!req.body.postId || !req.body.userId || !req.body.text || !sessionUser?.id) {
            res.sendStatus(403)
            return
        }
        db.get(/*sql*/ `INSERT INTO comment (postId, userId, text) VALUES (?,?,?)`, [req.body.postId, req.body.userId, req.body.text], (err, row) => {
            if (err) throw err
            else res.send(req.body)

        })
    });
}