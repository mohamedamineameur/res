import { useState } from 'react';
import {RoleModificationModal} from './RoleModaleModifaction'

export const TbodyRole = ({ Roles }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedRole, setSelectedRole] = useState(null); // Ajout d'un état pour suivre le rôle sélectionné

    const openModal = (role) => {
        setSelectedRole(role); // Mettre à jour l'état avec le rôle sélectionné
        setModalOpen(true);
    };
    const closeModal = () => {
        setModalOpen(false);
        setSelectedRole(null); // Réinitialiser le rôle sélectionné lors de la fermeture du modal
    };

    return (
        <tbody>
            {Roles.map((role) => (
                <tr key={role.id}> 
                    <td>{role.id}</td>
                    <td>{role.nom}</td>
                    <td>{role.niveau}</td>
                    <td ><button className={"btn btn-warning"} onClick={() => openModal(role)} >Modifier</button></td>
                </tr>
            ))}
            {selectedRole && <RoleModificationModal isOpen={isModalOpen} onClose={closeModal} idd={selectedRole.id} name={selectedRole.nom} level={selectedRole.niveau}/>}
        </tbody>
    );
};
