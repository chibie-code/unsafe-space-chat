import React, { useEffect, useState } from 'react';
import { FirebaseAuthConsumer } from "@react-firebase/auth";
import { Navbar, Nav, Icon, Badge } from 'rsuite';
import produce from 'immer';
import ChatArea from './ChatArea';
import OnlineUsers from './OnlineUsers';
import 'firebase/database';

const Chatroom = ( { setTarget, usr, setUsr, logUserSignout, setUsersList, usersList, listOnlineUsers, updateDatabase, sendMessage, loadMessages, messagesDB, msg, setMsg, msgs, color, scrollAreaRef } ) => {

  const [ numUsers, setNumUsers ] = useState((usersList.length));

  const show = (usr.showUsers)?'#0CCE6B':'#F06449';

  const styles = {
    chatRoom: {
      width: "100%",
      height: "100vh",
      overflow: "hidden"
    },
    nav: {
      position: "sticky",
      width: "100%"
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

  useEffect(()=>{
    setNumUsers(p=>
    produce(p, d=>{
      d=usersList.length;
      return d;
    }));
  },[ usersList.length ]);

  return (
    <FirebaseAuthConsumer>
    {({ isSignedIn, firebase }) => {
      return (
        <div style={styles.chatRoom}>
          <Navbar style={styles.nav}>
            <Navbar.Header>
              <Nav>
                <Nav.Item style={styles.showUsers}
                  icon={
                    <Badge 
                    content={(!usr.showUsers)&&((numUsers === 2)?1:
                      (numUsers > 2)?(numUsers - 1):false)}
                    style={styles.badge}>
                      <Icon style={styles.showUsersIcon} icon="user"/>
                    </Badge>
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
            color={color}
            usr={usr}/>
            )}

            <ChatArea
            setTarget={setTarget}
            color={color}
            setUsr={setUsr}
            usr={usr}
            messagesDB={messagesDB}
            msg={msg}
            setMsg={setMsg}
            msgs={msgs}
            sendMessage={sendMessage}
            loadMessages={loadMessages}/>
          </div>
        </div>
      );
    }}
    </FirebaseAuthConsumer>
  );
}

export default Chatroom;