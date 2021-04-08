import React from 'react';
import { Input, InputGroup, Icon, Button, List  } from 'rsuite';
import { ScrollArea  } from "react-scroll-to";
import Draggable from 'react-draggable';
import "./chat_area.css";
// import produce from "immer";

const ChatArea = ({ usr, setUsr, uid, messagesDB, msg, setMsg, msgs, loadMessages, sendMessage, scroll, color }) => {

  const runScroll = () => {
    scroll({ 
      id: "messages", 
      y: 10000,
      smooth: true })
  }

  const messageBubble = (uID, id, message_, color) => {

    if(uID === message_.id){
      return (
        <>
          <span style={{color, fontWeight: "700", backgroundColor: color}}>
            "[YOU]"
          </span>
            : {message_.message}
        </>
      );
    }
    else{
        return (
          <>
            <span style={{ fontWeight: "700"}}>
              {message_.name}
            </span>
              : {message_.message}
          </>
          );
    }
  };

  const styles = {
      container: {
        width: "100%",
        height: "100%"
      },
      messages: {
        display: "flex",
        flexDirection: "column",
        width: "auto",
        height: "93vh"
      },
      messagesScroll: {
        position: "relative",
        overflowY: "auto",
        width: "100%",
        height: "100%",
        maxWidth: "100%",
        display: "flex",
        justifyContent: "",
        flexDirection: "column"
      },
      scrollBtn: {
        position: "fixed",
        top: "75%",
        left: "95%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        fontSize: "50rem",
        width: "2rem",
        height: "2rem",
        padding: "1rem",
        color: "cyan",
        // background: "rgba(200, 30, 10, 0.5)",
        borderRadius: "50%"
      },
      message:{
        width: "100%",
        height: "auto",
        padding: "1rem",
        borderRadius: "3px",
        color: "black"
      },
      inputArea: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        border: "cyan",
        marginTop: "auto",
        padding: "1rem"
      },
      emojiBox: {
        position: "fixed"
      }
    }

  return (
    <div style={styles.container}>
      <div style={styles.messages}>

        <ScrollArea
          id="messages" style={styles.messagesScroll}>
          <List size="lg" bordered>
          {
            msgs.map((msg_, id)=>{
              return (
                <List.Item key={id}>
                  {messageBubble(uid, id, msg_, color)}
                </List.Item>
                );
              }
            )
          }
          </List>
          <Draggable>
            <Button 
            id="scrollBtn"
            style={styles.scrollBtn}
            onClick={runScroll}>
              {/*<Icon 
                style={styles.showUsersIcon}
                icon="arrow-down"/>*/}
              <i 
              style={styles.showUsersIcon}
              className="fas fa-angle-double-down"></i>
            </Button>
          </Draggable>
        </ScrollArea>

        <div style={styles.inputArea}> 
          <InputGroup inside>
            <Input
            onKeyDown={(e)=>{
              if(e.key === "Enter"){
                
                sendMessage();
                loadMessages();
                setMsg("");
                e.target.value = "";
              }
            }}
            onChange={(text)=>{
              // console.log("text.toString",text);
              setMsg(p=>text);
            }}/>
            <InputGroup.Button
              onClick={()=>{
              //  console.log("Send message:",msg);
              sendMessage();
              setMsg("");
              return;
            }}>
              <Icon 
              style={styles.showUsersIcon}
              icon="send"/>
            </InputGroup.Button>
          </InputGroup>
        </div>
      </div>
    </div>
  );
}

export default ChatArea;