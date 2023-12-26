import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact, useIonAlert } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/Home";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
import { App as CapApp } from "@capacitor/app";

/* Theme variables */
import "./theme/variables.css";
import ChatSocket from "./pages/ChatSocket";

import { Provider, connect } from "react-redux";
// import Counter from './components/UserPage';
import store from "./redux/store";
import UserProfile from "./pages/UserProfile";
import Register from "./pages/Register";

setupIonicReact();





const App: React.FC = () => {
  

  document.addEventListener("ionBackButton", (ev: any) => {

    ev.detail.register(1, () => {
      if (window.location.pathname === "/home") {
        CapApp.exitApp();
      }
      else{
        history.back();
      }
    });
  });


  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Provider store={store}>
            <Route exact path="/home">
              <Home />
            </Route>
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
            <Route path="/chat/:id">
              <ChatSocket />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/profile">
              <UserProfile />
            </Route>
          </Provider>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
