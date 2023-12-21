import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'darzo',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  plugins: {
      SplashScreen: {
        launchShowDuration: 3000,
        launchAutoHide: true,
        launchFadeOutDuration: 3000,
        backgroundColor: "#ffffffff",
        androidSplashResourceName: "logo.avif",
        androidScaleType: "CENTER_CROP",
        showSpinner: true,
        androidSpinnerStyle: "large",
        iosSpinnerStyle: "small",
        spinnerColor: "#999999",
        splashFullScreen: true,
        splashImmersive: true,
        layoutName: "launch_screen",
      },
  }
};

export default config;
