import { useEffect, useState } from "react";
import styles from "../styles/dashboard.module.css";
import { fetchPosts, createPost } from "../app/api/post.api";
import { getUserCache } from "../app/api/auth.api";
import Navbar from "@/app/components/navbar";
import PostCard from "@/app/components/postcard";
import LinearProgress from "@mui/material/LinearProgress";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import Image from "next/image";

export default function Dashboard() {
  const [data, setData] = useState({
    posts: [],
    followers: [],
    following: [],
    newPostContent: "",
    username: "",
    avatarLink: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
    getPostData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const userData = await getUserCache();
      setData((prevData) => ({
        ...prevData,
        username: userData.username,
        avatarLink: userData.avatar_link,
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
  };

  return loading ? (
    <LoadingComponent />
  ) : (
    <DashboardContent
      state={data}
      setData={setData}
      createNewPost={createNewPost}
    />
  );
}

const LoadingComponent = () => <LinearProgress />;

type DashboardContentProps = {
  state: any;
  setData: Function;
  createNewPost: Function;
};

const DashboardContent: React.FC<DashboardContentProps> = ({
  state,
  setData,
  createNewPost,
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
      <p>Followers: {state.followers.length}</p>
      <p>Following: {state.following.length}</p>
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
  </div>
);
