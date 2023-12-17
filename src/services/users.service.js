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
}
export default new UsersService();
