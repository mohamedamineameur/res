import React, { useState, useEffect } from "react";
import { updateUser, listeRole } from "@/Service/server"; // Assurez-vous que cette fonction existe et est correctement implémentée

export const UtilisateurModificationModal = ({ isOpen, onClose, idd, name }) => {
  const [typeId, setTypeId] = useState(name);
  

  useEffect(() => {
    if(name) {
      setTypeId(name);
    }
  }, [name]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nom = categoryName;

    try {
      console.log("Envoi des données de modification :", { idd, typeId });
      await updateUser({ id: idd, nom }); // Assurez-vous que cette fonction accepte un objet avec id et nom
      onClose(); // Ferme le modal après la soumission
    } catch (error) {
      console.error("Erreur lors de la modification de la catégorie:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal show" style={{ display: "block" }} id="categoryModal">
      <div className="modal-dialog">
        <div className="modal-content bg-dark text-white">
          <div className="modal-header">
            <h4 className="modal-title">Modifier la catégorie</h4>
            <button
              type="button"
              className="btn-close btn-close-white"
              aria-label="Close"
              onClick={onClose}
            ></button>
          </div>

          <div className="modal-body">
            <form id="categoryForm" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="categoryName" className="form-label">
                  Nom de la catégorie
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="categoryName"
                  value={categoryName}
                  onChange={(e) => setTypeId(e.target.value)}
                  required
                />
              </div>

              <div className="modal-footer">
                <button type="submit" className="btn btn-primary">
                  Modifier
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
