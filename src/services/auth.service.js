
import http from "../http-common";
import axios from "axios";
// `${process.env.REACT_APP_BASE_URL}/auth`
const API_URL = "http://localhost:4000/businessvalidation-service/auth";




class AuthService {
  login(email, password) {
    return axios
      .post(API_URL + "/signin", { email, password })
      .then((response) => {
        // if (response.data.accessToken) {
        //   localStorage.setItem("user", JSON.stringify(response.data));
        // }
        console.log(response.data);
        return response.data;
        
      });
  }
  loginotp(email, otp) {
    console.log(email,otp)
    return axios
      .post(API_URL + "/validate", { email, otp})
      .then((response) => {
        console.log(response);
        if (response.data.access_token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        
        console.log(response.data);
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
    window.location.reload();
  }

  register(email, password) {
    return axios.post(API_URL + "/signup", {
      email,
      password,
    });
  }
  getAllUser() {
    return http.get("/auth/users");
}
  get(email) {
    return http.get(`/auth/users/${email}`);
  }
  updateUser(id, data) {
    return http.put(`/auth/${id}`, data);
  }
  updateUserByEmail(data) {
    return http.post("/auth",data);
  }
  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
  delete(id) {
    return http.delete(`/auth/${id}`);
  }
}

export default new AuthService();