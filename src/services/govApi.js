import axios from "axios";

const govApi = axios.create({
  baseURL: import.meta.env.VITE_DATA_GOV_BASE,
  params: {
    "api-key": import.meta.env.VITE_DATA_GOV_API_KEY,
    format: "json",
    limit: 20
  }
});

export default govApi;
