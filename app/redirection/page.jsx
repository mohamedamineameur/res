'use client'
import { useState, useEffect } from "react"

function page(){
useEffect(()=>{
const a=JSON.parse(localStorage.getItem('user'))

if(a){
    if(a.type_utilisateur.niveau===0){
        window.location.href= '/menu'
    }else if(a.type_utilisateur.niveau===1){
        window.location.href= '/cuisine'
    }else if(a.type_utilisateur.niveau===3){
        window.location.href= '/gestion'
    }
}

console.log(a.type_utilisateur)
})

    return <div></div>
}

export default page