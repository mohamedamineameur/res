'use client'
import { RoleModal } from "./RoleModale"
import { useState, useEffect } from "react"
import { listeRole } from "@/Service/server"
import { TbodyRole } from "./TbodyRole"


export const RoleGestion = ()=>{

    const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
let a
const [roles, setRoles] = useState([]);

  useEffect(() => {

    const interval = setInterval(() => {
        const fetchRoles = async () => {
            try {
              const response = await listeRole();
              if (response && response.data) {
                setRoles(response.data); // Supposons que response.data contient le tableau des catégories
              }
            } catch (error) {
              console.error("Erreur lors de la récupération des catégories:", error);
              // Gérez l'erreur comme vous le jugez approprié
            }
          };
      
          fetchRoles();
      }, 100); // interroge toutes les 10 secondes
    
      return () => clearInterval(interval); // Nettoie l'intervalle lors du démontage



    
  }, []); 

    return <div className="bg-dark p-3 rounded">

<h1 className="h1 d-flex justify-content-center text-white mt-4">
    Liste des roles
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
                <th>Nom du role</th>

                <th>Niveau du role</th>
                <th>Action</th>
                </tr>
                
            </thead>
            <TbodyRole Roles={roles}/>
        </table>
    <RoleModal isOpen={isModalOpen} onClose={closeModal}/>
    </div>
}