import React, { useState } from "react";
import { addRole } from "@/Service/server";

export const RoleModal = ({ isOpen, onClose, onCreate }) => {
  const [roleName, setRoleName] = useState('');
  const [niveauRole, setNiveauRole] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    

    const nom = roleName;
    const niveau = Number(niveauRole); // Convertir en nombre si nécessaire

    const data = {
      nom,
      niveau,
    };
    
    // Debugging
    console.log("Envoi des données :", { nom, niveau });

    try {
        console.log(data)
      await addRole(data);
      // Si onCreate est défini, l'appeler ici
      if (onCreate) onCreate({ nom, niveau });
    } catch (error) {
      console.error("Erreur lors de la création du rôle:", error);
    }

    onClose(); // Ferme le modal après la soumission
  };

  if (!isOpen) return null;

  return (
    <div className="modal show" style={{ display: "block" }} id="RoleModal">
      <div className="modal-dialog">
        <div className="modal-content bg-dark text-white">
          <div className="modal-header">
            <h4 className="modal-title">Créer un nouveau role</h4>
            <button
              type="button"
              className="btn-close btn-close-white"
              aria-label="Close"
              onClick={onClose}
            ></button>
          </div>

          <div className="modal-body">
            <form id="roleForm" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="roleName" className="form-label">
                  Nom du role
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="roleName"
                  value={roleName}
                  onChange={(e) => setRoleName(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="niveauRole" className="form-label">
                  Niveau du role
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="niveauRole"
                  value={niveauRole}
                  onChange={(e) => setNiveauRole(e.target.value)}
                  required
                />
              </div>

              <div className="modal-footer">
                <button type="submit" className="btn btn-primary">
                  Créer
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={onClose}
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
