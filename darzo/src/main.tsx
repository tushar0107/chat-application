import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container!);
const renderApp = () => {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};
renderApp();

// root.render(<MySplashScreen />);

// setTimeout(() => {
// }, 3000);
