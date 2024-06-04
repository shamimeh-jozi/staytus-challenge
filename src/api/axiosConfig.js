import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://swapi.dev/api",
  headers: { "Content-Type": "application/json" },
});

export default axiosInstance;
