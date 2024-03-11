import {
    REGISTER_SUCCESS,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGOUT,
    SHOW_CITATION,
    HIDE_CITATION
  } from "../actions/types";

  export interface IFolder{
    folderName: string;
    documents: string[];
  }
  
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    userData: null,
    showCitation: false,
  };
  
  function authReducer(state = initialState, action: any) {
    const { type, payload } = action;
  
    switch (type) {
      case USER_LOADED:
        return {
          ...state,
          isAuthenticated: true,
          loading: false,
          userData: payload,
        };
      case REGISTER_SUCCESS:
      case LOGIN_SUCCESS:
        return {
          ...state,
          ...payload,
          isAuthenticated: true,
          loading: false,
        };
      case SHOW_CITATION:
        return {
          ...state,
          showCitation: true,
        };
      case HIDE_CITATION:
        return {
          ...state,
          showCitation: false,
        };
      case AUTH_ERROR:
      case LOGOUT:
        return {
          ...state,
          token: null,
          isAuthenticated: false,
          loading: false,
          userData: null,
        };
      default:
        return state;
    }
  }
  
  export default authReducer;
  