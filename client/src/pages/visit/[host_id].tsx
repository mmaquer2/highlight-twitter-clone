import { useEffect, useState } from "react";
import '../../styles/global.css'
import Navbar from "@/app/components/navbar";
import PostCard from "@/app/components/postcard";
import { fetchVistorPosts } from "@/app/api/post.api";
import { useRouter } from 'next/router';

export default function VisitorDashboard(){

    const router = useRouter();
    const {host_id} = router.query;
    const [posts,setPosts] = useState([]);
    const [followers,setFollowers] = useState([]);
    const [following,setFollowing] = useState([]);
    const [hostIdString,setHostId] = useState(""); 
    const [isFollowing,setIsFollowing] = useState(false); //TODO: need to fetch this from db
    const [username,setUsername] = useState("");
    const [avatarLink,setAvatarLink] = useState("");

    useEffect(() => {
        if(host_id){
            console.log(host_id);
            setHostId(host_id.toString());

            //TODO: need to fetch host data here for visitor dashboard
            
        }

        //TODO: general error page that says user not found if host_id is not found in db

    },[host_id])
          
    const getPostData = async () => {
        console.log("fetch posts button pressed!");
        console.log("getting data for host:",hostIdString);
        const data = await fetchVistorPosts(hostIdString);
        if (data) {
          setPosts(data);
          console.log(data);
        }
    }

    const toggleFollow = async () => {
        console.log("toggle follow button pressed!");
        setIsFollowing(!isFollowing);
        if (isFollowing){ 

            // create connection between visitor and host in db

        } else {

        }

    };


    return(
    <>
       <Navbar />
       <p>Host ID: </p>{host_id}
       <p>Followers: {followers.length}</p>
       <p>Following: {following.length}</p>
       <p>Posts: {posts.length}</p> 
       {isFollowing === true ? <button onClick={toggleFollow}>Unfollow</button> : <button onClick={toggleFollow}>Follow</button>}

      <button onClick={getPostData}>Fetch Page Owner Posts</button>
    
      <div>
        {posts.map((post: any) => (
          <PostCard key={post.id} owner ={post.user_id} id={post.id} content={post.content} time={post.posted_at} avatar="" />
        ))}
    </div>

    </>)



}