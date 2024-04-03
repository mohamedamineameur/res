import { useEffect, useState } from "react"
import { commandes } from "@/Service/server"

export const Commande = () => {
  const [listeCommande, setListeCommande] = useState([]);
  const [com, setCom] = useState(<div>Il n y a aucune commande en cours</div>);

  useEffect(() => {
    const fetchCommandes = async () => {
      const list = await commandes();      
      setListeCommande(list.data);
    };

    fetchCommandes();
    const interval = setInterval(fetchCommandes, 1000); // interroge toutes les 10 secondes
    
    return () => clearInterval(interval); // Nettoie l'intervalle lors du démontage
  }, []);

  useEffect(() => {
    const afficherCommandes = () => {
      const commandesFiltrees = listeCommande.filter(comm => comm.etatCommandeId <4);
      if (commandesFiltrees.length > 0) {

        console.log(commandesFiltrees)
        setCom(commandesFiltrees.map((comm, index) => (
          <div className=" bg-light m-3 rounded p-3" key={index}>
            <p className="text-dark fw-bold">Commande #: {comm.id}</p>
           <p className="text-warning fw-bold">{comm.description}</p>
           <p className="text-dark fw-bold">Etat:</p>  
           <p className="text-success fw-bold">{comm.etat_commande?.nom}</p> 
          </div>
        )));
      } else {
        
        setCom(<div className=" bg-light m-3 rounded p-3" >Il n y a aucune commande en cours</div>);
      }
    };

    afficherCommandes();
  }, [listeCommande]);

  return (
    <div className="d-flex justify-content-center align-items-center m-3 pt-5 mt-5">
        
      <div className="bg-dark  p-4  ">
      <h1 className="text-light m-3">Liste des commande en cours:</h1>
        {com}</div>
    </div>
  );
}
