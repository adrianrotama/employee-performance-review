import axios from 'axios'

const API = () => {
  let instance = axios.create({
    baseURL: `http://localhost:3001/api/v1`,
    headers: {
      'Content-Type': 'application/json',
    },
    responseType: 'json'
  })

  instance.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    config.headers.Authorization =  token ? `Bearer ${token}` : '';
    return config;
  });

  instance.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    return Promise.reject(error);
  });

  return instance;
}

export default API()