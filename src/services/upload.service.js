import http from '../http.js';
class UploadFilesService {
  upload(file, onUploadProgress, type, uploader) {
    let formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);
    formData.append('uploader', uploader);
    return http.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress,
    });
  }
  getFiles() {
    return http.get('/fileslist');
  }
  downloadFile(data) {
    // data:{name:'filename',uploader:'uploader',type:'file's type'}
    return http.post('/files', data, {responseType: 'blob'});
  }
}
export default new UploadFilesService();
