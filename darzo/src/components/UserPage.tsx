import { IonList, IonItem, IonAvatar, IonLabel, IonNote, IonBadge } from "@ionic/react";
import React from "react";
import { Route } from "react-router";
import ChatSocket from "../pages/ChatSocket";
import Chat from "../pages/Chat";

interface UserProps{
  userId : number;
}

const UserPage: React.FC<UserProps> = (props:any) => {
  return (
    <>
      <IonList lines="full" typeof="ios" className="chat-list">
        <IonItem routerLink="/chat/111">
          <IonAvatar>
            <img src="profile.webp" alt="" className="profile-image" />
          </IonAvatar>
          <div className="item-details">
            <IonLabel>User 1</IonLabel>
            <IonNote>Text 1</IonNote>
          </div>
          <div slot="end">
            <IonNote>12:56</IonNote>
            <br />
            <IonBadge color="success" className="chat-badge">
              5
            </IonBadge>
          </div>
        </IonItem>

        <IonItem routerLink="/chat/222">
          <IonAvatar>
            <img src="profile.webp" alt="" className="profile-image" />
          </IonAvatar>
          <div className="item-details">
            <IonLabel>User 2</IonLabel>
            <IonNote>Text 2</IonNote>
          </div>
          <div slot="end">
            <IonNote>12:56</IonNote>
            <br />
            <IonBadge color="success" className="chat-badge">
              5
            </IonBadge>
          </div>
        </IonItem>
        <IonItem routerLink="/chat/333">
          <IonAvatar>
            <img src="profile.webp" alt="" className="profile-image" />
          </IonAvatar>
          <div className="item-details">
            <IonLabel>User 3</IonLabel>
            <IonNote>Text 3</IonNote>
          </div>
          <div slot="end">
            <IonNote>12:56</IonNote>
            <br />
            <IonBadge color="success" className="chat-badge">
              5
            </IonBadge>
          </div>
        </IonItem>
      </IonList>
        
    </>
  );
};

export default UserPage;
