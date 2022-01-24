import { useState } from "react";
import { useHistory } from "react-router-dom";
import css from "../styles/index.module.css";

export const Register = () => {
  const [badCred, setBadCred] = useState(false);
  const [userData, setUserData] = useState({
    userName: "",
    email: "",
    pass1: "",
    pass2: "",
    isBanned: false,
    desc: "Write someting about yourself",
  });

  const history = useHistory();

  const noMatch = () => {
    return (
      !userData.pass2 || !userData.pass1 || userData.pass1 !== userData.pass2
    );
  };
  const noMatch2 = () => {
    return userData.pass2.length > 1 && noMatch();
  };

  const handleEmail = (e) => {
    setUserData((prev) => ({ ...prev, email: e.target.value }));
    setBadCred(false);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!noMatch()) {
      let u = userData;
      let newUser = {
        username: u.userName,
        email: u.email,
        password: u.pass2,
        isBanned: u.isBanned,
        description: u.desc,
      };

      try {
        await fetch("/api/register", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(newUser),
        });
        history.push("/login");
      } catch (error) {
        console.log("probably usernamealready taken is already taken", error);
        setBadCred(true);
      }
    }
  };

  return (
    <>
      <div className={css.container}>
        <div className={css.headLine}><h3>Create account</h3><hr />
        </div>
          <div className={css.formContainer}>
        <div className={css.regform}>
          <form onSubmit={handleFormSubmit}>
            {/* <div>Register new account</div> */}
            <div>
              {/* <label>Username </label> */}
              <input
                type="username"
                placeholder="Username"
                onChange={(e) => {
                  setUserData((prev) => ({ ...prev, userName: e.target.value })),
                    setBadCred(false);
                }}
                required
              ></input>
            </div>
            <div>
              {/* <label>Email </label> */}
              <input
                type="email"
                placeholder="Email address"
                onChange={handleEmail}
                required
              ></input>
            </div>
            <div>
              {/* <label>Password </label> */}
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => {
                  setUserData((prev) => ({ ...prev, pass1: e.target.value }));
                }}
                required
              ></input>
            </div>
            <div>
              {/* <label>Confirm Password </label> */}
              <input
                type="password"
                placeholder="Confirm Password"
                onChange={(e) => {
                  setUserData((prev) => ({ ...prev, pass2: e.target.value }));
                }}
                required
              ></input>
              {
                //Temp css
                noMatch2() ? (
                  <div style={{ color: "red", textAlign: "center" }}>
                    Passwords don't match
                  </div>
                ) : (
                  <div style={{ color: "transparent" }}>""</div>
                )
              }
              {
                //Temp css
                badCred && ( <div style={{ textAlign: "center", color: "red" }}>Choose a different username</div> )
              }
            </div>

            <div>
              <button className={css.submitBtn} type="submit">Finish</button>
              </div>
            </form>
          </div>
        </div>
        {/* <div className={css.footer}>No account? Create one</div> */}
       </div> 
    </>
  );
};
