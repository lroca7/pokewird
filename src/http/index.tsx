import axios from "axios";

const http = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_POKE_API}`,
});

export default http;
