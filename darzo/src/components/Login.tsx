import React from "react";
import Menu from "./Menu";
import { IonContent, IonPage } from "@ionic/react";
import Header from "./Header";

import "../pages/Home.css";


const Login: React.FC = ()=>{


    return(
        <>
          <Menu/>
          <IonPage>
            <Header/>
            <IonContent fullscreen>
              

            </IonContent>
          </IonPage>
        </>
    );
}

export default Login;