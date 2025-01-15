
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Type de configuration Firebase
interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  databaseURL: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

const firebaseConfig: FirebaseConfig = {
  apiKey: "TON_API_KEY",
  authDomain: "TON_AUTH_DOMAIN",
  databaseURL: "TON_DATABASE_URL",
  projectId: "TON_PROJECT_ID",
  storageBucket: "TON_STORAGE_BUCKET",
  messagingSenderId: "TON_MESSAGING_SENDER_ID",
  appId: "TON_APP_ID",
};

// Initialisation de Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
