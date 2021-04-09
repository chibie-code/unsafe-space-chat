import React, { useRef, useEffect } from 'react';
import { Input, InputGroup, Icon, List  } from 'rsuite';
// import { ScrollArea  } from "react-scroll-to";
// import Draggable from 'react-draggable';
import "./chat_area.css";
import produce from "immer";

const ChatArea = ({ setTarget, usr, setUsr, uid, messagesDB, msg, setMsg, msgs, loadMessages, sendMessage, color }) => {

  const scrollAreaRef = useRef(null);

  const messageBubble = (id, message_, color) => {

    const pos = (id === message_.uid)?"flex-end":"flex-start";
    const name = (id === message_.uid)?"":`${message_.name}: `;

    return (
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: pos
      }}>
        <span style={{ color: "darkgray", fontWeight: "700" }}>
          {name}
          <span style={{ color: "white"}}>
          {message_.message}
          </span>
        </span>
      </div>
    );
  };

  useEffect(()=>{
    if(scrollAreaRef.current){
      setTarget(p=>
      produce(p,d=>{
        d=scrollAreaRef.current;
        return d;
      }))
    }
  },[scrollAreaRef, setTarget]);

  const styles = {
      container: {
        width: "100%",
        height: "90vh"
      },
      messages: {
        position: "relative",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "82vh",
        overflow: "hidden"
      },
      messagesScroll: {
        position: "relative",
        overflowY: "auto",
        width: "100%",
        height: "100%",
        maxWidth: "100%",
        display: "flex",
        justifyContent: "start",
        flexDirection: "column"
      },
      scrollBtn: {
        position: "fixed",
        top: "10rem",
        left: "10rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        fontSize: "1rem",
        width: "2rem",
        height: "2rem",
        padding: "1rem",
        color: "cyan",
        background: "rgba(200, 200, 200, 0.2)",
        borderRadius: "50%"
      },
      message:{
        width: "100%",
        height: "auto",
        borderRadius: "3px"
      },
      inputArea: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "8vh",
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
        <List size="lg" bordered style={{width: "100%", height: "100%"}}>
          <div style={styles.messagesScroll}
          ref={ scrollAreaRef }>
            {
              msgs.map((msg_, id)=>{
                return (
                  <List.Item key={id} style={styles.message}>
                    {messageBubble(usr.uID, msg_, color)}
                  </List.Item>
                  );
                }
              )
            }
          </div>
        </List>
        {/*<Draggable>
          <div style={styles.scrollBtn}>draggable</div>
        </Draggable>*/}
      </div>
      <div style={styles.inputArea}> 
        <InputGroup inside>
          <Input
          onKeyDown={(e)=>{
            if(e.key === "Enter"){
              
              sendMessage();
              loadMessages();
              // scroll();
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
            return;
          }}>
            <Icon 
            style={styles.showUsersIcon}
            icon="send"/>
          </InputGroup.Button>
        </InputGroup>
      </div>
    </div>
  );
}

export default ChatArea;