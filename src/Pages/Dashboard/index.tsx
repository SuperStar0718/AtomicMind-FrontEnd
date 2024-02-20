import { RootState } from "@/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import  {LeftSidebar} from "./LeftSidebar";
import Content from "./Content";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const { isAuthenticated, userData } = useSelector(
    (state: RootState) => state.auth
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || userData == "") {
      navigate("/login");
    }
  }, [isAuthenticated, userData]);

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
