import http from '../http.js';

class UsersService {
  getCalendarActivity(data) {
    return http.post('/users/getCalendarActivity', data);
  }
  addCalendarActivity(data) {
    return http.post('/users/addCalendarActivity', data);
  }
  deleteCalendarActivity(data) {
    return http.post('/users/deleteCalendarActivity', data);
  }
  findOne(data) {
    return http.post('/users/findOne', data);
  }
  getFollowList(data) {
    return http.post('/users/getFollowList', data);
  }
  getFollowedList(data) {
    return http.post('/users/getFollowedList', data);
  }
}
export default new UsersService();
