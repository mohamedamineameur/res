'use client'

import { useState, useEffect } from "react"
import { getCommandes } from "@/Service/server"
import { TbodyCommande } from "./TbodyCommande"


export const Cuisine = ()=>{
const [commandes, setCommandes] = useState([])
const [affichage, setAffichage] = useState(undefined)
   
let a


  useEffect(() => {

    const interval = setInterval(() => {
        const fetchCategories = async () => {
            try {
              const response = await getCommandes();
              if (response && response.data) {
                setCommandes(response.data); // Supposons que response.data contient le tableau des catégories
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

    return <div className="bg-dark p-3 rounded w-75">

<h1 className="h1 d-flex justify-content-center text-white mt-4 ">
    Liste des commandes
  </h1>


        <table className="table table-hover  table-dark ">
            <thead>
                <tr>
                    <th>ID</th>
                <th>Description</th>
                <th>Action</th>
                </tr>
                
            </thead>
            <TbodyCommande commandes={commandes}></TbodyCommande>
        </table>
    
    </div>
}