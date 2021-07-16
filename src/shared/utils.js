import axios from "axios";

const baseUrl = process.env.REACT_APP_API;

export const apiCall = {
  post: async (endpoint, body) => {
    const targetUrl = baseUrl + endpoint;
    console.log({ body });
    console.log({ targetUrl });
    const response = await axios.post(targetUrl, body);
    return response;
  },
};
