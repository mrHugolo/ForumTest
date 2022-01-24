import { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Navbar } from "./components/Navbar";
import { Group } from "./pages/Group";
import { Home } from "./pages/home";
import { Login } from "./pages/Login";
import { Page404 } from "./pages/Page404";
import { Post } from "./pages/Post";
import { Profile } from "./pages/Profile";
import { Register } from "./pages/Register";
import { GroupMembers } from "./pages/GroupMembers";

import { UserProvider } from "./contexts/UserContext";

import css from "./styles/index.module.css";
import { Page403 } from "./pages/Page403";


function App() {
  const [dark, setDark] = useState(false)
  return (
    <div className={`${css.bodyApp} ${dark?css.dark:undefined}`}>
      <UserProvider>
        <Router>
          <Navbar changeTheme={setDark} dark={dark} />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/:userName" component={Profile} />
            <Route exact path="/g/:groupName" component={Group} />
            <Route exact path="/g/:groupName/members" component={GroupMembers} />
            <Route exact path="/g/:groupName/p/:postId" component={Post} />
            <Route path="/page/403" component={Page403} />
            <Route path="*" component={Page404} />
          </Switch>
        </Router>
      </UserProvider>
    </div>
  );
}

export default App;
