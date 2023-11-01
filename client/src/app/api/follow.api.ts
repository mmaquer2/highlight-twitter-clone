import axios from "axios";

/*
 * Contains all the api calls related to followers component
 *
 */

const api = axios.create({
  baseURL: "http://localhost:3001",
  withCredentials: true,
});

/**
 * creates a new follower relationship
 * @param follow_id // id of the person to be followed
 * @returns
 */

export const createNewFollowing = async (follow_id: string) => {
  console.log("create new following api route called");
  try {
    console.log("sending follow ", follow_id);
    const response = await api.post("/api/follow/create", { follow_id });

    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const deleteFollowing = async (follow_id: string) => {
  console.log("delete following api route called");
  try {
    console.log("sending unfollow for ", follow_id);
    //const response = await api.delete("/api/follow/delete", { follow_id });

    // return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const getFollowers = async (user_id: string) => {
  console.log("get followers api route called");
  try {
    console.log("sending get follows for user: ", user_id);
    //const response = await api.get("/api/follow/get", { user_id });
    //return response.data;
  } catch (err) {
    console.log(err);
  }
};
