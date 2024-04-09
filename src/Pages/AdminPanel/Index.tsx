import React, { useEffect } from "react";
import RightSidebar from "./RightSidebar";
import LeftSidebar from "./LeftSidebar";
import { AppDispatch } from "@/store";
import { useDispatch } from "react-redux";
import { getSettings } from "@/actions/admin";
import './styles.css'

const AdminPanel = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getSettings());
  }, []);

  return (
    <div className={` bg-gray-200 px-20 py-32 w-full h-screen flex`}>
      <LeftSidebar />
      <RightSidebar />
    </div>
  );
};

export default AdminPanel;
