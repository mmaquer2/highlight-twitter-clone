import axios from "axios";

/**
 *
 * Contains all the api calls related to post component
 *
 */

const api = axios.create({
  baseURL: "http://localhost:3001",
  withCredentials: true,
});

export const fetchPosts = async () => {
  console.log("fetching posts api route called");
  try {
    const response = await api.get("/api/posts/get");
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const createPost = async (content: any) => {
  console.log("create posts api route called");
  try {
    console.log("sending post to api with text", content);
    const response = await api.post("/api/posts/create", { content });

    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const deleteUserPost = async (post_id: string) => {
  console.log("delete posts api route called");
  try {
    const response = await api.delete("/api/posts/delete");
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const fetchVistorPosts = async (user_id: string) => {
  console.log("fetching visitor posts api route called");
  try {    
    const response = await api.get("/api/posts/getVisitor", {
      params: {
        user_id
      }
    });

    return response.data;
  } catch (err) {
    console.log(err);
  }
};

//TODO: implement likePost and unlikePost

export const likePost = async (post_id: string) => {

};

export const unlikePost = async (post_id: string) => {
  
};

//TODO: implement commentPost and uncommentPost


//TODO: implement sharePost and unsharePost
