import { useEffect, useState } from "react";
import "../../styles/global.css";
import styles from "../../styles/dashboard.module.css";
import Navbar from "@/app/components/navbar";
import PostCard from "@/app/components/postcard";
import { fetchVistorPosts } from "@/app/api/post.api";
import { useRouter } from "next/router";
import LinearProgress from "@mui/material/LinearProgress";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

export default function VisitorDashboard() {
  const router = useRouter();
  const { host_id } = router.query;
  const [posts, setPosts] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [hostIdString, setHostId] = useState("");
  const [isFollowing, setIsFollowing] = useState(false);
  const [username, setUsername] = useState("");
  const [avatarLink, setAvatarLink] = useState("");

  useEffect(() => {
    if (host_id) {
      console.log(host_id);
      setHostId(host_id.toString());

      //fetch host data here username and avatar link

      //TODO: need to fetch host data here for visitor dashboard
    }

    //TODO: general error page that says user not found if host_id is not found in db
  }, [host_id]);

  const getPostData = async () => {
    console.log("fetch posts button pressed!");
    console.log("getting data for host:", hostIdString);
    const data = await fetchVistorPosts(hostIdString);
    if (data) {
      setPosts(data.reverse());
    }
  };

  const toggleFollow = async () => {
    console.log("toggle follow button pressed!");
    setIsFollowing(!isFollowing);
    if (isFollowing) {
      // create connection between visitor and host in db
    } else {
    }
  };

  return (
    <>
      <Navbar />
      <p>Host ID: </p>
      {host_id}
      <p>Followers: {followers.length}</p>
      <p>Following: {following.length}</p>
      <p>Posts: {posts.length}</p>
      {isFollowing === true ? (
        <button onClick={toggleFollow}>Unfollow</button>
      ) : (
        <button onClick={toggleFollow}>Follow</button>
      )}

      <button onClick={getPostData}>Fetch Page Owner Posts</button>

      <div>
        {posts.map((post: any) => (
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
    </>
  );
}

const LoadingComponent = () => <LinearProgress />;

type VisitorDashboardContentProps = {
  state: any;
  setData: Function;
  createNewPost: any;
};

const VisitorDashboardContent: React.FC<VisitorDashboardContentProps> = ({
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
        <img src={state.avatarLink} alt="avatar" />
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
