'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './Menu.module.css';

export const Menu = ({ liste, onToggleProduct, productPan }) => {
    // Map pour suivre l'état coché de chaque produit basé sur son ID
    const [checkedItems, setCheckedItems] = useState(new Map());

    useEffect(() => {
        // Mise à jour de l'état coché basé sur productPan pour tous les produits
        const updatedCheckedItems = new Map();
        liste.forEach(produit => {
            updatedCheckedItems.set(produit.id, productPan.includes(produit.id));
        });
        setCheckedItems(updatedCheckedItems);
    }, [liste, productPan]);

    const handleCheckboxChange = (id) => {
        const newCheckedItems = new Map(checkedItems);
        newCheckedItems.set(id, !newCheckedItems.get(id)); // Toggle
        setCheckedItems(newCheckedItems);
        onToggleProduct(id); // Informer le parent du changement
    };

    return (
        <div>
            {liste.filter(produit => produit.affichage).map((produit) => (
                <div key={produit.id} className={styles.div}>
                    <p className={'w-100 d-flex justify-content-center text-danger fw-bold fs-2'}>{produit.nom}</p>
                    <Image className={'border-dark'} src={produit.photo} alt={produit.nom} width={500} height={500} />
                    <div className={'rounded-4 h-50'}>
                        <div>
                            <input
                                type="checkbox"
                                id={`checkbox-${produit.id}`}
                                className={styles.s}
                                onChange={() => handleCheckboxChange(produit.id)}
                                checked={checkedItems.get(produit.id) || false} // Utilisation de Map pour l'état coché
                            />
                            <label htmlFor={`checkbox-${produit.id}`} className={'d-flex justify-content-center text-dark fw-bold fs-5'}>Ajouter au panier</label>
                        </div>
                        <p className={'w-100 d-flex justify-content-center text-muted fw-bold fs-3 mb-3'}>Prix: {produit.prix} $</p>
                    </div>
                </div>
            ))}
        </div>
    );
};
