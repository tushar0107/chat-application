import {
  IonList,
  IonItem,
  IonAvatar,
  IonLabel,
  IonNote,
  IonBadge,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import vars from "../components/GlobalVars";
import { useSelector } from "react-redux";
import axios from "axios";

const UserPage: React.FC = () => {
  const user = useSelector((state: any) => state.user.user);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get(`${vars.ApiUrl}/users/${user.mobile}`)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <IonList lines="full" typeof="ios" className="chat-list">
        {Array.isArray(users)
          ? users.map((user:any, key:any) => {
              return (
                <IonItem routerLink={`/chat/${user.id}`} key={key}>
                  <IonAvatar>
                    <img src="profile.webp" alt="" className="profile-image" />
                  </IonAvatar>
                  <div className="item-details">
                    <IonLabel>{user.name}</IonLabel>
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
              );
            })
          : null}
      </IonList>
    </>
  );
};

export default UserPage;
