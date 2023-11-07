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
 * @param follow_id // id of the user profile to be followed
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

/**
 * deletes a follower relationship
 * @param follow_id // id of the user profile to be unfollowed
 * @returns
 */

export const deleteFollowing = async (follow_id: string) => {
  console.log("delete following api route called");
  try {
    console.log("sending unfollow for ", follow_id);
    const response = await api.delete("/api/follow/delete", {
      params: {
        follow_id: follow_id,
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

/**
 * gets the list of people the user is following
 * @param user_id // id of the user
 * @returns
 */

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

/**
 * checks if the profile owner is being followed by the current user
 * @param host_id id of the person whose profile is being viewed
 */

export const checkProfileOwnerFollowing = async (
  host_id: string,
): Promise<boolean> => {
  try {
    console.log("check following api route called");
    const response = await api.get("/api/follow/check", {
      params: {
        host_id: host_id,
      },
    });

    return response.data;
  } catch (err) {
    console.log(err);
    console.log("error in check following api route");
    return false;
  }
};
