import {
  SET_SETTINGS
} from "../actions/types";



const initialState = {
  streamTemperature: 0.1,
  nonStreamTemperature: 0.1,
  chunkSize: 0,
  chunkOverlap: 0,
  systemPrompt:"",
  streamingModel:"",
  nonStreamingModel:"",
};

function adminReducer(state = initialState, action: any) {
  const { type, payload } = action;

  switch (type) {
    case SET_SETTINGS:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
}

export default adminReducer;
