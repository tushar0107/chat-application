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
  useIonAlert,
} from "@ionic/react";
import Header from "../components/Header";

import "../theme/chatpage.css";
import { sendSharp } from "ionicons/icons";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { sendMessage } from "../redux/user/messageSlice";
import vars from "../components/GlobalVars";
import { SQLiteConnection, SQLiteDBConnection } from "@capacitor-community/sqlite";
import useSQLiteDB from "../components/Database/LocalDB";

const ChatSocket:React.FC = ()=>{
  const user = useSelector((state:any)=>state.user.user);
  const message = useSelector((state:any)=>state.messages);
  const dispatch = useDispatch();
  const popInfo = useRef(null);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [popText, setPopText] = useState('');
  const [name, setName] = useState('');
  const [id, setId] = useState();
  var chatHistory = [];

  const { performSQLAction, initialized } = useSQLiteDB();
  
  const params: any = useParams();
  const [presentAlert] = useIonAlert();

  //to set chats array
  const [chats, setChats] = useState<any[]>([]);
  //to set msg input
  const [text, setText] = useState("");
  //to store a static array of current chats to update on every send

  var ws: any;

  if (ws) {
    ws.onerror = ws.onopen = ws.onclose = null;
    ws.close();
  }
  ws = new WebSocket(`${vars.WebSocketUrl}/${user.id}`);

  const loadMsgs = async(id:any)=>{
    try{
      performSQLAction(async(db: SQLiteDBConnection | undefined)=>{
        const reptSelect = await db?.query(`SELECT * FROM chat WHERE recipient=${id}`);
        // setChats here
        console.log(reptSelect?.values);
      });
    }catch(err){
      presentAlert({
        header: 'Error',
        subHeader: '',
        message: `${err}`,
        buttons: ['OK'],
      });
    }
  }

  const updateMsgs = ()=>{

  }

  const addMsgs = (msg:any, recipient:any, sender: any)=>{
    try{
      performSQLAction(
        async (db:SQLiteDBConnection | undefined) => {
          await db?.query(`INSERT INTO chat (msg, recipient, sender) VALUES ('${msg}',${recipient}, ${sender});`);
          const getchat = await db?.query(`SELECT * FROM chat;`);
          //set chats here
          console.log(getchat);
        }
      );
    }catch(err){
      presentAlert({
        header:'Error',
        subHeader:`${err}`,
        message: '',
        buttons:['OK']
      });
    }
  };

  const deleteMsg = ()=>{

  }

  useEffect(() => {
    axios.post(`${vars.ApiUrl}/user/${params.id}`,{headers:vars.headers})
    .then((res)=>{
      setName(res.data[0].name);
      return res;
    }).then((res)=>{
      loadMsgs(res.data[0].id);
    })
    .catch((err)=>{
      console.log(err);
    })

    axios.post(`${vars.ApiUrl}/msgs`,
    {
      sender: user.id,
      receiver: params.id
    },{
      headers:vars.headers
    })
    .then((res)=>{
      console.log(res.data);
      return res.data;
    })
    .then((res)=>{
      let chatArray:Array<Object> = [];
      res.map((ele:any)=>{
        console.log('sender',ele.sender, 'rece',ele.receiver);
        console.log(params.id,params.id);
        if(ele.sender===user.id){
          let msg = {type:'sent', msg: ele.msg};
          chatArray = [...chatArray, msg];
        }else if(ele.sender==params.id){
          let msg = {type:'rec', msg: ele.msg};
          chatArray = [...chatArray, msg];
        }
      });
      console.log(chatArray);
      setChats(chatArray);
    })
    .catch(err => console.log(err));
    
    if(ws.readyState===WebSocket.OPEN){
      setPopText('Online');
      setPopoverOpen(true);
      setTimeout(()=>{
        setPopoverOpen(false);
      },2000);
    }
    // ws.onopen = () => {
     else if(ws.readyState===WebSocket.CLOSED){
        setPopText('Offline');
        setPopoverOpen(true);
        setTimeout(()=>{
          setPopoverOpen(false);
        },2000);
      }
    // };

  }, []);
  
  
  ws.onmessage = (data: any) => {
    console.log(JSON.parse(data.data));
    if(JSON.parse(JSON.parse(data.data)).sender === parseInt(params.id)){
      let message = JSON.parse(JSON.parse(data.data)).msg;
      let msg = {type: "rec", msg: message};
      const newchat = [...chats, { ...msg }];
      setChats(newchat);
    }
  };
  ws.onclose = function () {
    ws.null;

  };

  


  //on send by the user the chat is pushed to the chat array and saved to the localstorage
  const sendMsg = () => {
    console.log(chats);
    const data = {sender: user.id, receiver: params.id, msg: text};
    console.log(data);
    // dispatch(sendMessage(data));
    if(ws.readyState === WebSocket.OPEN){
      ws.send(JSON.stringify(data));
      addMsgs(text,params.id,user.id);
      setText('');
      let msg = {type: "sent", msg: text}
      const newchat = [...chats, { ...msg }];
      setChats(newchat);
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
  };

  return (
    <>
      <Menu />
      <IonPage id="main-content">
        <Header title={name}/>
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
                onChange={(e: any) => setText(e.target.value)}
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


// code from: https://github.com/aaronksaunders/ionic7-react-sqlite/blob/main/src/pages/Home.tsx