import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyCGWgQOslwuwH34jTzPKrMkCtVoncAFHRM",
  authDomain: "popina-prod.firebaseapp.com",
  databaseURL: "https://popina-prod.firebaseio.com",
  projectId: "popina-prod",
  storageBucket: "popina-prod.appspot.com",
  messagingSenderId: "1070476676107",
  appId: "1:1070476676107:web:b077e2fc32037f8a030b0e",
});

export default firebase;
