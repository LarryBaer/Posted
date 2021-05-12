import React, { useContext } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AuthContext from "./context/AuthContext";

// Import pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

function Router() {
  const { loggedIn } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Switch>
        {loggedIn === false && (
          <>
            <Route path="/login" exact component={Login}></Route>
            <Route path="/signup" exact component={SignUp}></Route>
            <Route path="/" exact component={Login}></Route>
          </>
        )}
        {loggedIn === true && (
          <>
            <Route path="/home" exact component={Home}></Route>
            <Route path="/" exact component={Home}></Route>
          </>
        )}
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
