import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();


export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState("");

  const fetchCurrentUser = async () => {
    let res = await fetch("/api/whoami");
    try {
      let user = await res.json();
      if (user) {
        setCurrentUser(user);
      }
    } catch (e) {
      console.log("No User yet", e);
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
