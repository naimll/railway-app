import axios from "axios";

const url = "https://localhost:44312";

// Add a request interceptor
export const axiosInstance = axios.create({
  baseURL: url,
});

// Request interceptor for API calls
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers = {
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": "*",
      };
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

//Response interceptor for API calls
axiosInstance.interceptors.response.use(
  (response) => {
    // response.headers = {
    //   ...response.headers,
    //   'Access-Control-Allow-Origin': "*"
    // };
    return response;
  },
  async function (error) {
    const originalRequest = error.config;

    // debugger;
    // if (!error.response) console.error("Error with no response");
    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      !originalRequest._retry
    ) {
      // refresh access token
      // originalRequest._retry = true;
      // const access_token = await refreshAccessToken();
      // axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
      // return axiosInstance(originalRequest);
      // temporary solution:
      // clear the localStorage
      localStorage.setItem("token", "");
    }
    return Promise.reject(error);
  }
);
