// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAgHFRIRFlIUEfIjiUTttXliZjzKlmM1Pc",
  authDomain: "spotify-clone-ceacf.firebaseapp.com",
  databaseURL: "https://spotify-clone-ceacf-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "spotify-clone-ceacf",
  storageBucket: "spotify-clone-ceacf.appspot.com",
  messagingSenderId: "199545481354",
  appId: "1:199545481354:web:55dc766204ad56a38a6573",
  measurementId: "G-JMMGPHHXQR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


//lets check it
const database =getDatabase(app);
export default database