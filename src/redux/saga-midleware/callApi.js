import axios from "axios";

// ? get api
export const get = (url) => {
  return axios.get(url);
};

export const post = (url, data) => {
  return axios.post(url, data);
};

export const patch = (url, data) => {
  return axios.patch(url, data);
};
