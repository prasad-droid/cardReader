// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDx6avTc9lFdf4hgebIBDx6_CL1kIpxq7w",
  authDomain: "cardscanner-db473.firebaseapp.com",
  projectId: "cardscanner-db473",
  storageBucket: "cardscanner-db473.appspot.com",
  messagingSenderId: "107143595016",
  appId: "1:107143595016:web:a6cef19949fffe4d8d7dbd",
  measurementId: "G-TMNTMBPLM7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = initializeAuth(app)
export const db = getFirestore(app)
