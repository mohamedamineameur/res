'use client'
import React from 'react'
import styles from './ListeMenu.module.css'
import { Menu } from './Menu'

export const ListeMenu = ({ produits, onToggleProduct, productPan }) => {
    if (!produits || produits.length === 0) return <p>Aucun produit disponible.</p>;

    return (
        <div className={styles.div}>
            <Menu liste={produits} onToggleProduct={onToggleProduct} productPan={productPan} />
        </div>
    );
}
