import axios from "axios";

export default axios.create({
  baseURL: `${import.meta.env.VITE_TMDB_BASE_URL}`,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_BEARER_TOKEN}`,
  },
});
