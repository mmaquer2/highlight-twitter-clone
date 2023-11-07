"use client";
import React, { useEffect, useState } from "react";
import styles from "../../styles/dashboard.module.css";
import { fetchPosts, createPost } from "../api/post.api";
import { getUserCache } from "../api/auth.api";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import PostCard from "@/app/components/postcard";
import { useSocket } from "@/app/context/store";
import LinearProgress from "@mui/material/LinearProgress";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Image from "next/image";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Dashboard() {
  const [data, setData] = useState({
    posts: [],
    followers: 0,
    following: 0,
    newPostContent: "",
    username: "",
    avatarLink: "",
    user_id: "",
  });

  const [loading, setLoading] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const { socket } = useSocket();

  useEffect(() => {
    const initData = async () => {
      try {
        setLoading(true);
        const userData = await getUserCache();
        setData((prevData) => ({
          ...prevData,
          username: userData.username,
          avatarLink: userData.avatar_link,
          followers: userData.follow_summary.followers,
          following: userData.follow_summary.following,
          user_id: userData.user_id,
        }));
        const postData = await fetchPosts();
        setData((prevData) => ({ ...prevData, posts: postData.reverse() }));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    initData();
  }, []);

  useEffect(() => {
    if (socket && data.user_id) {
      socket.on("notify_new_follower", (notificationData) => {});
      socket.on("message", (message) => {});
      socket.on("newPost", (data) => {});

      return () => {
        socket.off("notify_new_follower");
        socket.off("message");
        socket.off("newPost");
      };
    }
  }, [socket, data.user_id]);

  const createNewPost = async () => {
    await createPost(data.newPostContent);
    const postData = await fetchPosts();
    setData((prevData) => ({
      ...prevData,
      posts: postData.reverse(),
      newPostContent: "",
    }));
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <>
      <Navbar />
      {loading ? (
        <LinearProgress />
      ) : (
        <main className={styles.main}>
          <p className={styles.text}>Welcome to your highlights.</p>
          {data.username && <p>{data.username}</p>}
          {data.avatarLink !== "" ? (
            <AccountBoxIcon sx={{ fontSize: 100 }} />
          ) : (
            <Image src={data.avatarLink} alt="avatar" />
          )}
          <p>Followers: {data.followers}</p>
          <p>Following: {data.following}</p>
          <p>Posts: {data.posts.length}</p>
          <input
            className={styles.input}
            value={data.newPostContent}
            onChange={(e) =>
              setData((prevData) => ({
                ...prevData,
                newPostContent: e.target.value,
              }))
            }
            placeholder="Whats going on today?"
          />
          <button className={styles.button} onClick={createNewPost}>
            Post Highlight
          </button>
          <div>
            {data.posts.map((post: any) => (
              <PostCard
                key={post.id}
                owner={post.user_id}
                id={post.id}
                content={post.content}
                time={post.posted_at}
                avatar=""
              />
            ))}
          </div>
        </main>
      )}
      <Footer />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          New post created successfully!
        </Alert>
      </Snackbar>
    </>
  );
}
