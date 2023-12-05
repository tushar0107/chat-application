import { IonHeader, IonToolbar, IonButtons, IonButton, IonIcon, IonMenuButton, IonTitle, IonPopover, IonContent } from "@ionic/react";
import React from "react";
import { personOutline } from "ionicons/icons";

interface UserProps{
  userId : number;
  title: string;
}

const Header: React.FC<UserProps> = (props:any) => {
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="end">
            <IonButton id="view-user">
              <IonIcon icon={personOutline}></IonIcon>
            </IonButton>
            <IonPopover trigger="view-user" triggerAction="click">
              <IonContent class="ion-padding">
                {props.userId}
              </IonContent>
            </IonPopover>
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>{props.title}</IonTitle>
        </IonToolbar>
      </IonHeader>
    </>
  );
};

export default Header;
