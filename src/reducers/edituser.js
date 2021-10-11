import {
    RETRIEVE_USER,
    DELETE_USER,
    UPDATE_USER,
  } from "../actions/types";
  
  const initialState = [];
  
  function utilisateurReducer(utilisateurs = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      
      case RETRIEVE_USER:
        return payload;

      case DELETE_USER:
        return utilisateurs.filter(({ id }) => id !== payload.id);  
  
    //   case UPDATE_SUBMISSION:
    //     return submissions.map((submission) => {
    //       if (submission.id === payload.id) {
    //         return {
    //           ...submission,
    //           ...payload,
    //         };
    //       } else {
    //         return submission;
    //       }
    //     });
  
    //   case DELETE_SUBMISSION:
    //     return submissions.filter(({ id }) => id !== payload.id);
  
    //   case DELETE_ALL_SUBMISSION:
    //     return [];
    case UPDATE_USER:
        return [...utilisateurs, payload];
      default:
        return utilisateurs;
    }
  };
  
  export default utilisateurReducer;