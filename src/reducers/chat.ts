import { GET_RESPONSE, SET_QUERY } from "../actions/types";

interface IHistory {
  question?: string;
  answer?: string;
}
const initialState: { chat_history: IHistory[] } = {
  chat_history: [],
};

function chatReducer(state = initialState, action: any) {
  const { type, payload } = action;
  switch (type) {
    case GET_RESPONSE:
    case SET_QUERY:
      return {
        ...state,
        chat_history: [...state.chat_history, payload],
      };

    default:
      return state;
  }
}

export default chatReducer;
