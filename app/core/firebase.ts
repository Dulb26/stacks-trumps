import { FirebaseApp, initializeApp } from "firebase/app";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
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
    api: process.env.REACT_APP_API_URL,
  };

  app!: FirebaseApp;
  auth!: Auth;
  db!: Firestore;
  fns!: Functions;

  initApp = new Promise((resolve, reject) => {
    if (process.env.REACT_APP_AUTO_INIT === "true") {
      import("axios")
        .then(({ default: axios }) => axios.get(`/__/firebase/init.json`))
        .then((res) => {
          this.app = initializeApp(res.data);
          initializeFirestore(this.app, {});
          this.auth = getAuth(this.app);
          this.db = getFirestore(this.app);
          this.fns = getFunctions(this.app);
          initializeAppCheck(this.app, {
            provider: new ReCaptchaV3Provider(
              process.env.REACT_APP_CAPTCHA_SITE_KEY!,
            ),
            isTokenAutoRefreshEnabled: true,
          });
          resolve(this.app);
        })
        .catch(reject);
    } else {
      const firebaseConfig = {
        apiKey: process.env.REACT_APP_API_KEY,
        authDomain: process.env.REACT_APP_AUTH_DOMAIN,
        databaseURL: process.env.REACT_APP_DATABASE_URL,
        projectId: process.env.REACT_APP_PROJECT_ID,
        storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
        messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
        appId: process.env.REACT_APP_APP_ID,
        measurementId: process.env.REACT_APP_MEASUREMENT_ID,
      };
      this.app = initializeApp(firebaseConfig);
      initializeFirestore(this.app, { experimentalForceLongPolling: true });
      this.auth = getAuth(this.app);
      this.db = getFirestore(this.app);
      this.fns = getFunctions(this.app);
      resolve(this.app);
    }
  });
}

const firebase = new Firebase();
export const app = firebase.app;
export const auth = firebase.auth;
export const db = firebase.db;
export const fns = firebase.fns;

export default firebase;
