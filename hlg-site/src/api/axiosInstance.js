// axios instance for api calls
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'process.env.REACT_APP_API_URL',
});

export default axiosInstance;