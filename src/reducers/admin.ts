import { SET_SETTINGS, SELECT_ENVIRONMENT } from "../actions/types";

const initialState = {
  environments: [],
  selectedEnvironment: {
    environment: "",
    streamTemperature: 0,
    nonStreamTemperature: 0,
    chunkSize: 0,
    chunkOverlap: 0,
    systemPrompt: "",
    streamingModel: "",
    nonStreamingModel: "",
  },
};

function adminReducer(state = initialState, action: any) {
  const { type, payload } = action;

  switch (type) {
    case SET_SETTINGS:
      return {
        ...state,
        ...payload,
      };
      case SELECT_ENVIRONMENT:
        return {
          ...state,
          selectedEnvironment: payload,
        };
    default:
      return state;
  }
}

export default adminReducer;
