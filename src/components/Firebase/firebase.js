import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyA_9E7rPSRIW1YchCasewQdFjY8E20vjzA",
    authDomain: "unsafespace-a3afa.firebaseapp.com",
    projectId: "unsafespace-a3afa",
    storageBucket: "unsafespace-a3afa.appspot.com",
    messagingSenderId: "655585118520",
    appId: "1:655585118520:web:aaff47ff4f3e823010d9cd",
    measurementId: "G-GLYZ7FN8SF"
  };
  
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();

// const provider = new firebase.auth.GoogleAuthProvider();