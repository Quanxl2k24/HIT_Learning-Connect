import axios from "axios";

const Api = axios.create({
  baseURL: "https://whodev.top/backend",
  headers: {
    Accept: "application/json",
  },
});

export default Api;
