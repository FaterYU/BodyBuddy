import {launchImageLibrary} from 'react-native-image-picker';
import {PermissionsAndroid} from 'react-native';

async function requestGalleryPermission() {
  try {
    const permission = PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;
    const granted = await PermissionsAndroid.request(permission);

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Gallery permission is granted');
    } else {
      console.log('Gallery permission denied');
    }
  } catch (error) {
    console.error('Error requesting gallery permission: ', error);
  }
}

/**
 *
 * @returns {JSON} Image source
 * @example
 * {async () => {
 * var imageSrc = await selectImage();
 * return imageSrc.uri;
 * }};
 */
const selectImage = async () => {
  return new Promise((resolve, reject) => {
    // await requestGalleryPermission();
    launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: 1000,
        maxHeight: 1000,
        quality: 0.8,
      },
      response => {
        resolve(response.assets);
      },
    );
  });
};
export default selectImage;
