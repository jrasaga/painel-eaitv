import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Configurações do Firebase fornecidas
const firebaseConfig = {
  apiKey: "AIzaSyAATp8lMCgunWHFRXLdB8MT__i1OoH_9F8",
  authDomain: "painel-eaitv-2fca5.firebaseapp.com",
  projectId: "painel-eaitv-2fca5",
  storageBucket: "painel-eaitv-2fca5.firebasestorage.app",
  messagingSenderId: "394694576972",
  appId: "1:394694576972:web:dc76090b5537a6f394dde9"
};

// Inicializa o app Firebase e Firestore
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);