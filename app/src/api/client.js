import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:9001", // o l'endpoint del vostro backend
  headers: {
    "Content-Type": "application/json",
  }
});

export default client;