import http from '../http.js';

class FitsService {
  getScore(data) {
    return http.post('/fits/getScore', data);
  }
  getOneFitScoreById(data) {
    return http.post('/fits/getOneFitScoreById', data);
  }
  create(data) {
    return http.post('/fits/create', data);
  }
}
export default new FitsService();
