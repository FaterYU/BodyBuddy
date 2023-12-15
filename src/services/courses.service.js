import http from '../http.js';

class CoursesService {
  findAllCourse() {
    return http.get('/courses/findAllCourse');
  }
}
export default new CoursesService();
