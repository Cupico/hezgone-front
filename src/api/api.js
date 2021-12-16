import axios from "axios";
import io from "socket.io-client";

export const endpoint = "https://devlab-back.herokuapp.com";

// export const endpoint = "http://localhost:3000";

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

export const createEvent = async (event, id) => {
  return await axios
    .post(`${endpoint}/event/create`, {event, id})
    .then((res) => res.data)
    .catch((error) => error);
};


// export const joinEvent = async (eventCode, id) => {
//   return await axios
//     .get(`${endpoint}/event/join/${eventCode.code}`, { params: {
//     id: id
//   }})
//     .then((res) => res.data)
//     .catch((error) => error);
// };


export const getEvent = async (eventCode) => {
  return await axios
    .get(`${endpoint}/event/${eventCode}`)
    .then((res) => res.data)
    .catch((error) => error);
};

