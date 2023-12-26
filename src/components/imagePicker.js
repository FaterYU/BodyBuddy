import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';

export const requestCameraPermission = () => {
  return new Promise((resolve, reject) => {
    check(PERMISSIONS.ANDROID.CAMERA).then(result => {
      switch (result) {
        case RESULTS.UNAVAILABLE:
          reject(
            'This feature is not available (on this device / in this context)',
          );
          break;
        case RESULTS.DENIED:
          request(PERMISSIONS.ANDROID.CAMERA).then(reqResult => {
            if (reqResult === 'granted') {
              resolve('granted');
            } else {
              reject('Permission denied');
            }
          });
          break;
        case RESULTS.GRANTED:
          resolve('granted');
          break;
        case RESULTS.BLOCKED:
          reject('Permission denied');
          break;
      }
    });
  });
};

/**
 *
 * @returns {JSON} Image source List
 * @example
 * {async () => {
 * var imageSrcList = await selectImage();
 * return imageSrcList;
 * }};
 */
export const selectImage = async () => {
  return new Promise((resolve, reject) => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: 1000,
        maxHeight: 1000,
        quality: 0.8,
        selectionLimit: 10,
      },
      response => {
        resolve(response.assets);
      },
    );
  });
};

/**
 *
 * @returns {JSON} Image source List
 * @example
 * {async () => {
 * var imageSrcList = await takePhoto();
 * return imageSrcList;
 * }};
 */
export const takePhoto = async () => {
  return new Promise((resolve, reject) => {
    requestCameraPermission().then(result => {
      if (result === 'granted') {
        launchCamera(
          {
            mediaType: 'photo',
            maxWidth: 1000,
            maxHeight: 1000,
            quality: 0.8,
            cameraType: 'back',
            saveToPhotos: true,
          },
          response => {
            resolve(response.assets);
          },
        );
      } else {
        reject('Permission denied');
      }
    });
  });
};
