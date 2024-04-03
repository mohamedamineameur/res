import axioss from './axios';
import axios from 'axios';

// Définir une constante pour l'URL de base
const API_BASE_URL = 'https://restfull-a3g4.onrender.com';

export const addUser = async (userData) => {
    console.log(userData);
    const result = await axios.post(`${API_BASE_URL}/utilisateur/`, userData);
    return result.data;
};

export const login = async (courriel, mot_de_passe) => {
    try {
        console.log('*******************************************');
        const loginData = { courriel, mot_de_passe };
        console.log(loginData);
        const response = await axios.post(`${API_BASE_URL}/login/`, loginData);
        if (response.status === 200) {
            const { data, token } = response.data;
            return { data, token };
        } else {
            throw new Error('Login failed');
        }
    } catch (error) {
        console.error('Login error:', error.message);
        throw error;
    }
};

export const getUserById = async () => {
    const response = await axioss.get(`${API_BASE_URL}/utilisateur/by`);
    if (response.status === 200) {
        console.log("Réponse complète du serveur:", response);
        return response;
    }
};

export const addCategory = async (nom) => {
    const requestBody = { nom: nom };
    console.log(nom);
    const response = await axioss.post(`${API_BASE_URL}/categorie/`, requestBody);
    if (response.status === 200) {
        console.log("Réponse complète du serveur:", response);
        return response;
    }
};

export const listeCategorie = async () => {
    const response = await axioss.get(`${API_BASE_URL}/categorie/`);
    if (response.status === 200) {
        return response;
    }
};

export const getAllProduits = async () => {
    const response = await axios.get(`${API_BASE_URL}/produit/`);
    console.log(response);
    return response;
};

export const addProduit = async (data) => {
    console.log(data.nom);
    return await axioss.post(`${API_BASE_URL}/produit/`, data);
};

export const addRole = async (data) => {
    console.log(data);
    return await axioss.post(`${API_BASE_URL}/typeutilisateur/`, JSON.stringify(data), {
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

export const listeRole = async () => {
    return await axioss.get(`${API_BASE_URL}/typeutilisateur/`);
};

export const updateRole = async (data) => {
    return await axioss.put(`${API_BASE_URL}/typeutilisateur/updatebyid/`, JSON.stringify(data), {
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

export const updateCategory = async (data) => {
    console.log("hello");
    try {
        const response = await axioss.put(`${API_BASE_URL}/categorie/`, JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log("Réponse après mise à jour :", response);
        return response;
    } catch (error) {
        console.error("Erreur lors de la mise à jour de la catégorie :", error);
        throw error;
    }
};

export const updateProduit = async (data) => {
    try {
        const response = await axioss.put(`${API_BASE_URL}/produit/`, data);
        console.log("Réponse après mise à jour :", response);
        return response;
    } catch (error) {
        console.error("Erreur lors de la mise à jour du produit :", error);
        throw error;
    }
};

export const getPanierByUserId = async () => {
    return await axioss.get(`${API_BASE_URL}/panier/user`);
};

export const addPanier = async () => {
    return await axioss.post(`${API_BASE_URL}/panier/`);
};

export const addPanierProduit = async (panierId, produitId) => {
    const data = {panierId, produitId};
    return await axioss.post(`${API_BASE_URL}/panier_produit/`, data);
};

export const viderPanier = async (panierId) => {
    const donnée = {panierId};
    console.log(donnée);
    return await axioss.delete(`${API_BASE_URL}/panier_produit/`, {
        data: donnée
    });
};

export const getPanierProduit = async (panierId) => {
    const params = { panierId };
    console.log("helloo");
    return await axioss.get(`${API_BASE_URL}/panier_produit/`, { params });
};

export const suprimerProduitDuPanier = async (produitId, panierId) => {
    const donnée = {produitId, panierId};
    console.log(donnée);
    return await axioss.delete(`${API_BASE_URL}/panier_produit/all`, {
        data: donnée
    });
};

export const supUnProduit = async (produitId, panierId) => {
    const donnée = {produitId, panierId};
    console.log("*************************************************************************************");
    return await axioss.delete(`${API_BASE_URL}/panier_produit/sup`, {
        data: donnée
    });
};

export const commande = async (panierId) => {
    const donnée = {panierId};
    console.log(donnée);
    console.log("*************************************************************************************");
    return await axioss.post(`${API_BASE_URL}/commande/`, {
        data: donnée
    });
};

export const getCommandes = async () => {
    return await axioss.get(`${API_BASE_URL}/commande/`);
};

export const updateCommande = async (id, etatCommandeId) => {
    const donnée = {id, etatCommandeId};
    console.log(donnée);
    console.log("*************************************************************************************");
    return await axioss.put(`${API_BASE_URL}/commande/`, {id, etatCommandeId});
};

export const commandes = async () => {
    return await axioss.get(`${API_BASE_URL}/commande/byid`);
};

export const utilisateurs = async () => {
    return await axioss.get(`${API_BASE_URL}/utilisateur/`);
};

export const updateUser = async (id, typeUtilisateurId) => {
    return await axioss.put(`${API_BASE_URL}/utilisateur/put`, {id, typeUtilisateurId});
};

export const updatePanier = async (id, valider) => {
    return await axioss.put(`${API_BASE_URL}/panier/put`, {id, valider});
};
