import api from "../utils/api";
import { toast } from "react-hot-toast";

import { SET_SETTINGS } from "./types";
import { AppDispatch } from "@/store";

export const getSettings = () => async (dispatch: AppDispatch) => {
  try {
    const res = await api.get("admin/settings");
    // console.log("res:", res);
    dispatch({
      type: SET_SETTINGS,
      payload: { environments: res.data },
    });
  } catch (err) {
    console.error(err);
  }
};

export const setSettings = (formData: any) => async (dispatch: AppDispatch) => {
  try {
    const res = await api.post("admin/setSettings", formData);
    console.log("res:", res);
    dispatch({
      type: SET_SETTINGS,
      payload: { environments: res.data.settings },
    });
    dispatch({
      type: SET_SETTINGS,
      payload: { selectedEnvironment: res.data.setting},
    });
    toast.success("Settings Updated Successfully");
  } catch (err) {
    console.error(err);
  }
};

export const saveAsEnvironment =
  (formData, onSuccess = () => {}, onFailed = () => {}) =>
  async (dispatch: AppDispatch) => {
    try {
      const res = await api.post("admin/saveAsEnvironment", formData);
      console.log("res:", res);
      toast.success("Environment Saved Successfully");
      onSuccess();
    } catch (err) {
      onFailed();
      console.error(err);
    }
  };

export const deleteEnvironment =
  (formData, onSuccess = () => {}, onFailed = () => {}) =>
  async (dispatch: AppDispatch) => {
    try {
      const res = await api.post("admin/deleteEnvironment", formData);
      console.log("res:", res);
      toast.success("Environment Deleted Successfully");
      onSuccess();
    } catch (err) {
      onFailed();
      console.error(err);
    }
  };
