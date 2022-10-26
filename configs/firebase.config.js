import { initializeApp } from 'firebase/app';
import { getFirestore, initializeFirestore, terminate } from '@firebase/firestore';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyC_mGjB_zS28_zEUpXB_8tTBFM0tqvM66w",
    authDomain: "lostnfound-52d9b.firebaseapp.com",
    projectId: "lostnfound-52d9b",
    storageBucket: "lostnfound-52d9b.appspot.com",
    messagingSenderId: "815690568843",
    appId: "1:815690568843:web:e00197c265773529ccf08e",
    measurementId: "G-EVGEFN6GMS"
};

export const app = initializeApp(firebaseConfig);
terminate(getFirestore(app));
export const db = initializeFirestore(app, { experimentalAutoDetectLongPolling: true });
export const storage = getStorage(app);