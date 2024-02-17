import axios from "axios";
import api from "@/utils/api";
import { GET_RESPONSE } from "./types";
import { AppDispatch } from "@/store";
import toast from "react-hot-toast";

const baseURL = import.meta.env.VITE_BACKEND_API || "";

export const uploadFiles = (formData: FormData) => {
  return async () => {
    try {
      const api = axios.create({
        baseURL: baseURL + "api",
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      await api.post("/chat/uploadFiles", formData);
      toast.success("File uploaded successfully");
    } catch (err: any) {
      console.error(err);
      toast.error("Error uploading file");
    }
  };
};

export const generateResponse = (req) => {
  return async (dispatch: AppDispatch) => {
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
    } catch (err: any) {
      console.error(err);
      toast.error("Error generating response");
    }
  };
};
