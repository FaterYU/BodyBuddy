import axios from 'axios';
export default axios.create({
  // baseURL: 'http://localhost:12647/api', // 本地后端
  baseURL: 'http://bodybuddy.fater.top/api',
  headers: {
    'Content-type': 'application/json',
    // 'If-Modified-Since': '0',
  },
});
