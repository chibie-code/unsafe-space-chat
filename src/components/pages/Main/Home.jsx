import React from 'react';
import produce from 'immer';
import { Alert, Input, Icon,
 InputGroup, InputPicker } from 'rsuite';
import SignIn from './SignIn';
import firebase from "firebase/app";
import 'firebase/database';
import themes from './themes.js';

const Home = ({ setUsr, usr, isSignedIn, logUserSignout, listOnlineUsers, usersList, loadMessages, sendMessage, messagesDB, msg, setMsg, msgs, updateDatabase, setColor, color }) => {

  const show = (isSignedIn)?"none":"flex";

  const styles = {
    signUpComponent: {
      width: "100%",
      height: "100%",
      display: show,
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"
    },
    toxicIcon: {
      fontSize: "1.5rem"
    },
    signupGroup: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    inputGroup: {
      margin: "0.5rem 0"
    }
  }

  const signIn = () => {
    console.log("Sign-In Button Clicked!!");
    // adter the user clicks the sign-in Button
    // check that their input was not empty/nul, before proceeding to sign them in anonymously
    if(usr.displayName !== ""){ 
      // Then...

      // 1. set the persistence
      // set the persistence of the user's login to remain even after the browser gets refresshed and until they close the tab/wondow (SESSION)
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE)
        .then(() => {

          // 2. sign in the user
          // sign them in anonymously
          firebase.auth().signInAnonymously()
            .then(()=>{
              Alert.success(`Welcome, ${usr.displayName}!`);

              updateDatabase(firebase.auth().currentUser, "a");

              // 3. register the change in the auth state, after the user logged in/signed in
              //in here, you update the database
              firebase.auth().onAuthStateChanged((user) => {
                listOnlineUsers();
                if(user){
                  console.log(`Welcome, ${usr.displayName}!`);
                  // const user = firebase.auth().currentUser;

                  
                  firebase
                  .database()
                  .ref(`users/${user.uid}`)
                  .onDisconnect().remove()
                  .then(()=>{
                    console.log("User Disconnected!");
                  })
                  .catch((err)=>{
                    console.error("Error: ",err.message);
                  });
                  // ... sometime later

                  // the .cancel() function is to cancel the updates that happen when the user disconnects
                  // ref.onDisconnect().cancel();
                  // the .remove() deletes/removes that user data at that reference, when they disconnect
                  // ref.onDisconnect().remove();
                }
                else{
                  console.log(`${usr.displayName} just signed out!`);
                  console.log(`UID: ${usr.uID} just signed out!`);
                }
              });
            })
            .catch(err=>{
              console.error("Error signing in user: ",err.message);
            });
          })
        .catch((error) => {
          // Handle Errors here.
          // const errorCode = error.code;
          const errorMessage = error.message;
          console.log("Error running persistence function: ",errorMessage);
          });
        }
      }

      // useEffect(()=>{

      //   console.log("Color:",color);
      // },[color]);

  return (
    <>
      <SignIn 
        isSignedIn={isSignedIn} 
        logUserSignout={logUserSignout}
        usersList={usersList}
        updateDatabase={updateDatabase}
        listOnlineUsers={listOnlineUsers}
        sendMessage={sendMessage}
        loadMessages={loadMessages}
        messagesDB={messagesDB}
        msg={msg}
        setMsg={setMsg}
        msgs={msgs}
        color={color}
        firebase={firebase}
        usr={usr}
        setUsr={setUsr}/>

      <div style={styles.signUpComponent}>
        <i className="toxicIcon fas fa-biohazard" style={styles.toxicIcon}></i>
        <span style={styles.signupGroup}>
          <br/>
          <InputGroup
          className="inputGroup"
          style={styles.inputGroup}>
            <Input
              id="inputEventBox"
              placeholder="Username"
              name="displayName"
              onKeyDown={(e)=>{
                if(e.key === "Enter"){
                  signIn();
                  e.target.value = "";
                  }
                }}
              onChange={(value)=>{
                if ( value != null || value !== "" ) {
                  // console.log("value:",value);
                  setUsr(p=>
                  produce(p,d=>{
                    d.displayName = value;
                    d.flatName = d.displayName
                    .toLowerCase()
                    .split('')
                    .filter(e => e.trim().length)
                    .join('');
                    return d;
                    }));
                  }
                  else {
                    setUsr(p=>
                    produce(p,d=>{
                      d.displayName = "";
                      d.flatName = "";
                      return d;
                    }));
                  }
              }}
              />
            <InputGroup.Button
            onClick={signIn}>
              <Icon icon="sign-in" />
            </InputGroup.Button>
          </InputGroup>
          <InputGroup style={styles.inputGroup}>
            <InputPicker
             data={themes}
             placeholder="Color scheme"
             onChange={(e)=>{
               setColor(p=>
               e);
               setUsr(p=>
               produce(p,d=>{
                 d.color = e;
                 return d;
               }));
             }}/>
          </InputGroup>
        </span>
      </div>
    </>
  );
};

export default Home;







