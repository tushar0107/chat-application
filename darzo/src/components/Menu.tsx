import React from "react";
import {
  IonContent,
  IonHeader,
  IonMenu,
  IonTitle,
  IonToolbar,
  IonMenuButton,
  IonButtons,
  IonList,
  IonItem,
} from "@ionic/react";

const Menu: React.FC = () => {
  return (
    <IonMenu side="end" contentId="main-content">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Menu Content</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <IonItem routerLink="/home" routerDirection="back" onClick={()=>{localStorage.removeItem('userId')}}>Logout</IonItem>
        </IonList>  
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
