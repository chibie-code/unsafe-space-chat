import React, { useState, useCallback } from 'react';
import Home from './Home';
import { FirebaseAuthConsumer } from "@react-firebase/auth";
import produce from 'immer';
import firebase from "firebase/app";
import 'firebase/database';
// import { Alert } from 'rsuite';
 
const MainPage = () => {

  const [ usr, setUsr ] = useState({
    uID: "",
    displayName: "",
    flatName: "",
    status: false,
    showUsers: true,
    color: ""
  });
  const [ usersList, setUsersList ] = useState([]);

  const usersDB = firebase.database().ref('users');

  const [ msgs, setMsgs ] = useState([]);
  const [ msg, setMsg ] = useState("");
  const [ color, setColor ] = useState("");
  const messagesDB = firebase.database().ref('messages');
  // const chatroomPage = (isSignedIn) => (isSignedIn)?"none":"flex";

  const styles = {
    parentContainer: {
      minHeight: "100vh",
      width: "100vw",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }
  }

  const sendMessage = useCallback(() => {    

    messagesDB
    .push()
    .set({
        id: firebase.auth().currentUser.uid,
        user: usr.displayName,
        timestamp: firebase.database.ServerValue.TIMESTAMP,
        message: msg
      })
    .then(() => {
      console.log("Successfully sent message!");
    })
    .catch((error) => {
      console.error('Error sending message to database', error);
      });
  },[msg, messagesDB, usr.displayName]);

  const updateMessagesCount = (type) => {

    if(type === "a"){

      firebase
      .database()
      .ref("messages_count/count")
      .once("value", snap=>{
        // console.log("count before:",snap.val());
        const new_count = snap.val() + 1;
        
        firebase
        .database()
        .ref("messages_count/count")
        .set(new_count)
        .then(()=>{
          // console.log("count after:",new_count);
        })
        .catch(err=>{
          console.error("Error:",err.message);
        });
      });
      return;
    }
    else if(type === "r"){
      firebase
      .database()
      .ref("messages_count/count")
      .once("value", snap=>{
        // console.log("count before:",snap.val());
        const new_count = snap.val() - 1;
        
        firebase
        .database()
        .ref("messages_count/count")
        .set(new_count)
        .then(()=>{
          // console.log("count after:",new_count);
        })
        .catch(err=>{
          console.error("Error:",err.message);
        });
      });
      return;
    }
    else{
      return;
    }
  }
  
  const loadMessages = useCallback(() => {
    // function to load all the messages in a list

    // to show the messages onLoad
    messagesDB
    .limitToLast(7)
    .on("value", snap => {
      if (snap.exists()){
            
        messagesDB
        .once("child_added", snapshot_=>{
          updateMessagesCount("a");

          const snap_ = snap.val();

          const messagesArr = Object.values(snap_).map(m=>(
            {
              name: m.user,
              message: m.message,
              uid: m.id
            }
          ));

          setMsgs(p=>
            produce(p,d=>messagesArr));

            return;
        });

        messagesDB
        .once("child_removed", snapshot_=>{
          updateMessagesCount("r");

          const snap_ = snap.val();

          const messagesArr = Object.values(snap_).map(m=>(
            {
              name: m.user,
              message: m.message,
              uid: m.id
            }
          ));

          setMsgs(p=>
            produce(p,d=>messagesArr));
            return;
        });
      }
    });
  },[ messagesDB ]);

  const listOnlineUsers = useCallback(() => {
      console.log("listOnlineUsers run...");

      usersDB
      .on("value", snapshot=>{

        if (snapshot.exists()){

          const snap_ = snapshot.val();

          // console.log("snap2: ",Object.values(snap_));

          const usersArr = Object.values(snap_).map(u=>(
            {
            name: u.displayName,
            color: u.color
            }
          ));

          console.log("usersArr:",usersArr);

          setUsersList(p=>
            produce(p,d=>{
              d = usersArr;
              return d;
            }));
        }
      });
    },[ usersDB ]);
    
  const updateDatabase = (user, type) => {

    loadMessages();

    if(type === "a"){
      usersDB
      .child(firebase.auth().currentUser.uid)
      .once("value", snap=>{
        usersDB
        .child(firebase.auth().currentUser.uid)
        .set({
          uid: usr.uID,
          displayName: usr.displayName,
          name: usr.flatName,
          timestampStart: firebase.database.ServerValue.TIMESTAMP,
          color: usr.color
          }).then(function() {
            console.log("Successfully added new anon user to database!");
          }).catch(function(error) {
            console.error('Error adding new user to database', error);
          });
      });
      }
    else{
      logUserSignout(firebase.database().ref(`users/${user.uid}`));
    }
    
      console.log(`UID: ${(user.uid)?(user.uid):("no UID")}!`);
      console.log(`status: ${!!firebase.auth().currentUser}!`);
    }

    const logUserSignout = (path) => {
      // firebase
      // .database()
      // .ref(`users/${firebase.auth().currentUser.uid}`)

      path
      .remove()
      .then(()=>{
        console.log("%cREMOVED!!!","color: yellow");

        firebase.auth().signOut()
        .then(() => {
          
          }).catch((error) => {
            // An error happened.
            });
      })
      .catch(err=>{
        console.error("Error, couldn't delete user from database:",err.message);
      });
    }

  return (
    <FirebaseAuthConsumer>
    {({ isSignedIn, firebase }) => {
      
      return (
        <div style={styles.parentContainer}>
          <Home
          isSignedIn={isSignedIn}
          updateDatabase={updateDatabase}
          listOnlineUsers={listOnlineUsers}
          usersList={usersList}
          sendMessage={sendMessage}
          loadMessages={loadMessages}
          logUserSignout={logUserSignout}
          messagesDB={messagesDB}
          msg={msg}
          setMsg={setMsg}
          msgs={msgs}
          styles={styles}
          setUsr={setUsr}
          usr={usr}
          setColor={setColor}
          color={color}/>
        </div>
      );
    }}
  </FirebaseAuthConsumer>
  )
}
 
export default MainPage;
