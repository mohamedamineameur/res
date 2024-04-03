'use client'
import React, { useState } from 'react';
import { addUser } from '@/Service/server';

export const Inscription = () => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState('danger'); // Nouveau

  const { nom, prenom, email, password, confirmPassword } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setAlertMessage("Les 2 mots de passe ne correspondent pas.");
      setShowAlert(true);
      setAlertType('danger');
      return;
    } else {
      try {
        const mot_de_passe = password;
        const courriel = email;
        const dataUser = { nom, prenom, courriel, mot_de_passe };
        const response = await addUser(dataUser);
      
         window.location.href = '/verification'
      } catch (error) {
        if (error.response && error.response.status === 400) {
          // Vérifier si des erreurs de validation spécifiques sont présentes
          if (error.response.data.errors) {
            // Construire un message contenant tous les messages d'erreur de validation
            const errors = error.response.data.errors;
            const errorMessages = Object.keys(errors).map(field => `${errors[field]}`).join(" ");
            setAlertMessage(` ${errorMessages}`);
            setShowAlert(true);
            setAlertType('danger');
          } else {
            // S'il n'y a pas d'objet 'errors', utiliser le message d'erreur général
            setAlertMessage(error.response.data.message || "Erreur lors de l'inscription. Veuillez réessayer.");
            setShowAlert(true);
            setAlertType('danger');
          }
        } else {
          // Gérer les autres cas d'erreurs non liés à une réponse 400
          setAlertMessage("Une erreur est survenue. Veuillez réessayer.");
          setShowAlert(true);
          setAlertType('danger');
        }
      }
      
    }
  };

  return (
    <>
      {showAlert && (
        <div className={`alert alert-${alertType} alert-dismissible fade show m-3`}>
          <button type="button" className="btn-close" data-bs-dismiss="alert" onClick={() => setShowAlert(false)}></button>
          {alertMessage}
        </div>
      )}
    <form className={'w-50 bg-white rounded'} onSubmit={handleSubmit } noValidate>
        
        <div className='m-3 d-flex flex-column'>
        <h1 className="container-fluid d-flex justify-content-center">Inscription</h1>
            <div>
        <label className='form-label' htmlFor="nom">Nom :</label>
        <input className='form-control'
          type="text"
          id="nom"
          name="nom"
          value={nom}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label className='form-label' htmlFor="prenom">Prénom :</label>
        <input className='form-control'
          type="text"
          id="prenom"
          name="prenom"
          value={prenom}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label className='form-label' htmlFor="email">Courriel :</label>
        <input className='form-control'
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label className='form-label' htmlFor="password">Mot de passe :</label>
        <input className='form-control'
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label className='form-label' htmlFor="confirmPassword">Vérification du mot de passe :</label>
        <input className='form-control'
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
          required
        />
      </div>
      <button className='btn btn-dark w-100 mt-3' type="submit">Inscription</button>
        </div>


      
        </form>
    </>
  );
};

