import axios from 'axios';
export default axios.create({
  baseURL: 'http://localhost:12649/api',
  headers: {
    'Content-type': 'application/json',
  },
});
