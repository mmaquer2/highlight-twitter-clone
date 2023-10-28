"use client";
import { useEffect, useState } from "react";
import styles from "../app/page.module.css";
import { fetchPosts, createPost } from "../app/api/post.api";

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
      <p className={styles.text}>Welcome to your highlights.</p>

      <button onClick={getPostData}>Test Fetch Posts</button>

      <input
        onChange={(e) => setNewContent(e.target.value)}
        placeholder="some text for a post"
      ></input>

      <button onClick={createNewPost}>Submit New Post</button>

      <button onClick={deleteUserPost}>Delete Post Button</button>

      <button onClick={goToUserSettings}>Go To User Settings</button>

      <p>Your Posts:</p>

      <ul>
        {posts.map((post: any) => (
          <li key={post.id}>{post.content}</li>
        ))}
      </ul>
    </main>
  );
}
