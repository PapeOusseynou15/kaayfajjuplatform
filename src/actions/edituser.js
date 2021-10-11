import {
    RETRIEVE_USER,
    UPDATE_USER,
  } from "./types";
  
  import AuthService from "../services/auth.service";
  
  
  export const updatePassword = (email, oldPassword,newPassword) => async (dispatch) => {
    try {
      const res = await AuthService.updateUserByEmail({ email, oldPassword,newPassword});
  
      dispatch({
        type: UPDATE_USER,
        payload: res.data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
//   export const deleteAllSubmissions = () => async (dispatch) => {
//     try {
//       const res = await SubmissionDataService.deleteAll();
  
//       dispatch({
//         type: DELETE_ALL_SUBMISSION,
//         payload: res.data,
//       });
  
//       return Promise.resolve(res.data);
//     } catch (err) {
//       return Promise.reject(err);
//     }
//   };
  
//   export const findSubmissionsByEmail = (email) => async (dispatch) => {
//     try {
//       const res = await SubmissionDataService.findByEmail(email);
  
//       dispatch({
//         type: RETRIEVE_SUBMISSIONS,
//         payload: res.data,
//       });
//     } catch (err) {
//       console.log(err);
//     }
//   };