import axios from 'axios';
import api from '@/utils/api';
import { GET_RESPONSE, UPLOAD_FILE } from './types';
import { AppDispatch } from '@/store';
import { createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

const baseURL = import.meta.env.VITE_BACKEND_API || '';


// export const uploadFile = createAsyncThunk(
//     UPLOAD_FILE,
//     async (formData: FormData) => {
//         try {
//         const api = axios.create({s
//             baseURL: baseURL + 'api',
//             headers: {
//             'Content-Type': 'multipart/form-data',
//             },
//         });
    
//         const res = await api.post('/chat/uploadFile', formData);
//         console.log('res from file upload:', res);
//         } catch (err: any) {
//         console.error(err);
//         }
//     }
//     );

export const uploadFile  = async (formData: FormData) => { 
    try{
        const api = axios.create({
            baseURL: baseURL + 'api',
            headers: {
              'Content-Type': 'multipart/form-data',
            }
          });
       
        const res = await api.post("/chat/uploadFile", formData);
        console.log('res from file upload:', res);
    } catch (err: any) {
        console.error(err);
    }
    
 };

// export const generateResponse = createAsyncThunk(
//     GET_RESPONSE,
//     async (req: any) => {
//         try {
//         const res = await api.post('/chat/generateResponse', req);
//         console.log('res from gpt:', res);
//         return { answer: res.data.answer.text };
//         } catch (err: any) {
//         console.error(err);
//         }
//     }
//     );

 export const generateResponse = (req) => async (dispatch: AppDispatch)=> { 
    try{
       
        const res = await api.post("/chat/generateResponse", req);
        dispatch({type: GET_RESPONSE, payload: {answer: res.data.answer.text}})
        console.log('res from gpt:', res);
    } catch (err: any) {
        console.error(err);
        toast.error('Error generating response');
    }
    
 }

 