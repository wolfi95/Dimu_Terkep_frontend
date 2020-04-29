import axios from "axios";

const instance = axios.create({
  baseURL: "https://dimu-backend.herokuapp.com/api/",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json"
  }
});

export default instance;
