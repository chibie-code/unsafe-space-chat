import React from 'react';
import { List, Icon, Avatar } from 'rsuite';
import 'firebase/database';


const OnlineUsers = ({ listOnlineUsers, setUsersList, usersList, show, color, usr }) => {

  const styles = {
    container: {
      minWidth: "15rem",
      maxWidth: "20rem",
      width: "auto",
      height: "100%"
    },
    listItem: {
      display: "flex",
      textAlign: "center",
      padding: "1rem",
      fontSize: "1rem"
    }
  }

  return (
    <div style={styles.container}>
      <List hover>
        {
          (show)&&(
            usersList.map((user, id)=>{
                return (
                  <List.Item key={id}
                  style={styles.listItem}>
                    <span>
                      <Avatar
                      size="xs">
                        <Icon 
                        icon="user"
                        style={{color: user.color.primary}} />
                      </Avatar>
                      <span style={{
                        color: "white"
                        }}>
                       {` ${user.name} ${
                         (usr.name === user.displayName)?
                         "[me]":""}`}
                      </span>
                    </span>
                  </List.Item>
                  );
              })
          )
        }
      </List>
    </div>
  );
}

export default OnlineUsers;