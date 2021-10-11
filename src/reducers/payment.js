import {
    CREATE_PAYMENT,
    RETRIEVE_PAYMENTS,
  } from "../actions/types";
  
  const initialState = [];
  
  function paymentReducer(payments = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case CREATE_PAYMENT:
        return [...payments, payload];
  
      case RETRIEVE_PAYMENTS:
        return payload;
  
      default:
        return payments;
    }
  };
  
  export default paymentReducer;