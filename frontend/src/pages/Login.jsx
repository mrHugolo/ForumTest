import { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

export const Login = () => {
  const { setCurrentUser, currentUser } = useContext(UserContext);
  const [badCredentials, setBadCredentials] = useState(false);
  let history = useHistory();

  useEffect(() => {
    if (currentUser) history.push("/");
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
      <h1>LOGIN</h1>

      <form className="mt-8 space-y-6" onSubmit={login}>
        <input type="hidden" name="remember" defaultValue="true" />
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <label htmlFor="username" className="sr-only">
              username
            </label>
            <input
              id="username"
              name="username"
              autoComplete="username"
              required
              className="appearance-none rounded-none font-myPtext text-xl relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-myGr-dark focus:border-myGr-dark focus:z-10 sm:text-sm"
              placeholder="username"
              onChange={handleUsername}
            />
          </div>
          <div>
            <label tabIndex="2" htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="appearance-none rounded-none font-myPtext text-xl relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-myGr-dark focus:border-myGr-dark focus:z-10 sm:text-sm"
              placeholder="Password"
              onChange={handlePassword}
            />
          </div>
        </div>
        <div className="text-xs text-center">
          {badCredentials && (
            <div style={{color:"red"}}>
              Bad Credentials{" "}
            </div>
          )}
          <h5 onClick={gotoPage}>Create account</h5>
        </div>
        <div>
          <button className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-myGr-light focus:bg-myGr-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-myGr-dark">
            <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
            Log in
          </button>
        </div>
      </form>
    </>
  );
};
