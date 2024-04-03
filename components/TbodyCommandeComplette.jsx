import { updateCommande } from "@/Service/server";
export const TbodyCommandeComplette = ({ commandes }) => {
   

    return (
        <tbody>
            {commandes.map((commande) => (
                <tr key={commande.id}> 
                    <td>{commande.id}</td>
                    <td>{commande.description}</td>
                    
                    <td>{commande.etat_commande.nom}</td>

                </tr>
            ))}
           
        </tbody>
    );
};
