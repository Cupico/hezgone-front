import axios from "axios";
import io from "socket.io-client";

export const endpoint = "http://localhost:3000";

export const socket = io(endpoint);


export const register = async (userRegister) => {
  return await axios
    .post(`${endpoint}/user/signup`, userRegister)
    .then((res) => res)
    .catch((error) => error);
};

export const login = async (userLogin) => {
  return await axios
    .post(`${endpoint}/user/login`, userLogin)
    .then((res) => res)
    .catch((error) => error);
};

