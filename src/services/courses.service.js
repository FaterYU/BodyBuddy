import http from '../http.js';

class CoursesService {
  findAllCourse() {
    return http.get('/courses/findAllCourse');
  }
  getCourseById(data) {
    return http.post('/courses/getCourseById', data);
  }
  getLastCourseList(data) {
    return http.post('/courses/getLastCourseList', data);
  }
  getRecommendCourseList(data) {
    return http.post('/courses/getRecommendCourseList', data);
  }
}
export default new CoursesService();
