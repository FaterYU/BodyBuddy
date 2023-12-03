import axios from 'axios';
export default axios.create({
  baseURL: 'http://localhost:12647/api',
  headers: {
    'Content-type': 'application/json',
  },
});
