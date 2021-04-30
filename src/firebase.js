import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDIPlDdqKYfpAFM6Yum7jig3WPnkLBYOyg",
  authDomain: "tybca-project.firebaseapp.com",
  projectId: "tybca-project",
  storageBucket: "tybca-project.appspot.com",
  messagingSenderId: "837424055879",
  appId: "1:837424055879:web:dced06ea9558f5930f5362",
  measurementId: "G-27XZ19T96Y",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
