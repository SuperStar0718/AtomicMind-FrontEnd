import api from "./api";

// store our JWT in LS and set axios headers if we do have a token

const setAuthToken = (token: string) => {
  if (token) {
    api.defaults.headers.common["x-auth-token"] = token;
    localStorage.setItem("token", token);
  } else {
    delete api.defaults.headers.common["x-auth-token"];
    localStorage.removeItem("token");
  }
};

export const decodeJwt = (token) => {
  const base64Payload = token.split(".")[1];
  const payload = atob(base64Payload);
  return JSON.parse(payload);
};

export default setAuthToken;
