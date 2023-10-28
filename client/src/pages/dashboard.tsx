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

  useEffect(() => {
    console.log("dashboard mounted");

    // TODO: fetch posts from the server, after login

    // TODO: verify user is logged in
  });

  async function getPostData() {
    console.log("fetch posts button pressed!");
    const response = await fetchPosts();
    console.log(response.data);
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
      <p className={styles.text}>Welcome to Highlights! A Twitter Clone.</p>

      <button onClick={getPostData}>Test Fetch Posts</button>

      <input
        onChange={(e) => setNewContent(e.target.value)}
        placeholder="some text for a post"
      ></input>

      <button onClick={createNewPost}>Submit New Post</button>

      <button onClick={deleteUserPost}>Delete Post Button</button>

      <button onClick={goToUserSettings}>Go To User Settings</button>
    </main>
  );
}
