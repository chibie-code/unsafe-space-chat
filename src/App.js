import React from 'react';
import './App.css';
 
import MainPage from './components/pages/Main';
import { ScrollTo } from "react-scroll-to";
// import Chatroom from './components/pages/Chat';
// import Error from './components/pages/ErrorPage';

// import * as ROUTES from './components/pages/routes';

function App(isSignedIn, firebase) {

  
  return (
    <ScrollTo>
    {({ scroll }) => (
      <MainPage scroll={scroll}/>
      )}
    </ScrollTo>
  );
}

export default App;
