import React, {
  forwardRef,
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
} from 'react';
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import Orientation from 'react-native-orientation-locker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
<<<<<<< HEAD
import { RNCamera } from 'react-native-camera';
import {
  useFrameProcessor,
  useCameraDevice,
  NoCameraDeviceError,
  Camera,
  useCameraDevices,
} from 'react-native-vision-camera';
=======
// import { RNCamera } from 'react-native-camera';
// import {
//   useFrameProcessor,
//   useCameraDevice,
//   NoCameraDeviceError,
//   Camera,
//   useCameraDevices,
// } from 'react-native-vision-camera';
>>>>>>> d160ed182c615705ba9f9a014e07f6ce7663dc29
import Video from 'react-native-video';

const VideoScreen = ({navigation}) => {
  useEffect(() => {
    // 设置为横屏
    Orientation.lockToLandscape();

    // 在组件卸载时重置为竖屏
    return () => {
      Orientation.lockToPortrait();
    };
  }, []); // 确保这个 effect 只在组件挂载和卸载时执行
  const [isVisible, setIsVisible] = useState(false);
  const showGoBackButton = () => {
    setIsVisible(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 3000);
  };
  const finishCourse = () => {
    Orientation.lockToPortrait();
    navigation.navigate('CourseFinish');
  };
  return (
    <TouchableWithoutFeedback onPress={showGoBackButton}>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          flexDirection: 'row',
        }}>
        <View style={styles.video}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{position:'absolute',top:14,left:6,zIndex:1000}} >
            <MaterialCommunityIcons
              name="chevron-left-circle"
              size={26}
              color="rgba(180,180,180,0.8)"
              style={{alignSelf: 'flex-start'}}
            />
          </TouchableOpacity>
          <Video
            source={{
              uri: 'http://bodybuddy.fater.top/api/files/download?name=Aerial pedaling.mp4',
            }}
            style={{flex: 1,width:'100%'}}
            controls={true}
            resizeMode="cover"
            poster="http://bodybuddy.fater.top/api/files/download?name=Aerial pedaling.jpg"
          />
        </View>

        <View style={styles.sideCard}>
          <TouchableOpacity
            style={{
              position: 'absolute',
              top: 10,
              right: 10,
              zIndex: 1000,
              opacity: isVisible ? 1 : 0,
            }}
            onPress={finishCourse}>
            <MaterialCommunityIcons
              name="location-exit"
              size={28}
              color="rgba(200,0,0,1)"
              style={{}}
            />
          </TouchableOpacity>
          <View style={styles.camera}>
            {/* <Frame /> */}
          </View>
          <View style={styles.score}>
            <Text style={{color: 'white', marginTop: 30}}>当前评分</Text>
            <Text style={{color: 'white', fontSize: 44, fontWeight: 700}}>
              93
            </Text>
            <Text style={{color: 'white', marginBottom: 30}}>继续保持</Text>
          </View>
        </View>

        {/* <Video
                    ref={ref = this.Video = ref}
                    source={{uri: "url"}}
                    poster={"url"}
                    paused={paused}
                    onProgress={({currentTime}) => {}}
                    onLoad={({duration}) => {}}
                    onEnd={() => {}}
                    resizeMode="cover"
                    posterResizeMode="cover"
                    style={style}
                /> */}
      </View>
    </TouchableWithoutFeedback>
  );
};

// const VideoPlayer = () => {
//   return (
//     <View style={styles.container}>
//       <Video
//         source={{uri: 'https://example.com/path/to/your/video.mp4'}} // 替换为实际视频的 URL
//         style={styles.video}
//         controls={true}
//       />
//     </View>
//   );
// };

// const Frame = () => {
//   const device = useCameraDevice('front');
//   const FrameProcessor = useFrameProcessor(frame => {
//     'worklet';
//     console.log(`Frame: ${frame.width}x${frame.height} (${frame.pixelFormat})`);
//   }, []);
//   if (device == null) return <NoCameraDeviceError />;
//   return (
//     <Camera
//       style={StyleSheet.absoluteFill}
//       device={device}
//       isActive={true}
//       frameProcessor={FrameProcessor}
//     />
//   );
// };

const styles = StyleSheet.create({
  video: {
    height: '100%',
    // backgroundColor: 'gray',
    width: '80%',
  },
  camera: {
    height: '50%',
    backgroundColor: 'rgba(200,200,200,0.8)',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sideCard: {
    height: '100%',
    width: '20%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  score: {
    backgroundColor: 'rgba(70,210,90,1)',
    width: '100%',
    height: '50%',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

export default VideoScreen;
