import firebase from 'firebase';

let config = {
  	apiKey: process.env.REACT_APP_FIREBASE_apiKey,
    authDomain: process.env.REACT_APP_FIREBASE_authDomain,
    databaseURL: process.env.REACT_APP_FIREBASE_databaseURL,
    projectId: process.env.REACT_APP_FIREBASE_projectId,
    storageBucket: process.env.REACT_APP_FIREBASE_FIREBASE_storageBucket,
    messagingSenderId: "399365607114"
}

export const firebaseApp = firebase.initializeApp(config);

export const database = firebase.database();
export const auth = firebaseApp.auth(); //the firebase auth namespace

export const storageKey = 'adGKUgxtIT1rngYvHtk4VzTXsfDT0Huz';
export const isAutheticated = () => {
    return !!auth.currentUser || !!localStorage.getItem(storageKey);
}
