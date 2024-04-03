'use client'
import { CategorieModal } from "./ModalCategorie"
import { useState, useEffect } from "react"
import { listeCategorie } from "@/Service/server"
import { TbodyCategorie } from "./TbodyCategorie"


export const CategorieGestion = ()=>{

    const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
let a
const [categories, setCategories] = useState([]);

  useEffect(() => {

    const interval = setInterval(() => {
        const fetchCategories = async () => {
            try {
              const response = await listeCategorie();
              if (response && response.data) {
                setCategories(response.data); // Supposons que response.data contient le tableau des catégories
              }
            } catch (error) {
              console.error("Erreur lors de la récupération des catégories:", error);
              // Gérez l'erreur comme vous le jugez approprié
            }
          };
      
          fetchCategories();
      }, 1000); // interroge toutes les 10 secondes
    
      return () => clearInterval(interval); // Nettoie l'intervalle lors du démontage



    
  }, []); 

    return <div className="bg-dark p-3 rounded">

<h1 className="h1 d-flex justify-content-center text-white mt-4">
    Liste des catégories
  </h1>
  <div className={'d-flex justify-content-end'}><button className="btn btn-success" onClick={()=>{window.location.href='/gestion'}}>Tableau de bord</button></div>


        <div className="d-flex justify-content-end">
            <button
             className="btn btn-secondary m-2"
             onClick={openModal}
        
             >
                 Ajouter
            </button>
         </div>
        <table className="table table-hover  table-dark">
            <thead>
                <tr>
                    <th>ID</th>
                <th>Nom de la catégorie</th>
                </tr>
                
            </thead>
            <TbodyCategorie Categories={categories}></TbodyCategorie>
        </table>
    <CategorieModal isOpen={isModalOpen} onClose={closeModal}/>
    </div>
}