import { ref, onValue, DatabaseReference } from "firebase/database";
import { database } from "./firebase";

// Type pour les données récupérées (personnalise selon tes besoins)
export interface FirebaseData {
  [key: string]: any; // Clé-valeur pour les objets Firebase
}

// Fonction pour récupérer les données
export const fetchData = (
  path: string,
  callback: (data: FirebaseData | null) => void
): void => {
  const dbRef: DatabaseReference = ref(database, path);
  onValue(dbRef, (snapshot) => {
    const data = snapshot.val();
    callback(data);
  });
};
