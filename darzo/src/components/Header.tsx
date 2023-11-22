import { IonHeader, IonToolbar, IonButtons, IonButton, IonIcon, IonMenuButton, IonTitle } from "@ionic/react";
import React from "react";
import { personOutline } from "ionicons/icons";


const Header: React.FC = () => {
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="end">
            <IonButton>
              <IonIcon icon={personOutline}></IonIcon>
            </IonButton>
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Menu</IonTitle>
        </IonToolbar>
      </IonHeader>
    </>
  );
};

export default Header;
