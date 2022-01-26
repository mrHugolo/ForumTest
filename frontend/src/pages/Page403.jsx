import { useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import { useHistory } from "react-router-dom";



export const Page403 = () => {
  const{currentUser}=useContext(UserContext)
  let history=useHistory()
     useEffect(() => {
       if (currentUser.username) history.goBack();
     }, []);
  return (
    <>
      <h1>403 - Forbidden</h1>
    </>
  );
};
