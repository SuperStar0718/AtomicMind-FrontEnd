import api from "../utils/api";
import { toast } from "react-hot-toast";

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "./types";
import { AppDispatch } from "@/store";


/**
 * 
 * @param formData 
 * @returns 
 */
export const registerAction =
  (formData: RegisterType) => async (dispatch: AppDispatch) => {
    try {
      
      const res = await api.post("/users/register", formData);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: {token:res.data.token},
      });
      dispatch(loadUser());
      if(res.status === 201){
        toast.success("User Created Successfully");
      }
    } catch (err: any) {
      toast.error(err.response.data);
      console.error(err);

      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };

  export const logoutAction = () => async (dispatch: AppDispatch) => {
    try{
      dispatch({
        type: LOGOUT,
      });
    }
    catch(err){
      console.error(err);
    }
  }


  export const loginAction = (formData: RegisterType) => async (dispatch: AppDispatch) => {
    try {
      const res = await api.post("/users/login", formData);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      dispatch(loadUser());
      toast.success("Logged in Successfully");
    } catch (err: any) {
      toast.error(err.response.data);
      dispatch({
        type: LOGIN_FAIL,
      });
    }
  }

/**
 * 
 * @returns 
 */
  export const loadUser = () => async (dispatch: AppDispatch) => {
    try {
      const res = await api.get("/users/auth");
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    } catch (err) {
      console.error("Error from load user:",err);
      dispatch({
        type: AUTH_ERROR,
      });
    }
  };

  type RegisterType = {
    email: string;
    password: string;
  };
  