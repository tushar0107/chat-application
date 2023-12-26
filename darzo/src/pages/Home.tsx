import { IonButton, IonContent, IonPage, useIonAlert } from "@ionic/react";
import { CapacitorSQLite, SQLiteConnection } from "@capacitor-community/sqlite";
import Header from "../components/Header";
import Menu from "../components/Menu";
import "./Home.css";
import { useEffect, useState } from "react";
import UserPage from "../components/UserPage";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { storeUserData } from "../redux/user/userSlice";
import { login } from "../redux/user/authSclice";
import vars from "../components/GlobalVars";

import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from "@capacitor/push-notifications";
import { initializeConnect } from "react-redux/es/components/connect";

const Home: React.FC = () => {
  const user = useSelector((state: any) => state.user.user);
  const loginStatus = useSelector((state: any) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const [mobile, setMobile] = useState<any>("");

  const [presentAlert] = useIonAlert();


  const handleLogin = () => {
    console.log("logging in...");
    axios
      .post(`${vars.ApiUrl}/login`, { mobile }, { headers: vars.headers })
      .then((res) => {
        console.log("getting response...");
        console.log(res.data);
        localStorage.setItem("user", JSON.stringify(res.data[0]));
        dispatch(storeUserData(res.data[0]));
        dispatch(login(res.data[0]));
        presentAlert({
          header: "Login",
          subHeader: "Hello " + res.data[0].name + "!",
          buttons: ["OK"],
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    const userData: any = localStorage.getItem("user");
    const user = JSON.parse(userData);
    if (userData !== null) {
      dispatch(storeUserData(user));
      dispatch(login(user));
    }

    
    
  }, [dispatch]);

  return (
    <>
      <Menu />
      <IonPage id="main-content">
        <Header title="Home" />
        <IonContent fullscreen>
          {loginStatus ? (
            <>
              <UserPage />
            </>
          ) : (
            <>
              <div id="login-form">
                <h1>Login</h1>
                <input
                  type="number"
                  onChange={(e) => setMobile(e.target.value)}
                  name="mobile"
                  id="mobile"
                  value={mobile}
                  placeholder="Enter mobile"
                ></input>
                <IonButton onClick={handleLogin} color="primary">
                  <strong>Sign in</strong>
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
