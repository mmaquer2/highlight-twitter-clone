import axios from 'axios';

const api = axios.create({ 
    baseURL: "http://localhost:3001",
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,

});

export const login = async (username:string, password:string) => {
  try {
    const response = await axios.post(
      "/auth/login",
      {
        username,
        password,
      },
      {
        withCredentials: true,
      }
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
    const response = await axios.get("/auth/check-auth", {
      withCredentials: true,
    });

    console.log("checking auth... ", response.status);
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
      "/auth/logout",
      {},
      {
        withCredentials: true,
      }
    );
    console.log("User logged out");
    return response;
  } catch (error) {
    console.error("Error logging out:", error);
  }
};

export const register = async (username:string, email:string, password:string) => {
  try {
    const resp = await axios.post("/auth/register", {
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