import axios from "axios";

const Api = axios.create({
  baseURL: "http://139.59.123.112:8080/",
  headers: {  
    Accept: "application/json",
  },
});


export default Api;
