import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCy4wOc2ckbBcco6OqP3Ps5VXZaCUM6Dh4",
    authDomain: "whatsappclone-82d46.firebaseapp.com",
    projectId: "whatsappclone-82d46",
    storageBucket: "whatsappclone-82d46.appspot.com",
    messagingSenderId: "879701765645",
    appId: "1:879701765645:web:65117ffd08c6d5a1412f44",
    measurementId: "G-YVH8HFVQLW"
};

const app = initializeApp(firebaseConfig);

export const authentication = getAuth(app);