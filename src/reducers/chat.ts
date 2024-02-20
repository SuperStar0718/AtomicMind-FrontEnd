import {
  GET_RESPONSE,
  LOAD_CHAT_HISTORY,
  SET_CHAT_CONTEXT,
  SET_CHAT_HISTORY,
  SET_QUERY,
  UPDATE_CHAT_HISTORY,
} from "../actions/types";

interface IHistory {
  role?: string;
  content?: string;
}
interface IChat {
  chat_history: IHistory[];
  type: string;
  name: string;
}
const initialState: IChat = {
  chat_history: [],
  type: "",
  name: "",
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
    case SET_CHAT_HISTORY:
      return {
        ...state,
        chat_history: [...state.chat_history, payload],
      };
    case UPDATE_CHAT_HISTORY:
      return {
        ...state,
        chat_history: state.chat_history.map(
          (msg, index) =>
            index === state.chat_history.length - 1
              ? { ...msg, content: msg.content + payload } // Update the last message
              : msg // Keep all other messages unchanged
        ),
      };
    case SET_CHAT_CONTEXT:
      return {
        ...state,
        type: payload.type,
        name: payload.name,
      };
    case LOAD_CHAT_HISTORY:
      return {
        ...state,
        chat_history: payload,
      };
    default:
      return state;
  }
}

export default chatReducer;
