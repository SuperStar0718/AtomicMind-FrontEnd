import { Outlet } from "react-router-dom";
import { loadUser } from "@/actions/auth";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import setAuthToken from "@/utils/setAuthToken";
import { LOGOUT } from "@/actions/types";

type PrivateRouteType = {
  children?: React.ReactNode;
};

/**
 * Renders a private route component that checks if the user is authenticated and has the role of "user".
 * If the user is not authenticated, it displays an error message and redirects to the sign-in page.
 * @param children - The child components to render if the user is authenticated and has the role of "user".
 * @returns The private route component.
 */
const PrivateRoute = ({ children }: PrivateRouteType) => {
 
  const dispatch = useDispatch<AppDispatch>();

  if (localStorage.token) {
    // if there is a token set axios headers for all requests
    setAuthToken(localStorage.token);
    dispatch(loadUser());
  } else {
    dispatch({ type: LOGOUT });
  }
   return children ? children : <Outlet />;

  // window.addEventListener("storage", () => {
  //   if (!localStorage.token) dispatch({ type: LOGOUT });
  // });
};

export default PrivateRoute;
