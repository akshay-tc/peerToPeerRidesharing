// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAl_-JBXJWhDz79W71xkXGcUFW2tkJDiwE",
  authDomain: "test1-e9f6f.firebaseapp.com",
  databaseURL: "https://test1-e9f6f-default-rtdb.firebaseio.com",
  projectId: "test1-e9f6f",
  storageBucket: "test1-e9f6f.appspot.com",
  messagingSenderId: "737590301664",
  appId: "1:737590301664:web:f4a648496e8aff45aad185",
  measurementId: "G-BSTWHR3FH8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

// const analytics = getAnalytics(app);
export default app;
export { database };