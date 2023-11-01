import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001", //TODO: change this to process env variable
  withCredentials: true,
});

export const loginUser = async (
  username: string,
  password: string,
): Promise<any> => {
  console.log("logging in user...");
  try {
    const response = await api.post(
      "/api/auth/login",
      {
        username,
        password,
      },
      {
        withCredentials: true,
      },
    );

    if (response.status === 200) {
      console.log("login successful");
      return response;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const checkAuthStatus = async () => {
  try {
    const response = await api.get("/api/auth/check-auth", {
      withCredentials: true,
    });

    if (response.status === 200) {
      return response;
    }
  } catch (error) {
    console.error(error);
  }
};

export const logout = async () => {
  try {
    const response = await axios.post(
      "/api/auth/logout",
      {},
      {
        withCredentials: true,
      },
    );
    console.log("User logged out");
    return response;
  } catch (error) {
    console.error("Error logging out:", error);
  }
};

/**
 * Creates a new user account in the users database table
 * @param username
 * @param email
 * @param password
 * @returns status code of 201 if successful
 */

export const register = async (
  username: string,
  email: string,
  password: string,
) => {
  console.log("registering user...");
  try {
    const resp = await api.post("/api/auth/register", {
      username,
      email,
      password,
    });

    if (resp.status === 201) {
      console.log("signup successful");
      return resp;
    }
  } catch (error) {
    console.log("signup unsuccessful");
    console.log(error);
  }
};

/**
 * returns the logged in user cache of username, user.id, email, and avatar profile picture
 * @returns object{}
 */

export const getUserCache = async () => {
  console.log("getting user cache...");
  try {
    const response = await api.get("/api/auth/get-user-cache", {
      withCredentials: true,
    });

    if (response.status === 200) {
      console.log("user cache retrieved");
      return response.data;
    }
  } catch (error) {
    console.log("user cache retrieval unsuccessful");
    console.log(error);
  }
};

/**
 * gets the host data for when visting a host id page
 * @returns object{}
 */
export const getProfileOwnerData = async (owner_id: string) => {
  console.log("getting profile owner data...");
  try {
    const response = await api.get("/api/auth/get-profile-owner-data", {
      params: { owner_id },
    });
    if (response.status === 200) {
      console.log("profile owner data retrieved");
      return response.data;
    }
  } catch (error) {
    console.log("profile owner data retrieval unsuccessful");
    console.log(error);
  }
};
