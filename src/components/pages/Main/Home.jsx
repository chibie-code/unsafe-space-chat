import React from 'react';
import { Alert, Input, Icon,
 InputGroup, InputPicker } from 'rsuite';
import SignIn from './SignIn';
import firebase from "firebase/app";
import 'firebase/database';
import pThemes from './primary-themes.js';
// import sThemes from './secondary-themes.js';
import produce from 'immer';

const Home = ({ setTarget, open, setUsr, usr, isSignedIn, logUserSignout, listOnlineUsers, usersList, loadMessages, sendMessage, messagesDB, msg, setMsg, msgs, updateDatabase, setColor, color }) => {

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
      margin: "0.5rem 0",
      width: "100%"
    },
    testScrollCompArea: {
      width: "20rem",
      height: "30rem",
      backgroundColor: "white",
      border: "solid 1px white",
      position: "fixed"
    },
    btn: {
      color: "black"
    }
  }

  const signIn = () => {
    console.log("Sign-In Button Clicked!!");
    // Regex code to check if username is valid
    let username = usr.displayName;
    let userCheck = /^[a-z][a-z]+\d*$|^[a-z]\d\d+$/i;
    let result = userCheck.test(username);
    // adter the user clicks the sign-in Button
    // check that their input was not empty/nul, before proceeding to sign them in anonymously
    if(usr.displayName !== ""){ 
      // Then...

      if(result === true){
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

                    setUsr(p=>
                    produce(p,d=>{
                      d.uID=user.uid;
                      return d;
                    }));
                    
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
            return;
          }
          Alert.warning('Invalid username.');
          return;

        }
      }

  return (
    <>
      <SignIn 
        setTarget={setTarget}
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
        
        <div>
          <i className="toxicIcon fas fa-biohazard" style={styles.toxicIcon}></i>
        </div>
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
                  // e.target.value = "";
                  }
                }}
              onChange={(value)=>{
                if ( value != null || value !== "" ) {
                  
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
                    // setUsr(p=>
                    // produce(p,d=>{
                    //   d.displayName = "";
                    //   d.flatName = "";
                    //   return d;
                    // }));
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
             data={pThemes}
             placeholder="Color"
             onChange={(e)=>{
               setColor(p=>
               produce(p,d=>{
                 d.primary = e;
                 setUsr(p=>
                 produce(p,d_=>{
                   d_.color.primary = e;
                   console.log("primary:",d_.color.primary);
                   return d_;
                  }));
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


/*

          <InputGroup style={styles.inputGroup}>
            <InputPicker
             data={sThemes}
             placeholder="Secondary color"
             onChange={(e)=>{
               setColor(p=>
               produce(p,d=>{
                 d.secondary = e;
                 setUsr(p=>
                 produce(p,d_=>{
                   d_.color.secondary = e;
                   console.log("secondary:",d_.color.secondary);
                   return d_;
                   }));
                 return d;
               }));
             }}/>
          </InputGroup>
*/







