import http from '../http.js';

// router.post('/create', users.create);
// router.get('/findAll', users.findAll);
// router.post('/findOne', users.findOne);
// router.put('/update', users.update);
// router.delete('/delete', users.delete);
// router.post('/getName', users.getName);
// router.post('/login', users.login);
// router.post('/follow', users.follow);
// router.post('/unfollow', users.unfollow);
// router.post('/getFollowList', users.getFollowList);
// router.post('/getFollowedList', users.getFollowedList);
// router.post('/likeCourse', users.likeCourse);
// router.post('/unlikeCourse', users.unlikeCourse);
// router.post('/checkLikeCourse', users.checkLikeCourse);
// router.post('/likePose', users.likePose);
// router.post('/unlikePose', users.unlikePose);
// router.post('/checkLikePose', users.checkLikePose);
// router.post('/likeMoment', users.likeMoment);
// router.post('/unlikeMoment', users.unlikeMoment);
// router.post('/checkLikeMoment', users.checkLikeMoment);
// router.post('/getMomentFollowLikeList', users.getMomentFollowLikeList);
// router.post('/globalSearch', users.globalSearch);

class UsersService {
  /**
   * @returns {JSON}
   */
  findALL() {
    http
      .get('/users/findAll')
      .then(res => {
        return res.data;
      })
      .catch(err => {
        console.log(err);
        return 'error';
      });
  }
  /**
   *
   * @param {JSON} data
   * @param {String} data.userName
   * @param {String} data.password
   * @param {String} data.email
   * @param {String} data.phone
   * @param {String} data.photo
   * @param {JSON} data.infomation
   * @param {String} data.infomation.gender
   * @param {String} data.infomation.weight
   * @param {String} data.infomation.height
   * @returns {JSON}
   */
  register(data) {
    http
      .post('/users/create', data)
      .then(res => {
        return res.data;
      })
      .catch(err => {
        console.log(err);
        return 'error';
      });
  }
  /**
   *
   * @param {JSON} data
   * @param {String} data.email
   * @param {String} data.password
   * @returns {JSON}
   */
  login(data) {
    http
      .post('/users/login', data)
      .then(res => {
        return res.data;
      })
      .catch(err => {
        console.log(err);
        return 'error';
      });
  }
  /**
   *
   * @param {JSON} data
   * @param {int} data.uid
   * @returns {JSON}
   */
  findOne(data) {
    http
      .post('/users/findOne', data)
      .then(res => {
        return res.data;
      })
      .catch(err => {
        console.log(err);
        return 'error';
      });
  }
  /**
   *
   * @param {JSON} data
   * @param {int} data.uid
   * @param {*} *
   * @returns {JSON}
   */
  update(data) {
    http
      .put('/users/update', data)
      .then(res => {
        return res.data;
      })
      .catch(err => {
        console.log(err);
        return 'error';
      });
  }
  /**
   *
   * @param {JSON} data
   * @param {int} data.uid
   * @returns {JSON}
   */
  delete(data) {
    http
      .delete('/users/delete', data)
      .then(res => {
        return res.data;
      })
      .catch(err => {
        console.log(err);
        return 'error';
      });
  }
}
export default new UsersService();
