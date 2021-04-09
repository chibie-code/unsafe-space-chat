import React, { useState, useCallback } from 'react';
import Home from './Home';
import { Notification } from 'rsuite';
import produce from 'immer';
import { FirebaseAuthConsumer } from "@react-firebase/auth";
import firebase from "firebase/app";
import 'firebase/database';


// import { Alert } from 'rsuite';
 
const MainPage = ({ scroll }) => {

  const [ usr, setUsr ] = useState({
    uID: "",
    displayName: "",
    flatName: "",
    status: false,
    showUsers: false,
    color: {
      primary: "",
      secondary: ""
    }
  });
  const [ usersList, setUsersList ] = useState([]);

  const usersDB = firebase.database().ref('users');

  const [ target, setTarget ] = useState(null);

  const [ msgs, setMsgs ] = useState([]);
  const [ msg, setMsg ] = useState("");
  const [ color, setColor ] = useState({
    primary: "",
    secondary: ""
  });
  const messagesDB = firebase.database().ref('messages'); 

  const styles = {
    parentContainer: {
      minHeight: "90vh",
      height: "100%",
      width: "100vw",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }
  }
  
  // Component to show notifications
  const open = ( userName ) => {
    //'☣️'
    Notification.open({
      title: (<i className="fas fa-radiation"></i>),
      duration: 3000,
      description: `😈${userName} is in the Unsafe Space`
    });
    return;
  }

  // function to send the messages to the database
  const sendMessage = useCallback(() => {    

    // const targetScrollVal = (target.scrollHeight - target.offsetHeight)*10000;

    // console.log("targetScrollVal:",targetScrollVal);

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
  
  // download the data for the messages sent to the database
  const loadMessages = useCallback(() =>{
    // function to load all the messages in a list
    // to show the messages onLoad

       /*
       
       Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
        */
    messagesDB
    .limitToLast(24)
    .on("value", snap => {
      if (snap.exists()){
            
        messagesDB
        .once("child_added", snapshot_=>{
          // updateMessagesCount("a");

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
            scroll({
              ref: target,
              x: 0,
              y: 8400000,
              smooth: true
              });
            return;
        });

        messagesDB
        .once("child_removed", snapshot_=>{
          // updateMessagesCount("r");

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
  },[ messagesDB, scroll, target ]);

  // download the list of online users from the database
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
            color:{
              primary: u.color.primary,
              secondary: u.color.secondary
              }
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
    
  // update the database for when a user is added or removed
  const updateDatabase = (user, type) => {

    loadMessages();

    // add user object ot the database
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

    // function to log the user out
    const logUserSignout = (path) => {
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
          setTarget={setTarget}
          open={open}
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
