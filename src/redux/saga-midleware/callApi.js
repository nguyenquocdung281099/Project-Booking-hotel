import axios from "axios";

import { KEY_TOKEN, KEY_REF_TOKEN } from "../../userPage/const/const";
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

async function executeRequest(url, config) {
  const accessToken = localStorage.getItem(KEY_TOKEN);
  const refToken = localStorage.getItem(KEY_REF_TOKEN);

  let newConfig = {
    url: url,
    ...config,
    headers: {
      Authorization: "beaer " + accessToken,
    },
  };

  try {
    const result = await axios.request(newConfig);
    return result;
  } catch (error) {
    // refresh token
    if (error.response?.status === 401) {
      try {
        const newToken = await axios.post("http://localhost:5555/refreshToken", {
          requestData: {
            refreshToken: refToken,
          },
        });
        localStorage.setItem(KEY_TOKEN, newToken.data.accessToken);
        // call api again :
        let newConfig = {
          url: url,
          ...config,
          headers: {
            Authorization: "beaer " + newToken.data.accessToken,
          },
        };
        const result = await axios.request(newConfig);
        return result;
      } catch (error) {
        // history.push("/login");
        return error;
      }
    }
  }
}
export const RestClient = {
  get: (url, params = {}, config = {}) => {
    return executeRequest(url, { ...config, params });
  },

  post: (url, data, config = {}, paramsType = "") => {
    return executeRequest(url, { method: "post", ...config, data, paramsType });
  },

  put: (url, data, config = {}, paramsType = "") => {
    return executeRequest(url, { method: "put", ...config, data, paramsType });
  },

  delete(url, data = {}, config = {}) {
    return executeRequest(url, { method: "delete", ...config, data });
  },

  patch: (url, data = {}, config = {}, paramsType = "") => {
    return executeRequest(url, { method: "patch", ...config, data, paramsType });
  },
};

export const deleteData = (url) => {
  return axios.delete(url);
};
export const postUser = (url, data) => {
  return axios.post(url, data);
};
