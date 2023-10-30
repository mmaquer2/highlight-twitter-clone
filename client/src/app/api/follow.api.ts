import axios from "axios";

/*
 * Contains all the api calls related to followers component
 *
 */

const api = axios.create({
  baseURL: "http://localhost:3001",
  withCredentials: true,
});