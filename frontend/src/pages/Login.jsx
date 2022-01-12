import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

export const Login = () => {
  const { setCurrentUser } = useContext(UserContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  const [badCredentials, setBadCredentials] = useState(false);


  async function login(e) {
    e.preventDefault();

    const credentials = {
      username,
      password,
    };

    let res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    
    let user = await res.json();
    
    if (res.status == 401) {
      setBadCredentials(true);
    }
    else if (res.status == 200) {
      setCurrentUser(user);
    }
  }

  return (
    <>
      <h1>LOGIN</h1>

      <form className="mt-8 space-y-6" onSubmit={login}>
        <input type="hidden" name="remember" defaultValue="true" />
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <label htmlFor="username-address" className="sr-only">
              username
            </label>
            <input
              id="username-address"
              name="username"
              autoComplete="username"
              required
              className="appearance-none rounded-none font-myPtext text-xl relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-myGr-dark focus:border-myGr-dark focus:z-10 sm:text-sm"
              placeholder="username"
              onChange={(e) => {
                setUsername(e.target.value), setBadCredentials(false);
              }}
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
              onChange={(e) => {
                setPassword(e.target.value), setBadCredentials(false);
              }}
            />
          </div>
        </div>
        <div className="text-xs text-center">
          {badCredentials && (
            <div className="text-myRe -mt-2 mb-2 font-medium">
              {" "}
              Bad Credentials{" "}
            </div>
          )}
          <Link to="/register">
            Register Account
          </Link>
        </div>
        <div>
          <button className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-myGr-light focus:bg-myGr-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-myGr-dark">
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
            </span>
            Log in
          </button>
        </div>
      </form>
    </>
  );
};
