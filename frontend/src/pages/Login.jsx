import { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import css from "../styles/index.module.css";

export const Login = () => {
  const { setCurrentUser, currentUser } = useContext(UserContext);
  const [badCredentials, setBadCredentials] = useState(false);
  let history = useHistory();

  useEffect(() => {
    if (currentUser) history.goBack();
  }, [currentUser]);

  const gotoPage = () => {
    history.push("/register");
  };

  const credentials = { username: "", password: "" };
  const handleUsername = (e) => credentials.username = e.target.value;
  const handlePassword = (e) => credentials.password = e.target.value;

  async function login(e) { 
    e.preventDefault();
    let res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    let user = await res.json();

    if (res.status == 401) {
      setBadCredentials(true);
      document.getElementById("username").value=""
      document.getElementById("password").value ="";
      setTimeout(()=>setBadCredentials(false),3000)
    } else if (res.status == 200) {
      setCurrentUser(user);
    }
  }


  //all classes are from tailwind remove later
  return (
    <>
      <div className={css.container}>
        <div className={css.headLine}><h3>Login</h3><hr /></div>
        <br />

      <form className="" onSubmit={login}>
        <input type="hidden" name="remember" defaultValue="true" />
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            {/* <label htmlFor="username" className="sr-only"> username</label> */}
            <input
              id="username"
              name="username"
              autoComplete="username"
              required
              className=""
              placeholder="User name"
              onChange={handleUsername}
            />
          </div>
          <div>
            {/* <label tabIndex="2" htmlFor="password" className="sr-only"> Password</label> */}
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className=""
              placeholder="Password"
              onChange={handlePassword}
            />
          </div>
        </div>
        <div className="">
          {badCredentials && (
            <div style={{color:"red"}}>
              Bad Credentials{" "}
            </div>
          )}
        </div>
        <div>
          <button className={css.submitBtn}>
            <span className=""></span>
            Log in
          </button>
          </div>
          <br />
          <div className={css.footer} onClick={gotoPage}>No account? Create one.</div>
        </form>
      </div>
    </>
  );
};
