import { Navigate, createBrowserRouter } from "react-router-dom";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import PrivateRoute from "@/Components/Routing/PrivateRoute";
import { Dashboard } from "./Dashboard";
import GetAuth from "@/Components/Routing/GetAuth";
import AdminRoute from "@/Components/Routing/AdminRoute";
import AdminPanel from "./AdminPanel/Index";

export const RouterConfigure = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/dashboard" />,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
  },
  {
    path: "/admin",
    element: (
      <AdminRoute>
        <AdminPanel />
      </AdminRoute>
    ),
  },
  {
    path: "/login",
    element: (
      <GetAuth>
        <Login />
      </GetAuth>
    ),
  },
  {
    path: "/register",
    element: (
      <GetAuth>
        <Register />
      </GetAuth>
    ),
  },
]);
