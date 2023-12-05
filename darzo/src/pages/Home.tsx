import {
  IonButton,
  IonContent,
  IonPage,
} from "@ionic/react";
import Header from "../components/Header";
import Menu from "../components/Menu";
import "./Home.css";
import { useEffect, useState } from "react";
import UserPage from "../components/UserPage";

const Home: React.FC = () => {
  const [userId, setUserId] = useState<any>();
  const [login, setLogin] = useState(false);
  console.log(userId);
  var id: any = null;
  const handleInput = (e: any) => {
    setUserId(e.target.value);
  };
  const userLogin = () => {
    localStorage.setItem("userId", userId);
    setLogin(true);
  };

  useEffect(() => {
    if (localStorage.getItem("userId") !== null) {
      setUserId(localStorage.getItem("userId"));
      setLogin(true);
    }
  }, []);

  return (
    <>
      <Menu />
      <IonPage id="main-content">
        <Header userId={userId} title={"Home"} />
        <IonContent fullscreen>
          {login ? (
            <>
              <UserPage userId={userId} />
            </>
          ) : (
            <>
              <div id="login-form">
                <h1>login please</h1>
                <input
                  type="number"
                  onChange={handleInput}
                  value={userId}
                  placeholder="Enter your mobile number"
                />
                <IonButton onClick={userLogin} color="primary">
                  <strong>Login</strong>
                </IonButton>
              </div>
            </>
          )}
        </IonContent>
      </IonPage>
    </>
  );
};

export default Home;
