import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAigtp2hvXf9dZND-qbSwjkb0L_li0fcl0",
  authDomain: "pawtitas-arg.firebaseapp.com",
  projectId: "pawtitas-arg",
  storageBucket: "pawtitas-arg.firebasestorage.app",
  messagingSenderId: "600745606797",
  appId: "1:600745606797:web:bdbab4df34597b2308acc4",
};

const app = initializeApp(firebaseConfig);

export default app;