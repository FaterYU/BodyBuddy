import http from '../http.js';

class MomentsService {
  findALL() {
    return http.get('/moments/findAll');
  }
  createMoment(data) {
    return http.post('/moments/create', data);
  }
  getFollowMoment(data) {
    return http.post('/moments/getFollowMoment', data);
  }
}
export default new MomentsService();
