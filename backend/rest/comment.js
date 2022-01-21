

module.exports = function restComment(app, db) {
    app.post("/rest/comment", (req, res) => {
        if (!req.body.postId || !req.body.userId || !req.body.text || !sessionUser?.id) {
            res.sendStatus(403)
            return
        }

        const timestamp=new Date().toLocaleString()
        db.get(/*sql*/ `INSERT INTO comment (postId, userId, text,timestamp) VALUES (?,?,?,?)`, [req.body.postId, req.body.userId, req.body.text,timestamp], (err, row) => {
            if (err) throw err
            else res.send(req.body)

        })
    });
}