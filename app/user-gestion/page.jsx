'use client'
import { UtilisateurGestion } from "@/components/GestionUtilisateur"
import { useEffect, useState } from "react";
function page(){
    const [isAuthorized, setIsAuthorized] = useState(false);
    // Ajout d'un nouvel état pour gérer l'état de chargement
    const [isLoading, setIsLoading] = useState(true);
    const [isVerified, setIsVerified] = useState(false)



useEffect(()=>{
const a = JSON.parse( localStorage.getItem('user'))
if(!a){
    setIsVerified(true)
}
if(a){
    if(a.verifier){
        setIsVerified(true)
    }
    
    if(a.type_utilisateur.niveau>1){
    setIsAuthorized(true)
   
}}

console.log(isAuthorized)
setIsLoading(false)
})
if (isLoading) {
    // Retourner un éventuel écran de chargement ou rien
    return <div></div>;
} else if(!isVerified){
    return  <div class="d-flex justify-content-center align-items-center pt-5 mt-5">
    <h1 class="bg-dark text-warning p-4 ">Veuillez vérifier votre boîte de réception pour valider votre adresse e-mail.</h1>
</div>

}


else if (isAuthorized) {
    return <UtilisateurGestion/>}
    else {
        return <div class="d-flex justify-content-center align-items-center pt-5 mt-5">
            <h1 class="bg-dark text-danger p-4 display-1 ">404 - Not Authorized</h1>
        </div>;
    }
    }

export default page