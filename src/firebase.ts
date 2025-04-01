import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyD0l8bAAY2MC9hvtr4itjCOo9eVyYr5Ft8",
  authDomain: "jwitter-reloaded-8de6b.firebaseapp.com",
  projectId: "jwitter-reloaded-8de6b",
  storageBucket: "jwitter-reloaded-8de6b.firebasestorage.app",
  messagingSenderId: "878550862118",
  appId: "1:878550862118:web:549a069baa1294b9bcd9e7"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); //인증 인스턴스

export const storage = getStorage(app);

export const db = getFirestore(app);