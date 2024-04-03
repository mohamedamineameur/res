import React, { useState, useEffect } from "react";
import { commande, login } from "@/Service/server.js";

import styles from "./Connexion.module.css";

export const Connexion = () => {
  const [admin, setAdmin] = useState(false);
  const [tokenn, setToken] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const handleUserChange = () => {
      const Token = localStorage.getItem("clientToken");
      console.log("ceci est : "+ Token);
      if (Token) {
        setToken(true);
      }

      const userDataString = localStorage.getItem("user");
      if (userDataString) {
        const userData = JSON.parse(userDataString);
        const number = userData?.type_utilisateur?.niveau;
        setAdmin(number === 3);
        
        console.log(userData.courriel);
      }
    };

    handleUserChange(); // Exécution initiale
    window.addEventListener("storage", handleUserChange);

    return () => {
      window.removeEventListener("storage", handleUserChange);
    };
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const courriel = username;
    const mot_de_passe = password;

    try {
      const { data, token } = await login(courriel, mot_de_passe);
      localStorage.setItem("clientToken", token);
      localStorage.setItem("user", JSON.stringify(data));
      window.location.href = '/redirection';
    } catch (error) {
      setAlertMessage(error.response.data.message || "Erreur lors de la connexion");
      setShowAlert(true);
    }
  };

  return (
    <>
      {showAlert && (
        <div className="alert alert-danger alert-dismissible">
          <button type="button" className="btn-close" data-bs-dismiss="alert" onClick={() => setShowAlert(false)}></button>
          <strong>Attention!</strong> {alertMessage}
        </div>
      )}
      <form className="w-50 bg-white rounded" onSubmit={handleSubmit} method="post">
        <div className="m-3 d-flex flex-column">
          <h1 className="container-fluid d-flex justify-content-center">Connexion</h1>
          <div>
            <label className="form-label" htmlFor="username">Courriel:</label>
            <input
              className="form-control"
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="form-label mt-3" htmlFor="password">Mot de passe:</label>
            <input
              className="form-control"
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="btn btn-dark w-100 mt-3" type="submit">Connexion</button>
        </div>
        <a href="/inscription" className="container-fluid d-flex justify-content-center m-3" >Vous n'avez pas de compte ?</a>
      </form>
    </>
  );
};
