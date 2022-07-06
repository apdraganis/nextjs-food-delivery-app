// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { browserSessionPersistence, getAuth, setPersistence } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDp7kDi_aaBPymgH1782RfsI_0ZDtU9k1E",
  authDomain: "food-order-app-3e7e1.firebaseapp.com",
  databaseURL: "https://food-order-app-3e7e1-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "food-order-app-3e7e1",
  storageBucket: "food-order-app-3e7e1.appspot.com",
  messagingSenderId: "802432979096",
  appId: "1:802432979096:web:571d3dd179c3c895dec0ed"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
setPersistence(auth, browserSessionPersistence);
// Initialize Firestore
export const db = getFirestore(app);