import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { firebaseConfig } from './firebase-config.ts';
const App = initializeApp(firebaseConfig);
console.log(firebaseConfig);
const db = getFirestore(App);
const auth = getAuth(App);
export { auth, db };
