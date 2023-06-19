// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyCQXkScCsnzmQc7sECjXLafCwBcSD5t7qI",
  authDomain: "uploadimage-82b9e.firebaseapp.com",
  projectId: "uploadimage-82b9e",
  storageBucket: "uploadimage-82b9e.appspot.com",
  messagingSenderId: "929900882090",
  appId: "1:929900882090:web:74010721ed19e8d42048d3",
  measurementId: "G-V1LX3DX0PL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);
export default storage;