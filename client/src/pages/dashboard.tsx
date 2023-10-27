'use client'
import { useEffect } from 'react'
import styles from '../app/page.module.css'
import { fetchPosts, createPost } from '../app/api/post.api';

export default function Dashboard() {
    
    useEffect(() => {
        console.log("dashboard mounted");
    })

    async function getPostData() {
        console.log("fetch posts button pressed!")
        const response = await fetchPosts();
        console.log(response.data);
    }

    async function createNewPost(){
        console.log("create posts button pressed!")
        const exampleData = "this is an example post"
        const response = await createPost(exampleData);
    }

    async function deleteUserPost(){


        
    }


    return (

    <main className={styles.main}>
        <h1>Dashboard</h1>
        <p>this is a dashboard!</p>


        <button onClick={getPostData}>Test Fetch Posts</button>


        <input placeholder='some text for a post'></input>


        <button onClick={createNewPost}>Submit New Post</button>




        <button></button>
   
    </main>
    
    )
    
    
 
        
        
    

}