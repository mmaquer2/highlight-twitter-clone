"use client";
import { useEffect, useState } from "react";
import styles from "../../styles/dashboard.module.css";
import { fetchPosts, createPost } from "../api/post.api";
import { getUserCache } from "../api/auth.api";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import PostCard from "@/app/components/postcard";
import LinearProgress from "@mui/material/LinearProgress";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import Image from "next/image";
import { useSocket } from "@/app/context/store";

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
  const { socket } = useSocket(); // get socket from context provider

  useEffect(() => {
    fetchData()
      .then(() => getPostData().catch(console.error))
      .catch(console.error);
  }, []);
  

  useEffect(() => {
    if (socket && data.user_id) {
      console.log("socket exists and user_id is available", data.user_id);
      
      //socket.emit("user_notif_join", data.user_id);
      //console.log("joined notif room!");
  
      socket.on("notify_new_follower", (notificationData) => {
        console.log("new follower notification received!", notificationData.message);
      });
  
      socket.on("message", (message) => {
        console.log("message received!", message);
      });

      socket.on("newPost", (data) => {  
        console.log("new post notification received!", data);
    });
  
      return () => {
        socket.off("notify_new_follower");
        socket.off("message");
        socket.off("newPost");
        //socket.off("notify_new_follower");
    };
    } else {
        console.log("socket does not exist or user_id is not available", data.user_id);
    }
  }, [socket, data.user_id]);

  const testSocket = () => {
    if (socket) {
      socket.emit("message", "hello world!");
    }
  };

  const fetchData = async () => {
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
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getPostData = async () => {
    const postData = await fetchPosts();
    if (postData) {
      setData((prevData) => ({ ...prevData, posts: postData.reverse() }));
    }
  };

  const createNewPost = async () => {
    await createPost(data.newPostContent);
    await getPostData();
    setData((prevData) => ({ ...prevData, newPostContent: "" }));
  };

  return loading ? (
    <LoadingComponent />
  ) : (
    <DashboardContent
      state={data}
      setData={setData}
      createNewPost={createNewPost}
      testSocket={testSocket}
    />
  );
}

const LoadingComponent = () => <LinearProgress />;

type DashboardContentProps = {
  state: any;
  setData: Function;
  createNewPost: Function;
  testSocket: Function;
};

const DashboardContent: React.FC<DashboardContentProps> = ({
  state,
  setData,
  createNewPost,
  testSocket,
}) => (
  <div>
    <Navbar />
    <main className={styles.main}>
      <p className={styles.text}>Welcome to your highlights.</p>
      {state.username && <p>{state.username}</p>}
      {state.avatarLink !== "" ? (
        <AccountBoxIcon sx={{ fontSize: 100 }} />
      ) : (
        <Image src={state.avatarLink} alt="avatar" />
      )}
      <p>Followers: {state.followers}</p>
      <p>Following: {state.following}</p>
      <p>Posts: {state.posts.length}</p>
      <input
        className={styles.input}
        onChange={(e) =>
          setData((prevData: any) => ({
            ...prevData,
            newPostContent: e.target.value,
          }))
        }
        placeholder="Whats going on today?"
      />
      <button className={styles.button} type="submit" onClick={createNewPost}>
        Post Highlight
      </button>
      <button className={styles.button} type="submit" onClick={testSocket}>
        Test Socket
      </button>
      <div>
        {state.posts.map((post: any) => (
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
    <Footer />
  </div>
);
