import firebase from 'firebase';

let config = {
  	apiKey: "AIzaSyCUdwDjBOi7sBmU6Wm30QTwflIdjbNYaj8",
    authDomain: "moonstreet-ecce4.firebaseapp.com",
    databaseURL: "https://moonstreet-ecce4.firebaseio.com",
    projectId: "moonstreet-ecce4",
    storageBucket: "moonstreet-ecce4.appspot.com",
    messagingSenderId: "399365607114"
}

export const firebaseApp = firebase.initializeApp(config);

export const database = firebase.database();
export const auth = firebaseApp.auth(); //the firebase auth namespace

export const storageKey = 'adGKUgxtIT1rngYvHtk4VzTXsfDT0Huz';
export const isAutheticated = () => {
    return !!auth.currentUser || !!localStorage.getItem(storageKey);
}
