import { RootState } from "@/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import  {LeftSidebar} from "./LeftSidebar";
import Content from "./Content";
import { useNavigate } from "react-router-dom";
import { decodeJwt } from "@/utils/setAuthToken";

export const Dashboard = () => {
  const { isAuthenticated, userData } = useSelector(
    (state: RootState) => state.auth
  );
  const [documentTitle, setDocumentTitle] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || userData == "") {
      navigate("/login");
    }
    console.log('token', decodeJwt(localStorage.getItem('token')))
  }, [isAuthenticated, userData]);

  return (
    <div className="flex">
      <div className="w-full overflow-hidden">
        <div className="flex w-full">
          <LeftSidebar  setDocumentTitle={setDocumentTitle} />
          <Content documentTitle={documentTitle} setDocumentTitle={setDocumentTitle} />
        </div>
      </div>
    </div>
  );
};
