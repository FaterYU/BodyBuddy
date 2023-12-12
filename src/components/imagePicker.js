import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
// import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';

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
    // await requestGalleryPermission();
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
  });
};
