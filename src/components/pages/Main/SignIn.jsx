import React from 'react';
// import produce from 'immer';
// import { Toast, ToastBody, ToastHeader } from 'reactstrap';
// import * as ROUTES from '../routes';
// import { Link } from 'react-router-dom';
import Chatroom from '../Chat';

const SignIn = ({ isSignedIn, firebase, usr, updateDatabase, setUsr, logUserSignout, usersList, messagesDB, msg, setMsg, msgs, listOnlineUsers, sendMessage, loadMessages, setColor, color }) => {

  const show = (isSignedIn)?"flex":"none";

  const styles = {
    chatRoomComponent: {
      height: "100vh",
      width: "100vw",
      display: show,
      flexDirection: "column",
      justifyContent: "center",
    }
  }
  
  return(
    <div style={styles.chatRoomComponent}>
      <Chatroom
      isSignedIn={isSignedIn}
      firebase={firebase}
      usr={usr}
      setUsr={setUsr}
      usersList={usersList}
      listOnlineUsers={listOnlineUsers}
      sendMessage={sendMessage}
      loadMessages={loadMessages}
      messagesDB={messagesDB}
      updateDatabase={updateDatabase}
      color={color}
      msg={msg}
      setMsg={setMsg}
      msgs={msgs}
      logUserSignout={logUserSignout}/>
    </div>
  );
}
export default SignIn;