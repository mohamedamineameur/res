export const DashBord = ({setPage})=>{
    const handleRedirect = (lien) => {
        window.location.href = lien;
    };

    return<div className="d-flex flex-column align-items-center bg-dark p-5 rounded w-75">
        <h1 className="text-white mt-4 mb-3">Menu gestion</h1>
        <button className="w-50 btn btn-secondary m-3 mx-auto d-none d-sm-block" onClick={()=>handleRedirect('/commande-complette-gestion')}>Status de toutes les commande</button>
        <button className="w-50 btn btn-secondary m-3 mx-auto d-none d-sm-block" onClick={()=>handleRedirect('/role-gestion')}>Gestion des Roles</button>
        <button className="w-50 btn btn-secondary m-3 mx-auto d-none d-sm-block" onClick={()=>handleRedirect('/produit-gestion')}>Gestion des Plats</button>
        <button className="w-50 btn btn-secondary m-3 mx-auto d-none d-sm-block"onClick={()=>handleRedirect('/commande-gestion')}>Gestion des Commandes</button>
        <button className="w-50 btn btn-secondary m-3 mx-auto d-none d-sm-block" onClick={()=>handleRedirect('/cat-gestion')}>Gestion des Catégories</button>
        <button className="w-50 btn btn-secondary m-3 mx-auto d-none d-sm-block" onClick={()=>handleRedirect('/user-gestion')}>Gestion des Employés</button>



        <button className="w-75 btn btn-secondary m-3 mx-auto d-block d-sm-none"onClick={()=>handleRedirect('/commande-complette-gestion')}>Gestion des Utilisateurs</button>
        <button className="w-75 btn btn-secondary m-3 mx-auto d-block d-sm-none"onClick={()=>handleRedirect('/role-gestion')}>Gestion des Roles</button>
        <button className="w-75 btn btn-secondary m-3 mx-auto d-block d-sm-none"onClick={()=>handleRedirect('/produit-gestion')}>Gestion des Plats</button>
        <button className="w-75 btn btn-secondary m-3 mx-auto d-block d-sm-none"onClick={()=>handleRedirect('/commande-gestion')}>Gestion des Commandes</button>
        <button className="w-75 btn btn-secondary m-3 mx-auto d-block d-sm-none"onClick={()=>handleRedirect('/cat-gestion')}>Gestion des Catégories</button>
        <button className="w-75 btn btn-secondary m-3 mx-auto d-block d-sm-none"onClick={()=>handleRedirect('/user-gestion')}>Gestion des Employés</button>
    </div>
}
