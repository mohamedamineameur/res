"use client";
import { useEffect, useState } from "react";
import styles from "./ListeCategorie.module.css";
import { listeCategorie } from "@/Service/server";
import { ListeMenu } from "./ListeMenuAcc";

export const ListeCategoriesAcc = ({ setPage }) => {
  const [listeProduit, setListeProduit] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await listeCategorie();
      const listeActive = response.data.filter(a => a.affichage==true)
      if (response && response.data) {
        setListeProduit(listeActive);
      }
    };
    fetchCategories();
  }, []);

 
  return (
    <div className="container-fluid d-flex flex-column align-items-center w-75">
      {listeProduit.filter(cat => cat.produits && cat.produits.length > 0).map(cat => (
        <div key={cat.id} className={styles.div}>
          <h1 className="text-muted">Catégorie: {cat.nom}</h1>
          <ListeMenu produits={cat.produits} />
        </div>
      ))}
      {/* Bouton mis à jour avec type="button" pour éviter tout comportement de soumission par défaut dans un contexte de formulaire */}
      <button type="button" className="btn btn-warning mt-3 w-50" onClick={()=>{window.location.href='/connexion'}}>
        Connecter vous pour commander
      </button>
    </div>
  );
};
