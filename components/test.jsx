'use client';
import { useState } from 'react';
import { getUserById } from "@/Service/server";

export const Test = () => {
    const [omar, setOmar] = useState(''); // État pour stocker la valeur de 'omar'

    const essai = async () => {
        try {
            const reponse = await getUserById();
            console.log("Réponse complète du serveur:", reponse);
            // Assurez-vous de l'existence des propriétés avant d'accéder à 'courriel'
            if (reponse && reponse.data) {
                console.log("Courriel:", reponse.data.courriel);
                setOmar(reponse.data.courriel); // Mise à jour de l'état avec la nouvelle valeur
            } else {
                // Gérer le cas où 'data' n'est pas présent dans la réponse
                console.error("La structure de la réponse n'est pas celle attendue");
            }
        } catch (error) {
            console.error("Erreur lors de la récupération des données :", error);
        }
    };

    return (
        <div className="bg-dark">
            <button className="btn btn-primary" onClick={essai}>Clique</button>
            <p className='text-primary' >Courriel: {omar}</p> {/* Utilisation de l'état 'omar' */}
        </div>
    );
};
