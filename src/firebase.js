import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "keep your data",
  authDomain: "keep your data",
  projectId: "keep your data",
  storageBucket: "keep your data",
  messagingSenderId: "keep your data",
  appId: "keep your data",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export { auth, database };
