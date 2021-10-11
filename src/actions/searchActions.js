import {
    SEARCH_STORIES,
    FETCH_STORIES,
  } from './types';
  
  // Fired off as soon as user begins to type into the Input
  export const searchStories = text => dispatch => {
    console.log("searchStories has been called ");
    dispatch({
      type: SEARCH_STORIES,
      payload: text
    });
  };
  
  // Takes the text data from the user's search query, and requests the 
    // term from the API
  export const fetchStories = text => dispatch => {
    console.log("fetchStories has been called ");
    //`${process.env.REACT_APP_BASE_URL}/submissions/email/${text}`
    fetch(`https://dev.service-backend.kalpayinc.com/businessvalidation-service/submissions/email/${text}`)
    .then(res => res.json())
    .then(results => dispatch({
      type: FETCH_STORIES,
      payload: results.hits
    }));
  }