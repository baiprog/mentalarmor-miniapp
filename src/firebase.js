import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBLbUDfKw8WqNG53JkuJLjDVetT7CiTEg8",
  authDomain: "mentalarmor-6cac3.firebaseapp.com",
  projectId: "mentalarmor-6cac3",
  storageBucket: "mentalarmor-6cac3.firebasestorage.app",
  messagingSenderId: "775520121511",
  appId: "1:775520121511:web:6920a74205b19d6daee182"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db }; // 👈 вот эта строка обязательно должна быть!