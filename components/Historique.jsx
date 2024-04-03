import { useEffect, useState } from "react"
import { commandes, updatePanier } from "@/Service/server"

export const HistoriqueCommande = () => {
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
      const commandesFiltrees = listeCommande.filter(comm => comm.etatCommandeId ===4);
      if (commandesFiltrees.length > 0) {

        console.log(commandesFiltrees)
        setCom(commandesFiltrees.map((comm, index) => (
          <div className=" bg-light m-3 rounded p-3" key={index}>
            <p className="text-dark fw-bold">Commande #: {comm.id}</p>
           <p className="text-warning fw-bold">{comm.description}</p>
           <button className="btn btn-success" onClick={async()=>{await updatePanier(comm.panierId, false); window.location.href= 'panier' }}>Recommander</button>
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
      <h1 className="text-light m-3">Historique des ancienne commandes:</h1>
        {com}</div>
    </div>
  );
}
