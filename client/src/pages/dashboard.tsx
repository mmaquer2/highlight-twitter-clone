"use client";
import { useEffect, useState } from "react";
import styles from "../styles/dashboard.module.css";
import '../styles/global.css'
import { fetchPosts, createPost } from "../app/api/post.api";
import {getUserCache} from "../app/api/auth.api";
import Navbar from "@/app/components/navbar";
import PostCard from "@/app/components/postcard";
import { get } from "axios";


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


  useEffect(() => {


    const fetchData = async () => {
      try {
        const data = await getUserCache();
        setUsername(data.username);
        setAvatarLink(data.avatar_link);
        //setFollowers(data.followers);
        //setFollowing(data.following);

        console.log("data from user cache", data);

        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
    getPostData();
  }, []);



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

  return (
    <div>
    <Navbar />
    <main className={styles.main}>
     
      <p className={styles.text}>Welcome to your highlights.</p>
      {username && <p>{username}</p>}
      <p>Followers: {followers.length}</p>
      <p>Following: {following.length}</p>
        <p>Posts: {posts.length}</p> 

      <input
        className={styles.input}
        onChange={(e) => setNewContent(e.target.value)}
        placeholder="Whats going on today?"
      ></input>

      <button className={styles.button} type="submit" onClick={createNewPost}>Post Highlight</button>
    
      <div>
        {posts.map((post: any) => (
          <PostCard key={post.id} owner ={post.user_id} id={post.id} content={post.content} time={post.posted_at} avatar="" />
        ))}
      </div>


    </main>
    </div>
  );
}
