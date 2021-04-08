import React from 'react';
import { FirebaseAuthConsumer } from "@react-firebase/auth";
import { Navbar, Nav, Icon } from 'rsuite';
import { ScrollTo } from "react-scroll-to";
import produce from 'immer';
import ChatArea from './ChatArea';
import OnlineUsers from './OnlineUsers';
import 'firebase/database';

const Chatroom = ( { usr, setUsr, logUserSignout, setUsersList, usersList, listOnlineUsers, updateDatabase, sendMessage, loadMessages, messagesDB, msg, setMsg, msgs, color } ) => {

  const show = (usr.showUsers)?'#0CCE6B':'#F06449';

  const styles = {
    chatRoom: {
      width: "100%",
      height: "100vh",
      overflow: "hidden"
    },
    userStatusUIbg: {
        margin: "4px 8px"
      },
      userStatusUI: {
        color: "white",
        margin: "0 8px",
        padding: "10px",
        borderRadius: '4px'
      },
      showUsersIcon: {
        color: show
      },
      chat: {
        width: "100%",
        height: "100%",
        display: "flex"
      }
  }

  return (
    <FirebaseAuthConsumer>
    {({ isSignedIn, firebase }) => {
      return (
        <div style={styles.chatRoom}>
          <Navbar>
            <Navbar.Header>
              <Nav>
                <Nav.Item
                  style={styles.showUsers}
                  icon={
                    <Icon 
                    style={styles.showUsersIcon} icon="user"/>
                    }
                  onSelect={()=>{
                    setUsr(p=>
                    produce(p,d=>{
                      d.showUsers =  !d.showUsers;
                      return d;
                    }));
                  }}>
                </Nav.Item>
              </Nav>
            </Navbar.Header>
            <Navbar.Body>
              <Nav pullRight>
                <Nav.Item icon={<Icon icon="sign-out" />}
                onSelect={()=>{
                    console.log(`${usr.displayName} Sign-out button clicked!`);

                    // if they signout, then update that user's status
                    updateDatabase(firebase.auth().currentUser, "r");
                    }}>
                    SignOut
                </Nav.Item>
              </Nav>
            </Navbar.Body>
          </Navbar>
          <div style={styles.chat}>
            {
              (usr.showUsers)&&
              (<OnlineUsers
            listOnlineUsers={listOnlineUsers}
            usersList={usersList}
            show={usr.showUsers}
            color={color}/>
            )}
            <ScrollTo>
              {({ scroll }) => (
                <ChatArea
                scroll={scroll}
                color={color}
                setUsr={setUsr}
                usr={usr}
                messagesDB={messagesDB}
                msg={msg}
                setMsg={setMsg}
                msgs={msgs}
                sendMessage={sendMessage}
                loadMessages={loadMessages}
                uid={usr.uID}/>
              )}
            </ScrollTo>
          </div>
        </div>
      );
    }}
    </FirebaseAuthConsumer>
  );
}

export default Chatroom;