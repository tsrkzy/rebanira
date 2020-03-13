import * as firebase from "firebase/app";
import "firebase/firestore";
import firebaseConfig from "./firebaseConfig.json";

export function initFirebase() {
  firebase.initializeApp(firebaseConfig);
}
