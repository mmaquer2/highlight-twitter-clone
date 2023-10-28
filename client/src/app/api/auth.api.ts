import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001",
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
