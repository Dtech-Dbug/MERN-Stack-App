import firebase from 'firebase';
import "firebase/auth"

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAqoXTAK4y7XJjjpzgsD1cFpj1QNwvsC1M",
    authDomain: "ecommerce-eace1.firebaseapp.com",
    projectId: "ecommerce-eace1",
    storageBucket: "ecommerce-eace1.appspot.com",
    messagingSenderId: "330520518471",
    appId: "1:330520518471:web:b43fd0efa9ccffb9603662"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export const auth = firebase.auth(); // authorization and having access to authorized person
  
  export const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
  //we created a new instance of firebase auth using Google Auth Provider