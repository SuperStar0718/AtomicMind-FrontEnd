import api from "../utils/api";
import { toast } from "react-hot-toast";

import { SET_SETTINGS } from "./types";
import { AppDispatch } from "@/store";

export const getSettings = () => async (dispatch: AppDispatch) => {
  try {
    const res = await api.get("admin/settings");
    console.log('res:', res);
    dispatch({
      type: SET_SETTINGS,
      payload: res.data[0],
    });
  } catch (err) {
    console.error(err);
  }
};


export const setSettings = (formData: any) => async (dispatch: AppDispatch) => {
  try {
    const res = await api.post("admin/setSettings", formData);
    console.log('res:', res);
    dispatch({
      type: SET_SETTINGS,
      payload: res.data,
    });
    toast.success("Settings Updated Successfully");
  } catch (err) {
    console.error(err);
  }
}