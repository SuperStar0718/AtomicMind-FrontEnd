import axios from "axios";
import toast from "react-hot-toast";
import api from "../utils/api";
import { AppDispatch } from "@/store";
import { loadUser } from "./auth";

const baseURL = import.meta.env.VITE_BACKEND_API || "";

export const uploadFiles =
  (formData: FormData, onSuccess = () => {}, onFail = () => {}) =>
  async () => {
    try {
      const api = axios.create({
        baseURL: baseURL + "api",
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      await api.post("/chat/uploadFiles", formData);
      toast.success("File uploaded successfully");
      onSuccess();
    } catch (err: unknown) {
      console.error(err);
      toast.error("Error uploading file");
      onFail();
    }
  };

export const deleteFolder =
  (
    data: { id: string; folderName: string },
    onSuccess = () => {},
    onFailed = () => {}
  ) =>
  async () => {
    try {
      await api.post("/chat/deleteFolder", data);
      toast.success("Folder deleted successfully");
      onSuccess();
    } catch (err: unknown) {
      console.error(err);
      toast.error("Error deleting folder");
      onFailed();
    }
  };

export const deleteDocument =
  (
    data: { id: string, folderName:string, documentName: string },
    onSuccess = () => {},
    onFailed = () => {}
  ) =>
  async () => {
    try {
      await api.post("/chat/deleteDocument", data);
      toast.success("Document deleted successfully");
      onSuccess();
    } catch (err: unknown) {
      console.error(err);
      toast.error("Error deleting document");
      onFailed();
    }
  };

export const generateResponse = (req) => {
  return async () => {
    try {
      const api = axios.create({
        baseURL: baseURL + "api",
        headers: {
          "Content-Type": "text/event-stream",
        },
      });
      //   dispatch({
      //     type: GET_RESPONSE,
      //     payload: { answer: res.data.answer.text },
      //   });
      const res = await api.post("/chat/generateResponse", req);
      return res;
    } catch (err: unknown) {
      console.error(err);
      toast.error("Error generating response");
    }
  };
};
