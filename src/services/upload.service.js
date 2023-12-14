import http from '../http.js';
class UploadFilesService {
  /**
   * @param {File} file
   * @param {Function} onUploadProgress
   * @returns {Promise}
   * @description
   * 上传文件, onUploadProgress为上传进度回调函数, 用于更新进度条, 可以不传
   * @example
   * var progressInfos = { percentage: 0, fileName: file.name };
      UploadService.upload(
        file,
        (event) => {
          progressInfos.percentage = Math.round(
            (100 * event.loaded) / event.total
          );
        },
      )
        .then((response) => {
          if (response.data.message.includes("文件上传成功:")) {
            console.log(response.data.message);
          }
        })
        .catch(() => {
          console.log('Upload Error');
        });
   */
  upload(file, onUploadProgress) {
    let formData = new FormData();
    formData.append('file', file);
    // formData.append('type', type);
    // formData.append('uploader', uploader);
    return http.post('/files/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress,
    });
  }
  /**
   *
   * @param {JSON} data
   * data:{name:'filename'}
   * @returns {Promise}
   */
  downloadFile(data) {
    // data:{name:'filename'}
    return http.get('/files/download', data);
  }
}
export default new UploadFilesService();
