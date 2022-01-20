

module.exports = function restComment(app, db) {
    app.post("/rest/comment", (req, res) => {

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