import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Group } from "./pages/Group";
import { Home } from "./pages/home";
import { Login } from "./pages/Login";
import { Page404 } from "./pages/Page404";
import { Post } from "./pages/Post";
import { Profile } from "./pages/Profile";

function App() {



  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/:userName" component={Profile} />
          <Route exact path="/g/:groupName" component={Group} />
          <Route exact path="/g/:groupName/p/:postId" component={Post} />
          <Route path="*" component={Page404} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
