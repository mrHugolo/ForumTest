import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();


export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState("");

  const fetchCurrentUser = async () => {
    let res = await fetch("/api/whoami", {
      method: "GET",
      headers: { "content-type": "application/json" },
    });
    //console.log("ok??",await res.json());
    try {
      let user = await res.json();
      if (user) {
        setCurrentUser(user);
      }
      else console.log("No user yet");
    } catch (e) {
      console.log("Error: ", e);
    }
  };





  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const values = {
    currentUser,
    setCurrentUser
  };

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};
