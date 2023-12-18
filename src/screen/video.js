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
import {
  useFrameProcessor,
  useCameraDevice,
  NoCameraDeviceError,
  Camera,
  useCameraDevices,
} from 'react-native-vision-camera';
import Video from 'react-native-video';
import FitsService from '../services/fits.service';
import CoursesService from '../services/courses.service';

const VideoScreen = ({navigation, route}) => {
  const courseId = route.params.id;
  const courseData = route.params.courseData;
  const fitId = route.params.fitId;
  useEffect(() => {
    // 设置为横屏
    Orientation.lockToLandscape();

    // 在组件卸载时重置为竖屏
    return () => {
      Orientation.lockToPortrait();
    };
  }, []); // 确保这个 effect 只在组件挂载和卸载时执行

  const [isVisible, setIsVisible] = useState(false);
  const [scoreList, setScoreList] = useState([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const getData = () => {
      FitsService.getScore({
        id: fitId,
      })
        .then(res => {
          setScoreList(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    };
    getData();
  }, [fitId]);

  const showGoBackButton = () => {
    setIsVisible(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 3000);
  };
  const finishCourse = () => {
    Orientation.lockToPortrait();
    FitsService.getOneFitScoreById({
      id: fitId,
    }).then(res => {
      navigation.navigate('CourseFinish', {
        fitId: fitId,
        score: res.data.totalScore,
        duration: duration,
      });
    });
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
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{position: 'absolute', top: 14, left: 6, zIndex: 1000}}>
            <MaterialCommunityIcons
              name="chevron-left-circle"
              size={26}
              color="rgba(180,180,180,0.8)"
              style={{alignSelf: 'flex-start'}}
            />
          </TouchableOpacity>
          <Video
            source={{
              uri:
                global.storage.getString('serverDomain') +
                'files/download?name=' +
                courseData.content.poseList[0].video,
            }}
            style={{flex: 1, width: '100%'}}
            controls={true}
            resizeMode="cover"
            poster={
              global.storage.getString('serverDomain') +
              'files/download?name=' +
              courseData.content.poseList[0].photo
            }
            onProgress={process => {
              setCurrentTime(process.currentTime);
              setDuration(process.playableDuration);
            }}
            onEnd={finishCourse}
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
            <Frame />
            <Frame />
          </View>
          <View style={styles.score}>
            <Text style={{color: 'white', marginTop: 30}}>Current Score</Text>
            <Text style={{color: 'white', fontSize: 44, fontWeight: 700}}>
              {Math.round(scoreList[Math.round(currentTime * 2)])}
            </Text>
            <Text style={{color: 'white', marginBottom: 30}}>Keep Doing!</Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const Frame = () => {
  const device = useCameraDevice('front');
  const FrameProcessor = useFrameProcessor(frame => {
    'worklet';
    // console.log(`Frame: ${frame.width}x${frame.height} (${frame.pixelFormat})`);
  }, []);
  if (device == null) return <NoCameraDeviceError />;
  return (
    <Camera
      style={StyleSheet.absoluteFill}
      device={device}
      isActive={true}
      frameProcessor={FrameProcessor}
    />
  );
};

const styles = StyleSheet.create({
  video: {
    height: '100%',
    backgroundColor: 'gray',
    flexDirection: 'column',
    width: '65%',
  },
  camera: {
    flex: 1,
    aspectRatio: 9 / 16,
    transform: [{rotate: '90deg'}],
    backgroundColor: 'rgba(200,200,200,0.8)',
    height: '65%',
  },
  sideCard: {
    height: '100%',
    width: '35%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  score: {
    backgroundColor: 'rgba(70,210,90,1)',
    width: '100%',
    height: '40%',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

export default VideoScreen;
