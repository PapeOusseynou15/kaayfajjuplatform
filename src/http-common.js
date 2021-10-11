import axios from "axios";

export default axios.create({
  //baseURL: https://dev.service-backend.kalpayinc.com,
  baseURL: "http://localhost:3001",
  headers: {
    "Content-type": "application/json"
    
  }
});