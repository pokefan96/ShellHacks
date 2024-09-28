// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCuVafLBoaqwKXMrFlv8pgekvVBQ5AlykY",
  authDomain: "shellhacks-55176.firebaseapp.com",
  databaseURL: "https://shellhacks-55176-default-rtdb.firebaseio.com",
  projectId: "shellhacks-55176",
  storageBucket: "shellhacks-55176.appspot.com",
  messagingSenderId: "283565370342",
  appId: "1:283565370342:web:459ce2400703de9e630427",
  measurementId: "G-LFHQY8K8YQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
