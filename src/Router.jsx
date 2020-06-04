import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Views/Home/Home";
import Login from "./Views/User/Login";
import Register from "./Views/User/Register";
import Checkers from "./Checkers/Checkers";
import CheckersRules from "./Checkers/CheckersRules";
import Profile from "./Views/User/Profile";
import Profile2 from "./Views/User/Profile2";
import Recover from "./Views/User/Recover";
import MailConfirmed from "./Views/User/MailConfirmed";

function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path='/' component={Home} exact />
        <Route path='/temporal' component={Profile2} exact />
        <Route path='/login' component={Login} exact />
        <Route path='/register' component={Register} exact />
        <Route path='/profile' component={Profile} exact />
        <Route path='/recover/:passToken' component={Recover} exact />
        <Route path='/checkers' component={Checkers} exact />
        <Route path='/checkers/rules' component={CheckersRules} exact />
        <Route path='/confirm/:passToken' component={MailConfirmed} exact />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
