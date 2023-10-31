import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001", //TODO: change this to process env variable
  withCredentials: true,
});

/**
 * General database search function of the application, used to lookup users, posts, trends, etc.
 * @param searchString // represents the string that the user is searching for
 * @returns // an object containing the results of the search, users, posts, trends, etc.
 */

export const generalSearch = async (searchString: string): Promise<any> => {
  console.log("searching database for trends, posts, and users...");

  try {
    const response = await api.get("/api/search/general", {
      params: {
        searchString,
      },
    });

    if (response.status === 200) {
      console.log("search successful");
      return response.data;
    } else {
      throw new Error(`Request failed with status ${response.status}`);
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};
