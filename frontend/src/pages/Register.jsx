import { useState,useContext,useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ModalText } from "../components/modalText";
import { UserContext } from "../contexts/UserContext";
import css from "../styles/index.module.css";

export const Register = () => {
  const {currentUser } = useContext(UserContext);
  const [badCred, setBadCred] = useState(false);
  const [userAgreement, setUserAgreement] = useState(false);
  const [isRead, setIsRead] = useState(false);



    useEffect(() => {
      if (currentUser.username) history.push('/');
    }, []);


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
    if(!isRead) return
    if (!noMatch()) {
      let u = userData;
      let newUser = {
        username: u.userName.trim(),
        email: u.email.trim(),
        password: u.pass2.trim(),
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
          <form id="register-form" onSubmit={handleFormSubmit}>
            {/* <div>Register new account</div> */}
            <div>
              {/* <label>Username </label> */}
              <input
                type="username"
                placeholder="Username (max 20 char)"
                onChange={(e) => {
                  setUserData((prev) => ({ ...prev, userName: e.target.value })),
                    setBadCred(false);
                }}
                pattern="[A-Za-z0-9]{1,20}"
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
          </form>
            <div>
              {isRead ? <button form="register-form" className={css.submitBtn} type="submit">create account</button>:<button disabled>Create account</button>}
              <button className={css.submitBtn} onClick={()=>setUserAgreement(p=>!p)}>Read and accept the agreement</button>

            </div>
          </div>
        </div>
        {userAgreement && <ModalText showModal={setUserAgreement} isRead={setIsRead} />}

        {/* <div className={css.footer}>No account? Create one</div> */}
       </div> 
    </>
  );
};
