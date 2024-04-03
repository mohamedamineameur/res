import React, { useState, useEffect } from "react";
import styles from "./NavHead.module.css";
import { Dropdown } from "./DropDown";

export const NavHead = () => {
  const [type, setType] = useState();
  const [isUserChecked, setIsUserChecked] = useState(false); // Nouvel état pour suivre si la vérification de l'utilisateur est terminée

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setType(user.type_utilisateur.niveau);
    }
    setIsUserChecked(true); // Mettre à jour l'état une fois que la vérification est terminée
  }, []);

  if (!isUserChecked) {
    // Optionnellement, afficher un indicateur de chargement ou rien du tout
    return null; // ou <div>Chargement...</div> pour indiquer un chargement
  }

  const renderContent = () => {
    if (type === undefined) {
      return (
        <ul className="dropdown d-none d-lg-block">
          <li><a href="/">MENU</a></li>
          <li><a href="/connexion">CONNEXION</a></li>
          <li><a href="/inscription">INSCRIPTION</a></li>
        </ul>
      );
    } else if (type === 0) {
      return (
        <ul className="dropdown d-none d-lg-block">
          <li><a href="/menu">MENU</a></li>
          <li><a href="/commande">COMMANDE</a></li>
          <li><a href="/panier">PANIER</a></li>
          <li><a href="/historique">HISTORIQUE</a></li>
          <li><a href="/connexion" onClick={() => localStorage.clear()}>DECONNEXION</a></li>
        </ul>
      );
    }else if(type===1){
      return (
        <ul className="dropdown d-none d-lg-block">
          <li><a href="/">MENU</a></li>
          <li><a href="/cuisine">CUISINER</a></li>
          <li><a href="/connexion" onClick={() => localStorage.clear()}>DECONNEXION</a></li>
        </ul>
      );

    }
    
    else if (type > 1) {
      return (
        <ul className="dropdown d-none d-lg-block">
          <li><a href="/">MENU</a></li>
          <li><a href="/gestion">TABLEAU DE BORD</a></li>
          <li><a href="/connexion" onClick={() => localStorage.clear()}>DECONNEXION</a></li>
        </ul>
      );
    }
  };

  return (
    <nav className={styles.nav}>
      <Dropdown />
      {renderContent()}
    </nav>
  );
};
