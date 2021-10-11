import  axios from "axios";

export const getUsers = () => {
  return  axios.get("https://dev.service-backend.kalpayinc.com/businessvalidation-service/auth/users").then(
    res => res.data,
    
  );
  
};
export const getUser = async id => {
  const res = await  axios.get(`https://dev.service-backend.kalpayinc.com/businessvalidation-service/auth/users/${id}`);
  return res.data;
  
}
export const updateUser = async id => {
  const res = await  axios.put(`https://dev.service-backend.kalpayinc.com/businessvalidation-service/auth/${id}`);
  return res.data;
  
}
