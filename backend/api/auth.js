const crypto = require("crypto");
let session = require("express-session");

module.exports = (app, db) => {
  const salt = "sweetSalt".toString("hex");

  app.use(
    session({
      secret: "5ecre754l7",
      resave: false,
      saveUninitialized: true,
      cookie: { secure: false },
    })
  );

  function getHash(password) {
    let hash = crypto
      .pbkdf2Sync(password, salt, 1000, 64, `sha512`)
      .toString(`hex`);

    return hash;
  }

  app.post("/api/register", async (req, res) => {
    let user = req.body;

    let checkEmail = /*sql*/ `SELECT email,username FROM user WHERE email=? OR username =?`;
    db.all(checkEmail, [user.email, user.username], (err, rows) => {
      if (err) throw err;
      else if (rows.length > 0)
        res.send(
          (rows[0].email == user.email ? "email" : "username") +
            " already in use"
        );
      else {
        let hash = getHash(user.password);
        try {
          db.all(
            /*sql*/ `INSERT INTO user (username,email,password) VALUES(?,?,?)`,
            [user.username, user.email, hash]
          );
          //res.status(200); // unauthorized
          res.send("user created");
        } catch (e) {
          console.error("error", e);
        }
      }
    });
  });

  app.post("/api/login", async (req, res) => {
    if (req.session.user !== undefined && req.session.user) {
      res.send(req.session.user.username + " already logged in session");
      return;
    }

    let hash = getHash(req.body.password);

    let user = /*sql*/ `SELECT * FROM user WHERE email = ? AND password = ?`;
    await db.get(user, [req.body.email, hash], (err, rows) => {
      if (err) throw err;
      else if (rows) {
        console.log(rows);
        req.session.user = rows;
        delete rows.password
        res.send(rows);
      } else {
        console.log(rows);
        res.status(401); // unauthorized
        res.send("bad credentials");
      }
    });
  });
};
