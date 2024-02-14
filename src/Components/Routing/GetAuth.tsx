import { loadUser } from "@/actions/auth";
import { LOGOUT } from "@/actions/types";
import { AppDispatch } from "@/store";
import setAuthToken from "@/utils/setAuthToken";
import React from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";


type Props = { children?: React.ReactNode };

const GetAuth = ({ children }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  if (localStorage.token) {
    // if there is a token set axios headers for all requests
    setAuthToken(localStorage.token);
    dispatch(loadUser());
  } else {
    dispatch({ type: LOGOUT })
  }
  return children ? children : <Outlet />;

};

export default GetAuth;
