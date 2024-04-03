import React, { useState, useEffect } from "react";
import { updateCategory } from "@/Service/server"; // Assurez-vous que cette fonction existe et est configurée pour recevoir un objet contenant `id` et `nom`

export const CategorieModificationModal = ({ isOpen, onClose, idd, name }) => {
  const [categoryName, setCategoryName] = useState('');

  // Initialiser categoryName avec la valeur de name quand le modal s'ouvre ou quand name change
  useEffect(() => {
    setCategoryName(name);
  }, [name]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const categoryToUpdate = {
      id: idd, // Utiliser 'idd' comme l'identifiant de la catégorie à mettre à jour
      nom: categoryName // Le nouveau nom de la catégorie
    };

    try {
        console.log("Mise à jour de la catégorie avec :", categoryToUpdate);
        const result = await updateCategory(categoryToUpdate);
        console.log("Résultat de la mise à jour :", result);
        console.log("OK");
        onClose(); // Fermer le modal après la mise à jour réussie
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
            <h4 className="modal-title">Modification de la catégorie</h4>
            <button type="button" className="btn-close btn-close-white" aria-label="Close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="categoryName" className="form-label">Nom de la catégorie</label>
                <input
                  type="text"
                  className="form-control"
                  id="categoryName"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  required
                />
              </div>

              <div className="modal-footer">
                <button type="submit" className="btn btn-primary">Modifier</button>
                <button type="button" className="btn btn-danger" onClick={onClose}>Annuler</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
