"use client"
import styles from "./DropDown.module.css";
import { useState, useEffect } from "react";

export const Dropdown = () => {
  const [type, setType] = useState();
  const [isUserChecked, setIsUserChecked] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setType(user.type_utilisateur.niveau);
    }
    setIsUserChecked(true);
  }, []);

  if (!isUserChecked) {
    return null;
  }

  const renderContent = () => {
    if (type === undefined) {
      return (
        <div className={`d-lg-none ${styles.dropdown}`}>
          <button className={'btn btn-light'}>
            &#9776;
          </button>
          <div className={styles.dropdownContent}>
            <a href="/" className="text-warning">MENU</a>
            <a href="/connexion" className="text-warning">CONNEXION</a>
            <a href="/inscription" className="text-warning">INSCRIPTION</a>
          </div>
        </div>
      );
    } else if (type === 0) {
      return (
        <div className={`d-lg-none ${styles.dropdown}`}>
          <button className={'btn btn-light'}>
            &#9776;
          </button>
          <div className={styles.dropdownContent}>
            <a href="/menu" className="text-warning">MENU</a>
            <a href="/commande" className="text-warning">COMMANDE</a>
            <a href="/panier" className="text-warning">PANIER</a>
            <a href="/historique" className="text-warning">HISTORIQUE</a>
            <a href="/connexion" className="text-warning" onClick={() => {localStorage.clear(); window.location.href='/connexion';}}>DECONNEXION</a>
          </div>
        </div>
      );
    }else if (type === 1) {
      return (
        <div className={`d-lg-none ${styles.dropdown}`}>
          <button className={'btn btn-light'}>
            &#9776;
          </button>
          <div className={styles.dropdownContent}>
            <a href="/" className="text-warning">MENU</a>
            <a href="/cuisine" className="text-warning">CUISINE</a>
            <a href="/connexion" className="text-warning" onClick={() => {localStorage.clear(); window.location.href='/connexion';}}>DECONNEXION</a>
          </div>
        </div>
      );
    }
       else if (type > 1) {
      return (
        <div className={`d-lg-none ${styles.dropdown}`}>
          <button className={'btn btn-light'}>
            &#9776;
          </button>
          <div className={styles.dropdownContent}>
            <a href="/" className="text-warning">MENU</a>
            <a href="/gestion" className="text-warning">TABLEAU DE BORD</a>
            <a href="/connexion" className="text-warning" onClick={() => {localStorage.clear(); window.location.href='/connexion';}}>DECONNEXION</a>
          </div>
        </div>
      );
    }
  };

  return <>{renderContent()}</>;
}
