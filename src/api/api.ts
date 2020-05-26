import axios from "axios";

const instance = axios.create({
  baseURL: "https://localhost:44376/api/",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json"
  }
});

export default instance;
