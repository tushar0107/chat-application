import { IonHeader, IonToolbar, IonButtons, IonButton, IonIcon, IonMenuButton, IonTitle, IonPopover, IonContent } from "@ionic/react";
import React, { useEffect, useRef, useState } from "react";
import { personOutline } from "ionicons/icons";
import { useSelector } from "react-redux";

interface UserProps{
  title: string;
}

const Header: React.FC<UserProps> = (props:any) => {
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="end">
            <IonButton routerLink="/profile">
              <IonIcon icon={personOutline}></IonIcon>
            </IonButton>
            <IonMenuButton/>
          </IonButtons>
        <IonTitle>{props.title}</IonTitle>
        </IonToolbar>
      </IonHeader>
    </>
  );
};

export default Header;
