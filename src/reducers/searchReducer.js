import {
    SEARCH_STORIES,
    FETCH_STORIES,
  } from '../actions/types';
  
  const initialState = {
    text: '',
    items: [],
  }
  
  export default function (state = initialState, action) {
    switch (action.type) {
      case SEARCH_STORIES:
        return {
          ...state,
          text: action.payload,
        };
      case FETCH_STORIES:
        return {
          ...state,
          items: action.payload
        };
      default:
        return state;
    }
  }