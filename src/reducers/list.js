import {
    CREATE_SUBMISSION,
    RETRIEVE_USER,
    UPDATE_SUBMISSION,
    DELETE_SUBMISSION,
    DELETE_ALL_SUBMISSION,
  } from "../actions/types";
  
  const initialState = [];
  
  function listReducer(utilisateurs = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case CREATE_SUBMISSION:
        return [...utilisateurs, payload];
  
      case RETRIEVE_USER:
        return payload;
  
      case UPDATE_SUBMISSION:
        return utilisateurs.map((submission) => {
          if (submission.id === payload.id) {
            return {
              ...submission,
              ...payload,
            };
          } else {
            return submission;
          }
        });
  
      case DELETE_SUBMISSION:
        return utilisateurs.filter(({ id }) => id !== payload.id);
  
      case DELETE_ALL_SUBMISSION:
        return [];
  
      default:
        return utilisateurs;
    }
  };
  
  export default listReducer;