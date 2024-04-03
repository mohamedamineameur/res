'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './Menu.module.css';

export const Menu = ({ liste}) => {
   

   console.log(liste)
    return (
        <div>
            {liste.filter(produit => produit.affichage).map((produit) => (
                <div key={produit.id} className={styles.div}>
                    <p className={'w-100 d-flex justify-content-center text-danger fw-bold fs-2'}>{produit.nom}</p>
                    <Image className={'border-dark'} src={produit.photo} alt={produit.nom} width={500} height={500} />
                    <div className={'rounded-4 h-50'}>
                      
                        <p className={'w-100 d-flex justify-content-center text-muted fw-bold fs-3 mb-3'}>Prix: {produit.prix} $</p>
                    </div>
                </div>
            ))}
        </div>
    );
};
