import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDPjyF7LlJOfrOziGAL6YkPgRuCibjBP8I",
  authDomain: "genz-vote.firebaseapp.com",
  projectId: "genz-vote",
  storageBucket: "genz-vote.appspot.com",
  messagingSenderId: "62083173703",
  appId: "1:62083173703:web:8b139e9b55a180f2d81062",
  measurementId: "G-ZZGT8JZL5L"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };

