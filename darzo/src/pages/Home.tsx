import {
  IonAvatar,
  IonBadge,
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

const Home: React.FC = () => {
  return (
    <>
      <Menu />
      <IonPage id="main-content">
        <Header />
        <IonContent fullscreen>
          <IonList lines="full" typeof="ios" className="chat-list">
            <IonItem routerLink="/chat/1">
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

            <IonItem routerLink="/chat/2">
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
            <IonItem routerLink="/chat/3">
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
        </IonContent>
      </IonPage>
    </>
  );
};

export default Home;
