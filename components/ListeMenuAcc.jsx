'use client'
import React from 'react'
import styles from './ListeMenu.module.css'
import { Menu } from './menuAcc'

export const ListeMenu = ({ produits}) => {
    if (!produits || produits.length === 0) return <p>Aucun produit disponible.</p>;

    return (
        <div className={styles.div}>
            <Menu liste={produits} />
        </div>
    );
}
