import axios from "axios";
const customFetch = axios.create({
  baseURL: `/thread`,
});
customFetch.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.data.statusCode === 401) {
      console.log(error.response);
      setTimeout(() => {
        window.location.href = "/auth";
      }, 1000);
      Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export default customFetch;
