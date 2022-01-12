import { useState } from "react";
import { useHistory } from "react-router-dom";

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
      <h1>Register</h1>

      <form onSubmit={handleFormSubmit}>
        <div>Register new account</div>
        <div>
          <label>Username </label>
          <input
            type="username"
            placeholder="Your username"
            onChange={(e) => {
              setUserData((prev) => ({ ...prev, userName: e.target.value })),
                setBadCred(false);
            }}
            required
          ></input>
        </div>
        <div>
          <label>Email </label>
          <input
            type="email"
            placeholder="Your email address"
            onChange={handleEmail}
            required
          ></input>
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            placeholder="Your Password"
            onChange={(e) => {
              setUserData((prev) => ({ ...prev, pass1: e.target.value }));
            }}
            required
          ></input>
        </div>
        <div>
          <label>Confirm Password</label>
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
            badCred && (
              <div style={{ textAlign: "center", color: "red" }}>
                Choose a different username
              </div>
            )
          }
        </div>

        <div className="flex justify-center items-center pb-8">
          <button type="submit">Create Account</button>
        </div>
        <div className="min-h-200">&nbsp;</div>
      </form>
    </>
  );
};
