// ListeCategories.js
"use client";
import { useEffect, useState } from "react";
import styles from "./ListeCategorie.module.css";
import { listeCategorie, addPanier, addPanierProduit, getPanierByUserId, viderPanier, getPanierProduit } from "@/Service/server";
import { ListeMenu } from "./ListeMenu";
import { ModalPanier } from "./MoadalPanier";

export const ListeCategories = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [listeProduit, setListeProduit] = useState([]);
  const openModal = () => {setModalOpen(true); console.log("ooooooo")}
  const closeModal = (e) => {
    e.preventDefault();
    setModalOpen(false);
    viderPanier(idpan)
    location.reload()
  };

  const [idpan, setIdPan] = useState()
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [estVide, setEstVide] = useState(true);
  const [productPan, setProductPan] = useState([]);

  useEffect(() => {
    const loadInitialData = async () => {
      const pann = await getPanierByUserId();
      const panierNonValide = pann.data.find(p => !p.valider);
      if(panierNonValide){
        console.log(panierNonValide)
      setIdPan(panierNonValide.id)
      }
      
      if (panierNonValide) {
        const panProd = await getPanierProduit(panierNonValide.id);
        //setListeProduit(panProd.data);
        const liste = panProd.data.map(p => p.produitId);
        setProductPan([...new Set(liste)]);
        setProducts([...new Set(liste)]);
        setEstVide(false);
      } else {
        setEstVide(true);
      }
    };
    loadInitialData();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await listeCategorie();
      if (response && response.data) {
        setCategories(response.data.filter(a=>a.affichage==true));
      }
    };
    fetchCategories()
    
  }, []);

  const handleToggleProduct = (productId) => {
    setProducts(current => {
      const isProductSelected = current.includes(productId);
      return isProductSelected ? current.filter(id => id !== productId) : [...current, productId];
    });
  };

  const handleAddPanier = async () => {
    if (products.length === 0) {
      console.log("Aucune case n'est cochée.");
      return;
    }
    const pann = await getPanierByUserId();
    const panierNonValide = pann.data.find(p => !p.valider);
    if (!panierNonValide) {
      // Supposons que `addPanier` crée un nouveau panier
      const response = await addPanier();
    
      // Récupérer à nouveau le panier pour obtenir le panier nouvellement créé
      const panne = await getPanierByUserId();
      const panierNonValides = panne.data.find(p => !p.valider);
      
    
      // Créer un tableau de promesses pour l'ajout de chaque produit au panier
      const promises = products.map(productId => addPanierProduit(panierNonValides.id, productId));
    
      // Utiliser Promise.all pour attendre la résolution de toutes ces promesses
      await Promise.all(promises);
      setIdPan(panierNonValides.id)
    
      // Après que tous les produits sont ajoutés, récupérer les produits du panier
      const panProd = await getPanierProduit(panierNonValides.id);
      console.log(panProd);
      setListeProduit(panProd.data);
    
      console.log(listeProduit);
    
      openModal();
    }
     else {
        
      await Promise.all(products.map(productId => addPanierProduit(panierNonValide.id, productId)));
      const panProd = await getPanierProduit(panierNonValide.id);
      setListeProduit(panProd.data);
      console.log("yoyo")
      console.log(panProd.data[0].produitId)
     openModal();
    }
    setProducts([]); // Optionally reset selected products after adding to cart
  };

  const handleViderPanier = async () => {
    const pann = await getPanierByUserId();
    const panierNonValide = pann.data.find(p => !p.valider);
    if (panierNonValide) {
      await viderPanier(panierNonValide.id);
      setEstVide(true);
      setProductPan([]);
      setProducts([]); // Reset selected products after emptying the cart
    }
  };

  const miseAJourDonneesPanier =  () => {
    const interval = setInterval(async()=>{const panProd = await getPanierProduit(idpan);
      console.log('Mise à jour des données du panier', panProd.data); 
      setListeProduit(panProd.data)},  1000)
      return () => clearInterval(interval); // Nettoie l'intervalle lors du démontage

  };
  
  

  return (
    <div className="container-fluid d-flex flex-column align-items-center w-75">
      {categories.filter(cat => cat.produits && cat.produits.length > 0).map(cat => (
        <div key={cat.id} className={styles.div}>
          <h1 className="text-muted">Catégorie: {cat.nom}</h1>
          <ListeMenu produits={cat.produits} onToggleProduct={handleToggleProduct} productPan={productPan} />
        </div>
      ))}
      <button className="btn btn-warning mt-3 w-25" onClick={handleAddPanier}>
        Aller au panier
      </button>
      {!estVide && <button className="btn btn-danger mt-3 w-25" onClick={handleViderPanier}>Vider le panier</button>}

     
      <ModalPanier isOpen={isModalOpen} onClose={closeModal} Prodd={listeProduit} idp={idpan} onUpdate={miseAJourDonneesPanier} />

    </div>
  );
};
