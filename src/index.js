import "./index.css";
import * as React from "react";
import { render } from "react-dom";
import { FirebaseAuthProvider } from "@react-firebase/auth";
import firebase from "firebase/app";
import 'firebase/database';
// import 'firebase/firestore';
import "firebase/auth";
import App from './App';
import { firebaseConfig } from "./components/config";
render(
  <FirebaseAuthProvider {...firebaseConfig} firebase={firebase}>
    <App />
  </FirebaseAuthProvider>
  , document.getElementById("root"));