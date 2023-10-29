"use client";
import { useEffect, useState } from "react";
import styles from "../styles/dashboard.module.css";
import '../styles/global.css'
import { fetchPosts, createPost } from "../app/api/post.api";
import Navbar from "@/app/components/navbar";
import PostCard from "@/app/components/postcard";


/*
 * the Dashboard of an individual user, where they can see their posts and create new ones
 *
 */

export default function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [newPostContent, setNewContent] = useState("");

  async function getPostData() {
    console.log("fetch posts button pressed!");
    const data = await fetchPosts();
    if (data) {
      setPosts(data);
      console.log(data);
    }
  }

  async function createNewPost() {
    console.log("create posts button pressed!");
    await createPost(newPostContent);
  }

  async function deleteUserPost() {
    console.log("delete posts button pressed!");
    //await deletePost();
  }

  async function goToUserSettings() {
    console.log("go to user settings button pressed!");
  }

  return (
    
    <main className={styles.main}>
     <Navbar />
      <p className={styles.text}>Welcome to your highlights.</p>

      <input
        className={styles.input}
        onChange={(e) => setNewContent(e.target.value)}
        placeholder="Whats going on today?"
      ></input>

      <button className={styles.button} type="submit" onClick={createNewPost}>Submit New Post</button>

      <button className={styles.button} type="submit" onClick={getPostData}>Test Fetch Posts</button>

      <button className={styles.button} type="submit" onClick={deleteUserPost}>Delete Post Button</button>

      <button className={styles.button} type="submit" onClick={goToUserSettings}>Go To User Settings</button>

      <p className={styles.text} >Your Posts:</p>

      <div>
        {posts.map((post: any) => (
          <PostCard key={post.id} id={post.id} content={post.content} />
        ))}
      </div>


    </main>
  );
}
