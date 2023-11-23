import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Menu from "../components/Menu";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonIcon,
  IonPage,
} from "@ionic/react";
import Header from "../components/Header";

import "../theme/chatpage.css";
import { sendOutline, sendSharp } from "ionicons/icons";

const ChatSocket: React.FC = () => {
  const params: any = useParams();

  //to create a msg object
  const [msg, setMsg] = useState({});
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

  ws = new WebSocket("ws://localhost:6969");
  ws.open = () => {
    alert("Connection opened!");
  };
  ws.onmessage = (data: any) => {
    console.log(data);
    setText('');
  };
  ws.onclose = function () {
    ws.null;
  };

  var chat: any = [];

  useEffect(() => {}, []);

  //gets the input through user
  const getMsg = (e: any) => {
    setText(e.target.value);
    let str = { type: "sent", msg: e.target.value };
    setMsg(str);
  };

  //on send by the user the chat is pushed to the chat array and saved to the localstorage
  const sendMsg = () => {
    if (!ws) {
      alert("No websocket connection...");
      return;
    }
    ws.send(text);
    let msg = {type: "sent", msg: text}
    const newchat = [...chats, { ...msg }];
    setChats(newchat);
  };

  return (
    <>
      <Menu />
      <IonPage id="main-content">
        <Header />
        <IonContent fullscreen>
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
        </IonContent>
      </IonPage>
    </>
  );
};

export default ChatSocket;
