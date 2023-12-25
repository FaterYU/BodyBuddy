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
  Modal,
} from 'react-native';
import Orientation from 'react-native-orientation-locker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  useFrameProcessor,
  useCameraDevice,
  NoCameraDeviceError,
  Camera,
} from 'react-native-vision-camera';
import Video from 'react-native-video';
import FitsService from '../services/fits.service';
import CoursesService from '../services/courses.service';

const screenWidth =
  Dimensions.get('window').width > Dimensions.get('window').height
    ? Dimensions.get('window').width
    : Dimensions.get('window').height;
const screenHeight =
  Dimensions.get('window').height < Dimensions.get('window').width
    ? Dimensions.get('window').height
    : Dimensions.get('window').width;

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
  const [scoreLevel, setScoreLevel] = useState(0);
  const level = ['Try Harder!', 'Keep Doing!', 'Good Job!', 'Excellent!'];
  const levelColor = [
    'rgba(220,30,30,0.8)',
    'rgba(220,220,30,0.8)',
    'rgba(30,220,30,0.8)',
    'rgba(30,220,220,0.8)',
  ];
  useEffect(() => {
    if (Math.round(scoreList[Math.round(currentTime * 2)]) > 85) {
      setScoreLevel(3);
    } else if (Math.round(scoreList[Math.round(currentTime * 2)]) > 70) {
      setScoreLevel(2);
    } else if (Math.round(scoreList[Math.round(currentTime * 2)]) > 60) {
      setScoreLevel(1);
    } else {
      setScoreLevel(0);
    }
  }, [currentTime]);
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
            style={{position: 'absolute', top: 24, left: 6, zIndex: 1000}}>
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
            style={{flex: 1, width: '100%', marginLeft: -44}}
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
              top: 26,
              right: 12,
              zIndex: 1000,
              opacity: isVisible ? 1 : 0,
            }}
            onPress={finishCourse}>
            <MaterialCommunityIcons
              name="location-exit"
              size={28}
              color="rgba(200,200,200,0.8)"
              style={{}}
            />
          </TouchableOpacity>
          <View style={styles.cameraBox}>
            <Frame />
          </View>
          <View
            style={[styles.score, {backgroundColor: levelColor[scoreLevel]}]}>
            <Text style={{color: 'white'}}>Current Score</Text>
            <Text style={{color: 'white', fontSize: 44, fontWeight: 700}}>
              {Math.round(scoreList[Math.round(currentTime * 2)])}
            </Text>
            <Text style={{color: 'white'}}>{level[scoreLevel]}</Text>
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
      style={[StyleSheet.absoluteFill, styles.camera]}
      device={device}
      isActive={true}
      resizeMode="contain"
      frameProcessor={FrameProcessor}
    />
  );
};

const styles = StyleSheet.create({
  video: {
    height: '100%',
    backgroundColor: 'rgba(255,255,255,1)',
    flexDirection: 'column',
    width: screenWidth - 320,
  },
  cameraBox: {
    width: 320,
    height: 320 * (9 / 16),
  },
  camera: {
    transform: [{rotate: '90deg'}, {translateX: -70}],
    height: 320,
  },
  sideCard: {
    height: '100%',
    width: 320,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  score: {
    backgroundColor: 'rgba(70,210,90,1)',
    width: 320,
    height: screenHeight - 320 * (9 / 16),
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    overflow: 'visible',
    paddingVertical: 30,
  },
});

export default VideoScreen;
