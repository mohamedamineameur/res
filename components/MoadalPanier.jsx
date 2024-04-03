

import React, { useState, useEffect } from "react";
import {
  viderPanier,
  suprimerProduitDuPanier,
  addPanierProduit,
  supUnProduit,
  commande
} from "@/Service/server";

export const ModalPanier = ({
  isOpen,
  onClose,
  Prodd = [],
  idp,
  onUpdate,
}) => {
  const [reload, setReload] = useState(false);
  const [adresse, setAdresse] = useState("");
  const [ville, setVille] = useState("");
  const [province, setProvince] = useState("");
  const [codePostal, setCodePostal] = useState("");
  const [pays, setPays] = useState("Canada");
  const [nomCarte, setNomCarte] = useState("");
  const [numCarte, setNumCarte] = useState("");
  const [dateExp, setDateExp] = useState("");
  const [cvv, setCvv] = useState("");
  const [produitsUniques, setProduitsUniques] = useState([]);
  const [erreurs, setErreurs] = useState({});


  useEffect(() => {
    const comptage = Prodd.reduce((acc, produit) => {
      const id = produit.Produit.id;
      if (!acc[id]) {
        acc[id] = { ...produit, quantite: 1 };
      } else {
        acc[id].quantite += 1;
      }
      return acc;
    }, {});

    setProduitsUniques(Object.values(comptage));
  }, [Prodd, reload]);

  const handleReload = () => setReload(!reload);

  const total = produitsUniques.reduce(
    (acc, produit) => acc + produit.Produit.prix * produit.quantite,
    0
  );

  if (!isOpen) return null;
  const validateForm = () => {
    let errors = {};
    const regexAdresse = /^[\w\s,.-]{6,}$/;
    const regexVilleProvince = /^[a-zA-Z\s-]{2,}$/;
    const regexCodePostal = /^[A-Za-z]\d[A-Za-z]\s?\d[A-Za-z]\d$/;
    const regexPays = /^[a-zA-Z\s-]{2,}$/;
    const regexNomCarte = /^[a-zA-Z\s-]{5,}$/;
    const regexNumCarte = /^\d{4}\s\d{4}\s\d{4}\s\d{4}$/;

    const regexDateExp = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
    const regexCvv = /^\d{3}$/;

    if (!regexAdresse.test(adresse)) errors.adresse = "Adresse invalide.";
    if (!regexVilleProvince.test(ville)) errors.ville = "Ville invalide. ";
    if (!regexVilleProvince.test(province)) errors.province = "Province invalide. ex: QC";
    if (!regexCodePostal.test(codePostal)) errors.codePostal = "Code postal invalide. ex: A1A 1A1";
    if (pays.toLowerCase() !== "canada") errors.pays = "Le pays doit être le Canada.";
    if (!regexNomCarte.test(nomCarte)) errors.nomCarte = "Nom sur la carte invalide.";
    if (!regexNumCarte.test(numCarte)) errors.numCarte = "Numéro de carte invalide. ex`:1234 1234 1234 1234";
    if (!regexDateExp.test(dateExp)) errors.dateExp = "Date d'expiration invalide. ex: 12/26";
    if (!regexCvv.test(cvv)) errors.cvv = "CVV invalide. ex: 123";

    setErreurs(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("OK");
      commande(idp)
      
window.location.href='/commande'

    } else {
      console.log("Validation échouée");
    }
  };

  return (
    <div className="modal show " style={{ display: "block" }} id="RoleModal">
      <div className="modal-dialog modal-xl">
        <div className="modal-content bg-dark text-white">
          <div className="modal-header">
            <h4 className="modal-title">Liste d'articles dans le panier</h4>
          </div>

          <table className="table table-hover table-dark">
            <thead>
              <tr>
                <th className="text-center">Image</th>
                <th className="text-center">Nom</th>
                <th className="text-center">Quantité</th>
                <th className="text-center">Action</th>
                <th className="text-center">Prix</th>
              </tr>
            </thead>
            <tbody>
              {produitsUniques.map((produit) => (
                <tr key={produit.Produit.id}>
                  <td className="text-center">
                    <img
                      className="rounded-3 m-2"
                      src={produit.Produit.photo}
                      alt={produit.nom}
                      style={{ width: "80px" }}
                    />
                  </td>
                  <td className="text-center pt-5">{produit.Produit.nom}</td>
                  <td className="text-center align-middle">
  <div className="d-flex justify-content-center align-items-center">
    <button
      className="btn btn-light m-1 d-none d-sm-inline-block"
      onClick={async () => {
        await addPanierProduit(idp, produit.Produit.id);
        await onUpdate();
        handleReload();
      }}
    >
      +
    </button>
    <span className="d-none d-sm-inline-block">{produit.quantite}</span>
    <button
      className="btn btn-light m-1 d-none d-sm-inline-block"
      style={{ width: "35px" }}
      onClick={async () => {
        await supUnProduit(produit.Produit.id, idp);
        await onUpdate();
        handleReload();
      }}
      disabled={produit.quantite <= 1}
    >
      -
    </button>

    <button
      className="btn btn-light m-1 d-inline-block d-sm-none"
      onClick={async () => {
        await addPanierProduit(idp, produit.Produit.id);
        await onUpdate();
        handleReload();
      }}
    >
      +
    </button>
    <span className="d-inline-block d-sm-none">{produit.quantite}</span>
    <button
      className="btn btn-light m-1 d-inline-block d-sm-none"
      style={{ width: "35px" }}
      onClick={async () => {
        await supUnProduit(produit.Produit.id, idp);
        await onUpdate();
        handleReload();
      }}
      disabled={produit.quantite <= 1}
    >
      -
    </button>
  </div>
</td>

                  <td className="text-center pt-5">
                    <button
                      className="btn btn-danger me-2"
                      onClick={async () => {
                        await suprimerProduitDuPanier(produit.Produit.id, idp);
                        await onUpdate();
                        handleReload();
                      }}
                    >
                      Retirer
                    </button>
                  </td>
                  <td className="text-center pt-5">{`${(produit.Produit.prix * produit.quantite).toFixed(2)}$`}</td>

                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
              <td colSpan="5" className="h3 text-warning" style={{ textAlign: 'right' }}>
  Total: {total.toFixed(2)}$
</td>


              </tr>
            </tfoot>
          </table>

          <div className="modal-body">
          <form noValidate onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="adresse" className="form-label">Adresse</label>
                <input type="text" className="form-control" id="adresse" value={adresse} onChange={(e) => setAdresse(e.target.value)} required />
                {erreurs.adresse && <div className="text-danger">{erreurs.adresse}</div>}
              </div>
              <div className="mb-3">
                <label htmlFor="ville" className="form-label">Ville</label>
                <input type="text" className="form-control" id="ville" value={ville} onChange={(e) => setVille(e.target.value)} required />
                {erreurs.ville && <div className="text-danger">{erreurs.ville}</div>}
              </div>
              <div className="mb-3">
                <label htmlFor="province" className="form-label">Province</label>
                <input type="text" className="form-control" id="province" value={province} onChange={(e) => setProvince(e.target.value)} required />
                {erreurs.province && <div className="text-danger">{erreurs.province}</div>}
              </div>
              <div className="mb-3">
                <label htmlFor="codePostal" className="form-label">Code Postal</label>
                <input type="text" className="form-control" id="codePostal" value={codePostal} onChange={(e) => setCodePostal(e.target.value)} required />
                {erreurs.codePostal && <div className="text-danger">{erreurs.codePostal}</div>}
              </div>
            
              <div className="mb-3">
                <label htmlFor="nomCarte" className="form-label">Nom sur la carte</label>
                <input type="text" className="form-control" id="nomCarte" value={nomCarte} onChange={(e) => setNomCarte(e.target.value)} required />
                {erreurs.nomCarte && <div className="text-danger">{erreurs.nomCarte}</div>}
              </div>
              <div className="mb-3">
                <label htmlFor="numCarte" className="form-label">Numéro de carte</label>
                <input type="text" className="form-control" id="numCarte" value={numCarte} onChange={(e) => setNumCarte(e.target.value)} required />
                {erreurs.numCarte && <div className="text-danger">{erreurs.numCarte}</div>}
              </div>
              <div className="mb-3">
                <label htmlFor="dateExp" className="form-label">Date d'expiration</label>
                <input type="text" className="form-control" id="dateExp" value={dateExp} onChange={(e) => setDateExp(e.target.value)} required />
                {erreurs.dateExp && <div className="text-danger">{erreurs.dateExp}</div>}
              </div>
              <div className="mb-3">
                <label htmlFor="cvv" className="form-label">CVV</label>
                <input type="text" className="form-control" id="cvv" value={cvv} onChange={(e) => setCvv(e.target.value)} required />
                {erreurs.cvv && <div className="text-danger">{erreurs.cvv}</div>}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-danger" onClick={onClose}>Vider</button>
                <button type="submit" className="btn btn-primary">Payer</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};


