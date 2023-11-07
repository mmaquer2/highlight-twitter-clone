"use client";
import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import PostCard from "../components/postcard";
import { getProfileOwnerData } from "@/app/api/auth.api";
import { getUserTimeline } from "@/app/api/timeline.api";
import Footer from "../components/footer";

export default function Timeline() {
  const [data, setData] = useState({
    posts: [],
    username: "",
    avatarLink: "",
  });

  useEffect(() => {
    console.log("getting timeline data");
    fetchData();
  });

  const fetchData = async () => {
    await getTimelineData();
  };

  const getTimelineData = async () => {
    const timelinePosts = await getUserTimeline();

    console.log("timeline posts are", timelinePosts);

    setData((prevState) => ({
      ...prevState,
      posts: timelinePosts,
    }));
  };

  return (
    <>
      <Navbar />
      <h1>Timeline</h1>

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
      <p> End of your timeline :) </p>

      <Footer />
    </>
  );
}
