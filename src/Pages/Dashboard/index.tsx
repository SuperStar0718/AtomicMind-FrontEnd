import { AppDispatch, RootState } from "@/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { loadUser } from "@/actions/auth";
import setAuthToken from "@/utils/setAuthToken";
import { LOGOUT } from "@/actions/types";
import { LeftSidebar } from "./LeftSidebar";
import Content from "./Content";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || user == "") {
      console.log("dashboard not authenticated");
      navigate("/login");
    }
  }, [isAuthenticated, user]);

  return (
    <div className="flex">
      <div className="w-full overflow-hidden">
        <div className="flex w-full">
          <LeftSidebar />
          <Content />
        </div>
      </div>
    </div>
  );
};
