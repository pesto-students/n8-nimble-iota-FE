/* eslint-disable no-undef */
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apikey: process.env.REACT_APP_FIREBASE_APIKEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASEURL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_FIREBASE_APPID,
};

const app = initializeApp(firebaseConfig);
export const fbstorage = getStorage(app);
export const fbfirestore = getFirestore(app);
