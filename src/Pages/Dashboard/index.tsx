import { AppDispatch, RootState } from "@/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import  {LeftSidebar} from "./LeftSidebar";
import Content from "./Content";
import { useNavigate } from "react-router-dom";
import { decodeJwt } from "@/utils/setAuthToken";
import { getSettings } from "@/actions/admin";
import { SELECT_ENVIRONMENT } from "@/actions/types";

export const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, userData } = useSelector(
    (state: RootState) => state.auth
  );
  const {environments} = useSelector((state: RootState) => state.admin);
  const [documentTitle, setDocumentTitle] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || userData == "") {
      navigate("/login");
    }
    console.log('token', decodeJwt(localStorage.getItem('token')))
  }, [isAuthenticated, userData]);
  
  useEffect(() => {
    dispatch(getSettings());
    dispatch({
      type: SELECT_ENVIRONMENT,
      payload: environments[0] ? environments[0] : {},
    });
  }, []);

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
