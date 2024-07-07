import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCymqW4p240cXYriVYKTs4isL5L88hFjTg",
    authDomain: "ilutras.firebaseapp.com",
    projectId: "ilutras",
    storageBucket: "ilutras.appspot.com",
    messagingSenderId: "986891199172",
    appId: "1:986891199172:web:aec4b1b63856986e565f91",
    measurementId: "G-DHPPF9BC8G"
};

const app = initializeApp(firebaseConfig)
const db = getFirestore(app);
const images = getStorage(app);
const auth = getAuth(app);

export { auth, db, images };

