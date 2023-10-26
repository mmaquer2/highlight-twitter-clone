'use client'
import { useEffect } from 'react'
import styles from '../app/page.module.css'
import { fetchPosts } from '../app/api/post.api';

export default function Dashboard() {
    

    useEffect(() => {
        console.log("dashboard mounted");
        async function getData(){
            await getPostData();
        }
        
        //getData();
    })

    async function getPostData() {
        console.log("fetching posts...")
        //const response = await fetchPosts();
       // const data = await response.json()
       // console.log(data);
    }

    return(

    <main className={styles.main}>
        <h1>Dashboard</h1>


        <p>this is a dashboard!</p>

        <button onClick={getPostData}>Test Fetch Posts</button>
    
   
    </main>
    
    )
    
    
 
        
        
    

}