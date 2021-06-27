import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_apiKey,
  authDomain: process.env.REACT_APP_FIREBASE_authDomain,
  databaseURL: process.env.REACT_APP_FIREBASE_databaseURL,
  projectId: process.env.REACT_APP_FIREBASE_projectId,
  storageBucket: process.env.REACT_APP_FIREBASE_FIREBASE_storageBucket,
  messagingSenderId: process.env.REACT_APP_FIREBASE_messagingSenderId,
  appId: process.env.REACT_APP_FIREBASE_appId,
};

export const firebaseApp = firebase.initializeApp(config);

export const database = firebase.database();
export const auth = firebaseApp.auth(); // the firebase auth namespace

export const storageKey = 'adGKUgxtIT1rngYvHtk4VzTXsfDT0Huz';
// eslint-disable-next-line no-undef
export const isAutheticated = () => !!auth.currentUser || !!localStorage.getItem(storageKey);

export default firebase;
