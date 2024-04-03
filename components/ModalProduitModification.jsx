import React, { useState, useEffect } from "react";
import { updateProduit, listeCategorie,suprimerProduitDuPanier } from "@/Service/server"; 


export const ProduitModificationModal = ({ isOpen, onClose, produit }) => {
  const [nom, setNom] = useState("");
  const [prix, setPrix] = useState("");
  const [selectedCategorie, setSelectedCategorie] = useState("");
  const [photo, setPhoto] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (isOpen) {
      const fetchCategories = async () => {
        try {
          const response = await listeCategorie();
          if (response && response.data) {
            setCategories(response.data);
          }
        } catch (error) {
          console.error("Erreur lors de la récupération des catégories:", error);
        }
      };

      fetchCategories();

      // Initialiser le formulaire avec les données du produit à modifier
      if (produit) {
        setNom(produit.nom);
        setPrix(produit.prix);
        setSelectedCategorie(produit.CategorieId);
        // Note: La gestion initiale de l'image n'est pas implémentée ici
      }
    }
  }, [isOpen, produit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('id', produit.id)
    formData.append('nom', nom);
    formData.append('prix', prix);
    formData.append('CategorieId', selectedCategorie);
    if (photo) formData.append('photo', photo);

    try {
      await updateProduit(formData); // Supposer que updateProduit accepte l'ID du produit et le FormData
      onClose(); // Fermer le modal après la mise à jour réussie
    } catch (error) {
      console.error("Erreur lors de la mise à jour du produit:", error);
      // Gérer l'erreur ici, par exemple, afficher un message à l'utilisateur
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal show" style={{ display: "block" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Modifier un Produit</h5>
            <button type="button" className="close" onClick={onClose}>
              &times;
            </button>
          </div>
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
                onChange={(e) => setPhoto(e.target.files[0])} 
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
                <option value="">Sélectionnez une catégorie</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.nom}
                  </option>
                ))}
              </select>
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-primary">Enregistrer les modifications</button>
              <button type="button" className="btn btn-secondary" onClick={onClose}>Annuler</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};




/*import React, { useState, useEffect } from "react";
import { updateProduit, listeCategorie } from "@/Service/server";

export const ProduitModificationModal = ({ isOpen, onClose, produit }) => {
  const [nom, setNom] = useState(produit?.nom || "");
  const [prix, setPrix] = useState(produit?.prix || "");
  const [selectedCategorie, setSelectedCategorie] = useState(produit?.CategorieId || "");
  const [photo, setPhoto] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (isOpen) {
      const fetchCategories = async () => {
        try {
          const response = await listeCategorie();
          if (response && response.data) {
            setCategories(response.data);
          }
        } catch (error) {
          console.error("Erreur lors de la récupération des catégories:", error);
        }
      };

      fetchCategories();
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('nom', nom);
    formData.append('prix', prix);
    formData.append('CategorieId', selectedCategorie);
    if (photo) formData.append('photo', photo);

    await updateProduit(produit.id, formData); // Assurez-vous que la fonction updateProduit accepte l'ID du produit et les données du formulaire
    onClose(); // Fermer le modal après la mise à jour
  };

  if (!isOpen) return null;

  return (
    <div className="modal show" style={{ display: "block" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Modifier un Produit</h5>
            <button type="button" className="close" onClick={onClose}>
              &times;
            </button>
          </div>
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
                onChange={(e) => setPhoto(e.target.files[0])} 
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
                <option value="">Sélectionnez une catégorie</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.nom}
                  </option>
                ))}
              </select>
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-primary">
                Enregistrer les modifications
              </button>
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Annuler
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
*/