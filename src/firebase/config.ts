// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCWWTgd43igHfuOMdHR8IlgPhV1rdS4fss",
  authDomain: "astro-auth-595c6.firebaseapp.com",
  projectId: "astro-auth-595c6",
  storageBucket: "astro-auth-595c6.firebasestorage.app",
  messagingSenderId: "384521781129",
  appId: "1:384521781129:web:cfdce277db50d23a7deb58"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

auth.languageCode = 'es';

export const firebase = {
    app,
    auth,
}