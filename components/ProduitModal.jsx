import React, { useState, useEffect } from "react";
import { addProduit, listeCategorie } from "@/Service/server";

export const ProduitModal = ({ isOpen, onClose }) => {
  const [nom, setNom] = useState("");
  const [prix, setPrix] = useState("");
  const [photo, setPhoto] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategorie, setSelectedCategorie] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await listeCategorie();
        if (response && response.data) {
          setCategories(response.data);
          setSelectedCategorie(response.data[0]?.id || "");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des catégories:", error);
        setAlertMessage("Erreur lors de la récupération des catégories.");
      }
    };

    if (isOpen) {
      fetchCategories();
    }
  }, [isOpen]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const validTypes = /jpeg|jpg|png|gif/;

    if (file && validTypes.test(file.type)) {
      setPhoto(file);
      setAlertMessage("");
    } else {
      setAlertMessage("Seul les fichiers de type: jpeg, jpg, png, et gif sont acceptés.");
      setPhoto(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!photo) {
      setAlertMessage("Veuillez sélectionner une photo valide.");
      return;
    }

    const formData = new FormData();
    formData.append('nom', nom);
    formData.append('prix', prix);
    formData.append('CategorieId', selectedCategorie);
    formData.append('photo', photo);

    try {
      await addProduit(formData);
      onClose();
      // Reset du formulaire (optionnel)
      setNom("");
      setPrix("");
      setSelectedCategorie(categories[0]?.id || "");
      setPhoto(null);
    } catch (error) {
      console.error("Erreur lors de l'ajout du produit:", error);
      setAlertMessage("Erreur lors de l'ajout du produit.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal show" style={{ display: "block" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Ajouter / Modifier un Produit</h5>
            <button type="button" className="close" onClick={onClose}>&times;</button>
          </div>
          {alertMessage && <div className="alert alert-danger">{alertMessage}</div>}
          <form onSubmit={handleSubmit} className="modal-body">
            <div className="form-group">
              <label>Nom du produit</label>
              <input 
                type="text" 
                className="form-control" 
                value={nom} 
                onChange={(e) => setNom(e.target.value)} 
                required 
              />
            </div>
            <div className="form-group">
              <label>Prix</label>
              <input 
                type="number" 
                className="form-control" 
                value={prix} 
                onChange={(e) => setPrix(e.target.value)} 
                required 
              />
            </div>
            <div className="form-group">
              <label>Photo</label>
              <input 
                type="file" 
                className="form-control" 
                onChange={handleFileChange} 
              />
            </div>
            <div className="form-group">
              <label>Catégorie</label>
              <select 
                className="form-control" 
                value={selectedCategorie}
                onChange={(e) => setSelectedCategorie(e.target.value)}
                required
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.nom}
                  </option>
                ))}
              </select>
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-primary">Enregistrer</button>
              <button type="button" className="btn btn-secondary" onClick={onClose}>Annuler</button>
            </div>
          </form>
        </div>
        </div>
        </div>
)

}
