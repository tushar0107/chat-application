import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import Menu from "../components/Menu";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonIcon,
  IonPage,
  IonPopover,
} from "@ionic/react";
import Header from "../components/Header";

import "../theme/chatpage.css";
import { sendSharp } from "ionicons/icons";

interface UserProps{
  userId : number;
  title: string;
}

const ChatSocket:React.FC = ()=>{
  const popInfo = useRef(null);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [popText, setPopText] = useState('');

  var chatHistory = [];

  const params: any = useParams();

  //to set chats for currend id
  const [chats, setChats] = useState<any[]>([{}]);
  //to set msg input
  const [text, setText] = useState("");
  //to store a static array of current chats to update on every send

  var ws: any;

  if (ws) {
    ws.onerror = ws.onopen = ws.onclose = null;
    ws.close();
  }
  ws = new WebSocket(`ws://localhost:6969/${params.user}`);

  useEffect(() => {
    
    ws.onopen = () => {
      setPopoverOpen(true);
      setTimeout(()=>{
        setPopoverOpen(false);
      },2000);
    };
  }, []);
  
  
  ws.onmessage = (data: any) => {
    if(JSON.parse(JSON.parse(data.data)).sender === params.id){
      let message = JSON.parse(JSON.parse(data.data)).message;
      let msg = {type: "rec", msg: message};
      const newchat = [...chats, { ...msg }];
      setChats(newchat);
    }
  };
  ws.onclose = function () {
    ws.null;

  };
 
  var chat: any = [];

  

  //gets the input through user
  const getMsg = (e: any) => {
    setText(e.target.value);
  };


  //on send by the user the chat is pushed to the chat array and saved to the localstorage
  const sendMsg = () => {
    const data = {sender: params.user, recipient: params.id, message: text};
    if(ws.readyState === WebSocket.OPEN){
      ws.send(JSON.stringify(data));
    }else if(ws.readyState === WebSocket.CONNECTING){
      setPopText('connecting');
      setPopoverOpen(true);
      setTimeout(()=>{
        setPopoverOpen(false);
      },2000);
    }else if(ws.readyState === WebSocket.CLOSED){
      setPopText('Offline');
      setPopoverOpen(true);
      setTimeout(()=>{
        setPopoverOpen(false);
      },2000);
    }
    setText('');
    let msg = {type: "sent", msg: text}
    const newchat = [...chats, { ...msg }];
    setChats(newchat);
  };

  return (
    <>
      <Menu />
      <IonPage id="main-content">
        <Header userId={params.user} title={params.id}/>
        <IonContent fullscreen>
          {popoverOpen ? <div ref={popInfo} className="status">
            {popText}
          </div> : null}
          <div id="chat-section">
            {Array.isArray(chats)
              ? chats.map((ele: any, key: any) => {
                  if (ele.type === "rec") {
                    return (
                      <div key={key} className="message received">
                        <span>{ele.msg}</span>
                      </div>
                    );
                  } else if (ele.type === "sent") {
                    return (
                      <div key={key} className="message sent">
                        <span>{ele.msg}</span>
                      </div>
                    );
                  }
                })
              : null}
          </div>
          
        </IonContent>
        <IonFooter>
        <div id="chat-actions">
            <form action="" method="get">
              <input
                type="text"
                name="message"
                id="message"
                value={text}
                onChange={(e: any) => getMsg(e)}
              />
            </form>
            <IonButtons>
              <IonButton onClick={() => sendMsg()}>
                <IonIcon color="primary" icon={sendSharp}></IonIcon>
              </IonButton>
            </IonButtons>
          </div>
        </IonFooter>
      </IonPage>
      
    </>
  );
};

export default ChatSocket;
