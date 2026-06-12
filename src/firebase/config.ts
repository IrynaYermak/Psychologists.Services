import { initializeApp } from "firebase/app";

const APIKEY = import.meta.env.VITE_API_KEY;

const firebaseConfig = {
  apiKey: APIKEY,
  authDomain: "psychologistsservices-d3a2c.firebaseapp.com",
  databaseURL:
    "https://psychologistsservices-d3a2c-default-rtdb.firebaseio.com",
  projectId: "psychologistsservices-d3a2c",
  storageBucket: "psychologistsservices-d3a2c.firebasestorage.app",
  messagingSenderId: "373251628554",
  appId: "1:373251628554:web:cf92480891721ca2e849f3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
