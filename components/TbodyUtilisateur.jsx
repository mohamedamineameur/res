import { useState, useEffect } from 'react';

import { updateUser, listeRole } from '@/Service/server';

export const TbodyUtilisateur = ({ Users }) => {
    
    const [listeRoles, setListeRole] = useState([]);
    // Modification ici: utiliser un objet pour suivre les sélections par ID utilisateur
    const [selections, setSelections] = useState({});
   
    useEffect(() => {
        const fetchRoles = async () => {
          const response = await listeRole();
          if (response && Array.isArray(response.data)) {
              setListeRole(response.data);
          }
        };
        fetchRoles();
    }, []);
      
    if (!Array.isArray(Users)) return null;

    // Fonction pour gérer le changement de sélection
    const handleSelectionChange = (userId, roleId) => {
        setSelections(prev => ({...prev, [userId]: roleId}));
        // Vous pouvez également mettre à jour typeId ici si nécessaire
    }

    return (
        <tbody>
            {Users.map((user) => (
                <tr key={user.id}> 
                    <td>{user.id}</td>
                    <td>{user.nom}</td>
                    <td>{user.prenom}</td>
                    <td>{user.type_utilisateur.nom}</td>
                    <td><button className={"btn btn-warning"} onClick={() => updateUser(user.id, selections[user.id])}>Modifier</button></td>
                    <td>  
                        <select 
                            className="form-control" 
                            value={selections[user.id] || ''} // Utiliser la sélection spécifique à l'utilisateur ou une chaîne vide si aucune sélection
                            onChange={(e) => handleSelectionChange(user.id, e.target.value)}
                            required
                        >
                            <option value="">Sélectionnez un rôle</option>
                            {listeRoles.map((role) => (
                                <option key={role.id} value={role.id}>
                                    {role.nom}
                                </option>
                            ))}
                        </select>
                    </td>
                </tr>
            ))}
        </tbody>
    );
};
