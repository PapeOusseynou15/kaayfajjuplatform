import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  PAYMENT_SUCCESS,
  PAYMENT_FAIL,
  LOGOUT,
  SET_MESSAGE,
} from "./types";

  import PaymentService from "../services/payment.service";
  
  export const AddPayment = (amount,currency,type,comment,issuerPhoneNumber, operator) => (dispatch) => {
    return PaymentService.AddPayment(amount,currency,type,comment,issuerPhoneNumber, operator).then(
      (data) => {
        dispatch({
          type: PAYMENT_SUCCESS,
          payload: { user: data },
        });
  
        return Promise.resolve();
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
  
        dispatch({
          type: PAYMENT_FAIL,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
  
        return Promise.reject();
      }
    );
  };
  
  export const AddOtp = (otp,comment) => (dispatch) => {
    return PaymentService.AddOtp(otp,comment).then(
      (data) => {
        dispatch({
          type: PAYMENT_SUCCESS,
          payload: { user: data },
        });
  
        return Promise.resolve();
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
  
        dispatch({
          type: PAYMENT_FAIL,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
  
        return Promise.reject();
      }
    );
  };
  
  export const GetAccess = (secretKey,accessKey) => (dispatch) => {
    return PaymentService.GetAccess(secretKey,accessKey).then(
      (data) => {
        dispatch({
          type: PAYMENT_SUCCESS,
          payload: { user: data },
        });
  
        return Promise.resolve();
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
  
        dispatch({
          type: PAYMENT_FAIL,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
  
        return Promise.reject();
      }
    );
  };
  
  
  export const TransactionHystory = () => (dispatch) => {
    return PaymentService.TransactionHystory().then(
      (data) => {
        dispatch({
          type: PAYMENT_SUCCESS,
          payload: { user: data },
        });
  
        return Promise.resolve();
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
  
        dispatch({
          type: PAYMENT_FAIL,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
  
        return Promise.reject();
      }
    );
  };
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  