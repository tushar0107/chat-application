import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import  SplashScreen from '@capacitor/splash-screen';

const container = document.getElementById('root');
const root = createRoot(container!);
const renderApp = ()=>{

    root.render(
      <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  
};

root.render(<SplashScreen/>);

setTimeout(()=>{
  renderApp();
}, 3000);