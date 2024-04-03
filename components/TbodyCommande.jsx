import { updateCommande } from "@/Service/server";
export const TbodyCommande = ({ commandes }) => {
   

    return (
        <tbody>
  {commandes.filter(commande => commande.etatCommandeId != 4).length > 0 ? (
    commandes.filter(commande => commande.etatCommandeId != 4).map((commande) => (
      <tr key={commande.id}> 
        <td>{commande.id}</td>
        <td>{commande.description}</td>
        
        <td className="w-25">
          <button className={"btn btn-warning w-75 h-25"} onClick={async() => {
            if(commande.etat_commande.id === 1){
              updateCommande(commande.id, 2)
            } else if(commande.etat_commande.id === 2){
              updateCommande(commande.id, 3)
            } else if(commande.etat_commande.id === 3){
              updateCommande(commande.id, 4)
            }
          }}>
            {commande.etat_commande.id === 1 ? 'Démarrer la cuisine' :
             commande.etat_commande.id === 2 ? 'Finaliser la cuisine et passer à la livraison' :
             commande.etat_commande.id === 3 ? 'Finaliser Livraison' : ''}
          </button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="3">
        <div className="bg-light m-3 rounded p-3 text-dark text-center">Il n'y a aucune commande à préparer</div>
      </td>
    </tr>
  )}
</tbody>

    );
};
