"use client";
import { useEffect, useState } from "react";
import styles from "../styles/dashboard.module.css";
import '../styles/global.css'
import { fetchPosts, createPost } from "../app/api/post.api";
import Navbar from "@/app/components/navbar";
import PostCard from "@/app/components/postcard";


/*
 * The dashboard of an individual user, where they can see their posts, create new posts, and view account stats.
 *
 */

export default function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [followers, setFollowers] = useState([]); //TODO:
  const [following, setFollowing] = useState([]);   //TODO:
  const [newPostContent, setNewContent] = useState("");
  const [username, setUsername] = useState("");  // TODO:
  const [avatarLink, setAvatarLink] = useState(""); // TODO:

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
    await getPostData();
  }

  async function deleteUserPost() {
    console.log("delete posts button pressed!");
    //await deletePost();
  }

  return (
    
    <main className={styles.main}>
     <Navbar />
      <p className={styles.text}>Welcome to your highlights.</p>
      <p>Followers: {followers.length}</p>
      <p>Following: {following.length}</p>
        <p>Posts: {posts.length}</p> 

      <input
        className={styles.input}
        onChange={(e) => setNewContent(e.target.value)}
        placeholder="Whats going on today?"
      ></input>

      <button className={styles.button} type="submit" onClick={createNewPost}>Submit New Post</button>

      <button className={styles.button} type="submit" onClick={getPostData}>Test Fetch Posts</button>

      <p className={styles.text} >Your Posts:</p>

      <div>
        {posts.map((post: any) => (
          <PostCard key={post.id} id={post.id} content={post.content} time={post.posted_at} avatar="" />
        ))}
      </div>


    </main>
  );
}
