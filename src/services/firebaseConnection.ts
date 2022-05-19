import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAQQEqvWMNL9SIB6AhBwOEb73QLAE4_TTE",
    authDomain: "boardapp-b0858.firebaseapp.com",
    projectId: "boardapp-b0858",
    storageBucket: "boardapp-b0858.appspot.com",
    messagingSenderId: "298192883276",
    appId: "1:298192883276:web:4ad99e2e4936ae8ae92ee9"
  };
  
  // Initialize Firebase
  export const app = initializeApp(firebaseConfig);
  export const database = getFirestore(app);
  