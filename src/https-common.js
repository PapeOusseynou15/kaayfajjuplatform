import axios from "axios";

export default axios.create({
  baseURL: "https://staging.service-backend.kalpayinc.com",
  headers: {
    "Content-type": "application/json"
  }
});