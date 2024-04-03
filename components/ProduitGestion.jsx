'use client';
import React, { useState, useEffect } from "react";
import { getAllProduits } from "@/Service/server";
import { ProduitModal } from "./ProduitModal";
import { TbodyProduit } from "./TbodyProduit";

export const ProduitGestion = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [produits, setProduits] = useState([]);

  useEffect(() => {
    // Définition de la fonction de récupération des produits
    const fetchProduits = async () => {
      try {
        const response = await getAllProduits();
        if (response && response.data) {
          setProduits(response.data);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des produits:", error);
      }
    };

    // Appel initial pour récupérer les produits
    fetchProduits();

    // Configuration de l'intervalle pour récupérer régulièrement les produits
    const interval = setInterval(fetchProduits, 1000); // Mise à jour toutes les 10 secondes

    // Fonction de nettoyage pour effacer l'intervalle lorsque le composant est démonté
    return () => clearInterval(interval);
  }, []); // Le tableau de dépendances vide s'assure que l'effet s'exécute une seule fois à l'initialisation

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div className={'container d-flex flex-column bg-secondary rounded'}>
      <h1 className={'h1 d-flex justify-content-center text-white mt-4'}>
        Liste des Produits
      </h1>
      <div className={'d-flex justify-content-end'}><button className="btn btn-success" onClick={()=>{window.location.href='/gestion'}}>Tableau de bord</button></div>

      <div className={'d-flex justify-content-end'}>
        <button className={'btn btn-dark mt-2 mb-2'} onClick={openModal}>
          Ajouter un Produit
        </button>
      </div>
      <div className="table-responsive">
      <table className={'table rounded table-sm table-striped table-hover table-dark'}>
      <thead>
  <tr>
    <th className="text-center">ID</th>
    <th className="text-center">Nom</th>
    <th className="text-center">Prix</th>
    <th className="text-center">Catégorie</th>
    <th className="text-center">Image</th>
    <th className="text-center">Action</th>
  </tr>
</thead>
        <TbodyProduit Produits={produits} />
      </table>

      </div>
      
      <ProduitModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};
