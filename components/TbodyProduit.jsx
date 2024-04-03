import React, { useState } from 'react';
import { ProduitModificationModal } from './ModalProduitModification'; 
import { updateProduit, listeCategorie } from "@/Service/server"; 

export const TbodyProduit = ({ Produits }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedProduit, setSelectedProduit] = useState(null);
  const [affichage, setAffichage]= useState(true)
  const openModal = (produit) => {
    setSelectedProduit(produit); // Stocker le produit sélectionné
    setModalOpen(true); // Ouvrir le modal
  };
  const formaData = new FormData()
  const closeModal = () => {
    setModalOpen(false);
    setSelectedProduit(null); // Réinitialiser le produit sélectionné lors de la fermeture du modal
  };

  return (
    <>
      <tbody>
        {Produits.map((produit) => (
          <tr key={produit.id}>
            <td className="text-center">{produit.id}</td>
            <td className="text-center">{produit.nom}</td>            
            <td className="text-center">{produit.prix}</td>
            <td className="text-center">{produit.Categorie.nom}</td>
            <td className="text-center"><img className={'rounded-5 m-2 border border-3'} src={produit.photo} alt={produit.nom} width='200px' height='auto' /></td>
            <td className="text-center">
              <button className={"btn btn-warning m-5 w-50"} onClick={() => openModal(produit)} >Modifier</button>
              <button className={"btn btn-success m-5 w-50"} onClick={
                
                
                async() =>{
                  
                  if(affichage){
                setAffichage(false)
                formaData.append('affichage',affichage)
                formaData.append('id',produit.id)
                await updateProduit(formaData)



              }else{
                setAffichage(true)
                formaData.append('affichage',affichage)
                formaData.append('id',produit.id)
                await updateProduit(formaData)
              }
              
              } } >{produit.affichage ? "Désactiver" : "Activer"}</button>
            
            </td>
            
          </tr>
        ))}
      </tbody>
      {isModalOpen && selectedProduit && (
        <ProduitModificationModal
          isOpen={isModalOpen}
          onClose={closeModal}
          produit={selectedProduit}
        />
      )}
    </>
  );
};
