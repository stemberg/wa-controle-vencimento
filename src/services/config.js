import axios from "axios";

const http = axios.create({
  baseURL: "https://ms-controle-vencimento-production.up.railway.app",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default http;