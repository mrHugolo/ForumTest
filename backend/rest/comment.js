

module.exports = function restComment(app, db) {
    app.post("/rest/comment", (req, res) => {
        if (!req.body.postId || !req.body.userId || !req.body.text || !sessionUser?.id) {
            res.sendStatus(403)
            return
        }

        const timestamp = new Date().getTime()
        db.get(/*sql*/ `INSERT INTO comment (postId, userId, text,timestamp) VALUES (?,?,?,?)`, [req.body.postId, req.body.userId, req.body.text, timestamp], (err, row) => {
            if (err) throw err
            else res.send(req.body)
        })
    });

    app.patch("/rest/delComment", (req, res) => {
        db.all(/*sql*/ `UPDATE comment SET text = '-- Deleted --', userId = 999 WHERE id = ?`, [req.body.commentId], (err1, rows) => {
            if (err1) throw err1
            else if (!rows) res.sendStatus(404)
            else res.send({ response: 200 })
        })
    })

    app.patch("/rest/editComment", (req, res) => {
        db.all(/*sql*/ `UPDATE comment SET text = ? WHERE id = ?`, [req.body.text, req.body.id], (err1, rows) => {
            if (err1) throw err1
            else if (!rows) res.sendStatus(404)
            else res.send({ response: { status: 200 } })
        })
    })
}