
import { getApp , getApps,initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"


const firebaseConfig = {
  apiKey: "AIzaSyD1KHFFPtpBw9f376O05S_bKhEqL7zCGvk",
  authDomain: "food-delivery-1c74e.firebaseapp.com",
  databaseURL: "https://food-delivery-1c74e-default-rtdb.firebaseio.com",
  projectId: "food-delivery-1c74e",
  storageBucket: "food-delivery-1c74e.appspot.com",
  messagingSenderId: "390306051172",
  appId: "1:390306051172:web:2f026a5bacf6a5e5b29b71",
};

const app =getApps.length>0? getApp() : initializeApp(firebaseConfig);

const firestore = getFirestore(app);

const storage = getStorage(app);

export {app,firestore , storage};
