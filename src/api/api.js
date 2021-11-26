import axios from "axios";

export const endpoint = "http://localhost:3000";


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

