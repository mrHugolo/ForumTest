import {useContext, useState } from "react";
import {Link } from "react-router-dom";
import {UserContext } from "../contexts/UserContext";

export const Navbar = () => {
  const { currentUser,setCurrentUser } = useContext(UserContext);
  const [dark, setDark]= useState(false)

  console.log("Current user atm: ",currentUser);



  const toggleTheme=()=>{
    setDark(prev=>!prev)
  }


  const logout=async()=>{
    await fetch('/api/logout',{
      method:'DELETE'
    })
    setCurrentUser('')
    console.log("logged oout from session")
    
  }



  return (
    <>
      <Link to="/">Home</Link>
      <button onClick={toggleTheme}>{dark ?"dark" : "light" } </button>
      <h1>Navbar</h1>
      <div>
        {currentUser ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </>
  );
};
