const updateDatabase = (user, type) => {

    if(type === "a"){
      usersDB
      .child(firebase.auth().currentUser.uid)
      .on("value", snap=>{

        // if(snap.exists()){
        //     console.error(`Sorry, ${usr.displayName} already exists.`);
        //     Alert.error(`Sorry, ${usr.displayName} already exists.`);
        //     return;
        //   }
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


    const loadMessages = useCallback(() => {
    // function to load all the messages in a list

    // to show the messages onLoad
    messagesDB
    .limitToLast(7)
    .on("value", snap => {
      if (snap.exists()){

        messagesDB
        .once("child_changed", snapshot_=>{
          // console.log("Successfully changed 'messages' DB!");

          messagesDB
          .limitToLast(7)
          .once("value", snapshot => {
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
          });

        });
      }
    });
  },[ messagesDB ]);