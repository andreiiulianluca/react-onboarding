import axios from "axios";

const api = axios.create({
  baseURL: "https://rickandmortyapi.com/api/",
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response?.status === 404 &&
      error.response?.data?.error === "There is nothing here"
    ) {
      return Promise.resolve({
        data: {
          info: { count: 0, pages: 0 },
          results: null,
        },
      });
    }
    return Promise.reject(error);
  }
);

export default api;
