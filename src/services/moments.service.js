import http from '../http.js';

class MomentsService {
  findAll() {
    return http.get('/moments/findAll');
  }
  createMoment(data) {
    return http.post('/moments/create', data);
  }
  getFollowMoment(data) {
    return http.post('/moments/getFollowMoment', data);
  }
  getMomentByAuthor(data) {
    return http.post('/moments/getMomentByAuthor', data);
  }
}
export default new MomentsService();
