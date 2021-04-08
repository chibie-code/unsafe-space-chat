import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
 
import MainPage from './components/pages/Main';
// import Chatroom from './components/pages/Chat';
import Error from './components/pages/ErrorPage';

import * as ROUTES from './components/pages/routes';

function App(isSignedIn, firebase) {

  
  return (
    <Router>
      <Switch>
        <Route exact path={ROUTES.HOME} component={MainPage} />
        <Route exact path={ROUTES.ERROR_PAGE} component={Error} />
        <Redirect to={ROUTES.ERROR_PAGE} />
      </Switch>
    </Router>
  );
}

export default App;
