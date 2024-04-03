'use client'

import { useState, useEffect } from "react"
import { utilisateurs } from "@/Service/server"
import { TbodyUtilisateur } from "./TbodyUtilisateur"


export const UtilisateurGestion = ()=>{

   

const [users, setUsers] = useState([]);

  useEffect(() => {

    const interval = setInterval(() => {
        const fetchUsers = async () => {
            try {
              const response = await utilisateurs();
              console.log(response.data)
              if (response && response.data) {
                setUsers(response.data); // Supposons que response.data contient le tableau des catégories
              }
            } catch (error) {
              console.error("Erreur lors de la récupération des catégories:", error);
              // Gérez l'erreur comme vous le jugez approprié
            }
          };
      
          fetchUsers();
      }, 1000); // interroge toutes les 10 secondes
    
      return () => clearInterval(interval); // Nettoie l'intervalle lors du démontage



    
  }, []); 

    return <div className="bg-dark p-3 rounded">

<h1 className="h1 d-flex justify-content-center text-white mt-4">
    Liste des utilisateurs
  </h1>
<div className={'d-flex justify-content-end'}><button className="btn btn-success" onClick={()=>{window.location.href='/gestion'}}>Tableau de bord</button></div>
      
        <table className="table table-hover  table-dark">
            <thead>
                <tr>
                    <th>ID</th>
                <th>Nom </th>
                <th>Prénom </th>

                <th>Role</th>
                <th>Action</th>
                </tr>
                
            </thead>
            <TbodyUtilisateur Users={users}/>
        </table>
    
    </div>
}