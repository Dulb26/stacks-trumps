import axios from "axios";
import { FirebaseApp, initializeApp } from "firebase/app";
import { ReCaptchaV3Provider, initializeAppCheck } from "firebase/app-check";
import { Auth, getAuth } from "firebase/auth";
import {
  Firestore,
  getFirestore,
  initializeFirestore,
} from "firebase/firestore";
import { Functions, getFunctions } from "firebase/functions";

class Firebase {
  environment = {
    production: true,
    language: "en",
    api: import.meta.env.VITE_API_URL,
  };

  app!: FirebaseApp;
  auth!: Auth;
  db!: Firestore;
  fns!: Functions;

  initApp = new Promise((resolve, reject) => {
    if (import.meta.env.VITE_AUTO_INIT === "true") {
      axios
        .get(`/__/firebase/init.json`)
        .then((res) => {
          this.app = initializeApp(res.data);
          initializeFirestore(this.app, { experimentalForceLongPolling: true });
          this.auth = getAuth(this.app);
          this.db = getFirestore(this.app);
          this.fns = getFunctions(this.app);
          initializeAppCheck(this.app, {
            provider: new ReCaptchaV3Provider(
              import.meta.env.VITE_CAPTCHA_SITE_KEY!,
            ),
            isTokenAutoRefreshEnabled: true,
          });
          resolve(this.app);
        })
        .catch(reject);
    } else {
      const firebaseConfig = {
        apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
        authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
        projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
        storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
        appId: import.meta.env.VITE_FIREBASE_APP_ID,
        measurementId: import.meta.env.VITE_GA_MEASUREMENT_ID,
      };
      console.log("firebaseConfig", firebaseConfig);
      this.app = initializeApp(firebaseConfig);
      initializeFirestore(this.app, { experimentalForceLongPolling: true });
      this.auth = getAuth(this.app);
      this.db = getFirestore(this.app);
      this.fns = getFunctions(this.app);
      resolve(this.app);
    }
  });

  getAuthApp = () => {
    return this.auth;
  };

  getDBApp = () => {
    return this.db;
  };

  getFnsApp = () => {
    return this.fns;
  };
}

export default new Firebase();
