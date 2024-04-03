import React, { useState } from "react";
import { addCategory } from "@/Service/server";

export const CategorieModal = ({ isOpen, onClose, onCreate }) => {
  const [categoryName, setCategoryName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nom= categoryName
    await addCategory(nom)    
    //await onCreate(categoryName); // Fonction pour gérer la création de la catégorie
    onClose(); // Ferme le modal après la soumission
  };

  if (!isOpen) return null;

  return (
    <div className="modal show" style={{ display: "block" }} id="categoryModal">
      <div className="modal-dialog">
        <div className="modal-content bg-dark text-white">
          <div className="modal-header">
            <h4 className="modal-title">Créer une nouvelle catégorie</h4>
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
                  onChange={(e) => setCategoryName(e.target.value)}
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


