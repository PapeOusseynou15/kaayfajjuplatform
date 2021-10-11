import {
    CREATE_MEDICATION,
    RETRIEVE_MEDICATION,
    UPDATE_MEDICATION,
    DELETE_MEDICATION,
    DELETE_ALL_MEDICATION,
  } from "../actions/types";
  
  const initialState = [];
  
  function medicationReducer(medications = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case CREATE_MEDICATION:
        return [...medications, payload];
  
      case RETRIEVE_MEDICATION:
        return payload;
  
      case UPDATE_MEDICATION:
        return medications.map((medication) => {
          if (medication.id === payload.id) {
            return {
              ...medication,
              ...payload,
            };
          } else {
            return medication;
          }
        });
  
      case DELETE_MEDICATION:
        return medications.filter(({ id }) => id !== payload.id);
  
      case DELETE_ALL_MEDICATION:
        return [];
  
      default:
        return medications;
    }
  };
  
  export default medicationReducer;