import { Outlet, useNavigate } from "react-router-dom";
import setAuthToken from "@/utils/setAuthToken";
import { LOGOUT } from "@/actions/types";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { Navigate } from "react-router-dom";
import { decodeJwt } from "@/utils/setAuthToken";

import { useEffect } from "react";

type AdminRouteType = {
  children?: React.ReactNode;
};

/**
 * Renders a private route component that checks if the user is authenticated and has the role of "user".
 * If the user is not authenticated, it displays an error message and redirects to the sign-in page.
 * @param children - The child components to render if the user is authenticated and has the role of "user".
 * @returns The private route component.
 */
const AdminRoute = ({ children }: AdminRouteType) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  function presentPage() {
    navigate(-1);
  }

  useEffect(() => {
    if (token && decodeJwt(token).payload.role != "ADMIN") {
      presentPage();
    }
  }, []);

  if (!token) return <Navigate to="/" />;

  const decodedData = decodeJwt(token);
  if (decodedData.payload.role == "ADMIN") {
    return children ? children : <Outlet />;
  } else if (decodedData.payload.role != "ADMIN") {
    presentPage();
  }
};

export default AdminRoute;
