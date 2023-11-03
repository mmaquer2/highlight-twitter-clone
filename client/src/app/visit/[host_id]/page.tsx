"use client";
import { useEffect, useState } from "react";
import Navbar from "../../components/navbar";
import PostCard from "../../components/postcard";
import { getProfileOwnerData } from "@/app/api/auth.api";
import { createNewFollowing, deleteFollowing } from "@/app/api/follow.api";
import { useRouter } from "next/router";
import { fetchVistorPosts } from "@/app/api/post.api";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

export default function VisitorDashboard({ params }) {
  const host_id = params.host_id;

  const [state, setState] = useState({
    posts: [],
    followers: [],
    following: [],
    hostIdString: "",
    isFollowing: false,
    username: "",
    avatarLink: "",
  });

  useEffect(() => {
    console.log("current host_id is", host_id);
    if (host_id) {
      setState((prevState) => ({
        ...prevState,
        hostIdString: host_id.toString(),
      }));
      fetchData();
    }
  }, [host_id]);

  const fetchData = async () => {
    await getHostData();
    await getPostData();
  };

  const getHostData = async () => {
    const data = await getProfileOwnerData(host_id.toString());
    setState((prevState) => ({
      ...prevState,
      username: data.username,
      avatarLink: data.avatar_link,
      followers: data.follow_summary.followers,
      following: data.follow_summary.following,
    }));
  };

  const getPostData = async () => {
    const data = await fetchVistorPosts(host_id.toString());
    if (data) {
      setState((prevState) => ({ ...prevState, posts: data.reverse() }));
    }
  };

  const toggleFollow = async () => {
    setState((prevState) => ({
      ...prevState,
      isFollowing: !prevState.isFollowing,
    }));
    if (state.isFollowing) {
      await deleteFollowing(state.hostIdString);
    } else {
      await createNewFollowing(state.hostIdString);
    }
  };

  return (
    <>
      <Navbar />
      {state.username && <p>{state.username}</p>}
      {state.avatarLink !== "" ? (
        <AccountBoxIcon sx={{ fontSize: 100 }} />
      ) : (
        <img src={state.avatarLink} alt="avatar" />
      )}
      <p>Followers: {state.followers}</p>
      <p>Following: {state.following}</p>
      <p>Posts: {state.posts.length}</p>
      {state.isFollowing ? (
        <button onClick={toggleFollow}>Unfollow</button>
      ) : (
        <button onClick={toggleFollow}>Follow</button>
      )}
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
    </>
  );
}
