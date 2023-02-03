// Import the functions you need from the SDKs you need
// eslint-disable
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCbxxbZKlgDeCIAjpQz4ghg3_jCXmca1AQ",
  authDomain: "practice-iris.firebaseapp.com",
  projectId: "practice-iris",
  storageBucket: "practice-iris.appspot.com",
  messagingSenderId: "357474250689",
  appId: "1:357474250689:web:baa4aa79b4dcd45b8b4940",
  measurementId: "G-DFZHMPY3LK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// eslint-disable-next-line
const analytics = getAnalytics(app);
import { getStorage } from "firebase/storage"
const storage = getStorage(app);

export { storage }