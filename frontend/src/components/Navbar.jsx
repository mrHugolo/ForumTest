import { useContext, useMemo } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import css from "../styles/index.module.css";

export const Navbar = ({ changeTheme, dark }) => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const history = useHistory();


  //for dev purpose, remove when done
  const memoUserlog = useMemo(() => {
    console.log("Current user atm: ", currentUser);
  }, [currentUser]);
  memoUserlog;

  const toggleTheme = () => {
    changeTheme((prev) => !prev);
  };

  const logout = async () => {
    await fetch("/api/logout", {
      method: "DELETE",
    });
    setCurrentUser("");
    console.log("logged oout from session");
  };

  const goToPage = (e) => {
    if (history.location.pathname == `${e.target.id}`) return; // Dont re-render if already on the same path
    history.push(`${e.target.id}`);
  };

  return (
    <div className={css.navbar}>
      <button onClick={toggleTheme}>{!dark ? "dark" : "light"} theme </button>
      <div className={css.loginCreateWrapper}>
        <h1 onClick={goToPage} id="/">Hidden Forum</h1>
        <h4 onClick={goToPage} id="/register">Create account</h4>
        {currentUser ? (
          <h4 onClick={logout}>Logout</h4>
        ) : (
          <h4 onClick={goToPage} id="/login">Login</h4>
        )}
      </div>
    </div>
  );
};
