import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD0YSo3opF-3_6zmxC-7-qhcEbDbe1-8Vc",
  authDomain: "e-commerce-24c27.firebaseapp.com",
  projectId: "e-commerce-24c27",
  storageBucket: "e-commerce-24c27.firebasestorage.app",
  messagingSenderId: "1087501941403",
  appId: "1:1087501941403:web:3582c26bf4125c0f94243e",
  measurementId: "G-F1GCX1QWK9"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
