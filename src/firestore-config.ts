import { initializeApp } from "firebase-admin/app";

const firebaseConfig = {
    apiKey: "AIzaSyB1r7ZTAp2LygKOF9NApv-5fWN4t2zTziE",
    authDomain: "angularbc-tereza-pudilova.firebaseapp.com",
    projectId: "angularbc-tereza-pudilova",
    storageBucket: "angularbc-tereza-pudilova.appspot.com",
    messagingSenderId: "589611915009",
    appId: "1:589611915009:web:bd908c91d660aabd30ad00",
  };

  export const app = initializeApp(firebaseConfig);