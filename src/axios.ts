import Axios from "axios";


const axiosInstance = Axios.create({
  baseURL: 'https://api.staging.kookaat.dev/EndUser',
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token")
      config.headers.Authorization = `${token}`;
    }

    return { ...config };
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    // if (error.response && error.response.status) {
    //   if (error.response.status === 403 || error.response.status === 401)
    //     return Promise.reject(fa.LOGIN_FIRST);
    //   else if (error.response.status === 500 || error.response.status === 408)
    //     return Promise.reject(fa.SERVER_ERROR);
    // }
    return Promise.reject(error);
  }
);

export default axiosInstance;
