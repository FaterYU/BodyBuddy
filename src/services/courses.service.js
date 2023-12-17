import http from '../http.js';

class CoursesService {
  findAllCourse() {
    return http.get('/courses/findAllCourse');
  }
  getCourseById(data) {
    return http.post('/courses/getCourseById', data);
  }
}
export default new CoursesService();
