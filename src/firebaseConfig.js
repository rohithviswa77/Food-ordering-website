import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCHx5Y_CCa0kOmqZP6hqMxjAPGSkf-xVSo",
  authDomain: "foodorderingapp-9cef1.firebaseapp.com",
  projectId: "foodorderingapp-9cef1",
  storageBucket: "foodorderingapp-9cef1.firebasestorage.app",
  messagingSenderId: "472128200316",
  appId: "1:472128200316:web:7b8b4d9804910c447ef3f9"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
