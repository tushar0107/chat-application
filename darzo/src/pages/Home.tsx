import {
  IonAvatar,
  IonBadge,
  IonButton,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import Header from "../components/Header";
import Menu from "../components/Menu";
import "./Home.css";
import { useState } from "react";
import UserPage from "../components/UserPage";
import ChatSocket from "./ChatSocket";
import { Route } from "react-router";


const Home: React.FC = () => {
  const [userId, setUserId] = useState<any>();
  console.log(userId);
  var id:any = null;
  const handleInput =(e:any)=>{
    id = e.target.value;
  }
  const userLogin = ()=>{
    setUserId(id);
  }

    return (
      <>
        <Menu />
        <IonPage id="main-content">
          <Header userId={userId}/>
          <IonContent fullscreen>
            {
            userId!==undefined ?
            <>
              <UserPage/>
            </>
            :
            <>
              <div id="login-form">
                <h1>login please</h1>
                <input type="number" onChange={handleInput} value={userId} placeholder="Enter your mobile number"/>
                <IonButton onClick={userLogin} color="primary"><strong>Login</strong></IonButton>
              </div>
            </>}
          </IonContent>
        </IonPage>
        <Route path="/chat/:id">
          <ChatSocket userId={userId}/>
        </Route>
      </>
    );
};

export default Home;
