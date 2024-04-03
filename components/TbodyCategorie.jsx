import { useState } from 'react';
import { CategorieModificationModal } from "./ModalCategorieModification";
import { updateCategory } from '@/Service/server';
export const TbodyCategorie = ({ Categories }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null); // État pour suivre la catégorie sélectionnée
    const [affichage, setAffichage]= useState(true)

    const openModal = (category) => {
        setSelectedCategory(category); // Mettre à jour l'état avec la catégorie sélectionnée
        setModalOpen(true);
    };
    const closeModal = () => {
        setModalOpen(false);
        setSelectedCategory(null); // Réinitialiser la catégorie sélectionnée lors de la fermeture du modal
    };
    const formaData = new FormData()
    return (
        <tbody>
            {Categories.map((category) => (
                <tr key={category.id}> 
                    <td>{category.id}</td>
                    <td>{category.nom}</td>
                    <td>
                        <button className={"btn btn-warning m-1 w-50"} onClick={() => openModal(category)} >Modifier</button>
                        <button className={"btn btn-success m-1 w-50"} onClick={
                
                
                async() =>{
                  
                  if(affichage){


                    const categoryToUpdate = {
                        id: category.id, // Utiliser 'idd' comme l'identifiant de la catégorie à mettre à jour
                        affichage // Le nouveau nom de la catégorie
                      };
                setAffichage(false)
                formaData.append('affichage',affichage)
                formaData.append('id',category.id)
                await updateCategory(categoryToUpdate)



              }else{
                const categoryToUpdate = {
                    id: category.id, // Utiliser 'idd' comme l'identifiant de la catégorie à mettre à jour
                    affichage // Le nouveau nom de la catégorie
                  };
                setAffichage(true)
                formaData.append('affichage',affichage)
                formaData.append('id',category.id)
                await updateCategory(categoryToUpdate)
              }
              
              } } >{category.affichage ? "Désactiver" : "Activer"}</button>
                    
                    </td>
                </tr>
            ))}
            {selectedCategory && <CategorieModificationModal isOpen={isModalOpen} onClose={closeModal} idd={selectedCategory.id} name={selectedCategory.nom} />}
        </tbody>
    );
};
