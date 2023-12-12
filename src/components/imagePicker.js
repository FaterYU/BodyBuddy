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

const selectImage = async () => {
  // await requestGalleryPermission();
  launchImageLibrary({
    mediaType: 'photo',
    maxWidth: 1000, // 设置选择照片的大小，设置小的话会相应的进行压缩
    maxHeight: 1000,
    quality: 0.8,
    // videoQuality: 'low',
    // includeBase64: true
  })
    .then(response => {
      console.log('response', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
        return null;
      } else if (response.errorCode === 'camera_unavailable') {
        console.log('Camera not available on device');
        return null;
      } else if (response.errorCode === 'permission') {
        console.log('Permission not satisfied');
        return null;
      } else if (response.errorCode === 'others') {
        console.log(response.errorMessage);
        return null;
      }
      return {uri: response.uri, type: response.type, name: response.fileName};
    })
    .catch(error => {
      console.log('error', error);
    });
};
export default selectImage;
