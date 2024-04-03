import Image from "next/image"
import logo from '@/public/logo.png'
import styles from './Header.module.css'
import { NavHead } from "./NavHead"
export const Header = ()=>{

    return <div className={ styles.div  }>
        <Image src={logo} alt="LOGO" ></Image>
        <NavHead />
        
    </div>
}