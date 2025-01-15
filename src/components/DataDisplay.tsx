import React, { useEffect, useState } from "react";
import { fetchData, FirebaseData } from "../services/database";

const DataDisplay: React.FC = () => {
  const [data, setData] = useState<FirebaseData | null>(null);

  useEffect(() => {
    // Récupère les données depuis Firebase
    fetchData("chemin/vers/tes/donnees", (retrievedData) => {
      setData(retrievedData);
    });
  }, []);

  return (
    <div>
      <h1>Liste des Données</h1>
      {data ? (
        <ul>
          {Object.entries(data).map(([key, value]) => (
            <li key={key}>
              <strong>{key}</strong>: {JSON.stringify(value)}
            </li>
          ))}
        </ul>
      ) : (
        <p>Chargement des données...</p>
      )}
    </div>
  );
};

export default DataDisplay;
