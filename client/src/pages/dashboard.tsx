'use client'
import { useEffect } from 'react'
import styles from '../app/page.module.css'

export default function Dashboard() {
    

    useEffect(() => {
       
        console.log("dashboard mounted");
        

    }, [])

    return(

    <main className={styles.main}>
        <h1>Dashboard</h1>


        <p>this is a dashboard!</p>
    
   
    </main>
    
    )
    
    
 
        
        
    

}