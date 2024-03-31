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
  StatusBar,
} from 'react-native';
import Orientation from 'react-native-orientation-locker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  useFrameProcessor,
  useCameraDevice,
  NoCameraDeviceError,
  Camera,
} from 'react-native-vision-camera';
import { useSharedValue, Worklets } from 'react-native-worklets-core';
import Video from 'react-native-video';
import FitsService from '../services/fits.service';
import CoursesService from '../services/courses.service';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const VideoScreen = ({ navigation, route }) => {
  const courseId = route.params.id;
  const courseData = route.params.courseData;
  const [video1Loaded, setVideo1Loaded] = useState(false);
  const [video2Loaded, setVideo2Loaded] = useState(false);
  const [playVideos, setPlayVideos] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const fitId = route.params.fitId;
  const [isVisible, setIsVisible] = useState(false);
  const [CurrentScore, setCurrentScore] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [score, setScore] = useState([]);

  const level = ['Try Harder!', 'Keep Doing!', 'Good Job!', 'Excellent!'];
  const levelColor = [
    'rgba(220,30,30,0.8)',
    'rgba(220,220,30,0.8)',
    'rgba(30,220,30,0.8)',
    'rgba(30,220,220,0.8)',
  ];
  const scores=[90, 67, 93, 83, 81, 89, 62, 55, 85, 51, 53, 54, 87, 61, 60, 77, 79, 83, 88, 84, 75, 95, 97, 91, 92, 87, 89, 88, 79, 88, 89, 91, 81, 76, 86, 82, 85, 81, 82, 87, 90];

  const handleProgress = (data) => {
    // 获取视频当前播放时间
    setCurrentTime(data.currentTime);
  };



  useEffect(() => {
    if (video1Loaded && video2Loaded) {
      setPlayVideos(true);
    }
  }, [video1Loaded, video2Loaded]);

  const showGoBackButton = () => {
    setIsVisible(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 3000);
  };
  const finishCourse = () => {
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


  useEffect(() => {
    const currentSecond = Math.floor(currentTime);
    if (scores.length > 0 && currentSecond < scores.length) {
      setCurrentScore(scores[currentSecond]);
    }
  }, [currentTime, scores]);

  return (
    <TouchableWithoutFeedback onPress={showGoBackButton}>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          flexDirection: 'column',
        }}>
        <StatusBar hidden={true} />
        <View style={styles.video}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ position: 'absolute', top: 24, left: 6, zIndex: 1000 }}>
            <MaterialCommunityIcons
              name="chevron-left-circle"
              size={26}
              color="rgba(180,180,180,0.8)"
              style={{ alignSelf: 'flex-start' }}
            />
          </TouchableOpacity>
          {/* <Video
            source={{
              require: require('../data/train.mp4'),
            }}
            style={{width:100,height:40}}
            controls={true}
            resizeMode="cover"
            // poster={
            //   require('../data/train.mp4')
            // }
            onProgress={process => {
              setCurrentTime(process.currentTime);
              setDuration(process.playableDuration);
            }}
            onEnd={finishCourse}
          /> */}
          <Video
            source={require('../data/train.mp4')}
            onLoad={() => {
              setVideo1Loaded(true);
              // setCurrentIndex(0);
            }}
            // onPlay={handleVideoPlay}
            style={{ width: screenWidth, height: screenHeight * 0.36 }}
            controls={true}
            resizeMode="cover"
            paused={!playVideos}
            onProgress={handleProgress}
            onEnd={finishCourse}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
            }}
          >
            <Video
              source={require('../data/camera.mp4')}
              onLoad={() => setVideo2Loaded(true)}
              // onPlay={handleVideoPlay}
              style={{ width: screenWidth * 0.7, height: screenHeight * 0.64 }}
              resizeMode="cover"
              onProgress={handleProgress}
              paused={!playVideos}
            />
            <VerticalGrid
              value={CurrentScore}

            />
          </View>
        </View>

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

      </View>
    </TouchableWithoutFeedback>
  );
};


const VerticalGrid = ({ value }) => {
  const [gridColors, setGridColors] = useState(Array(20).fill('#FFFFFF'));
  const val=value;
  console.log(value);
  useEffect(() => {
    const updatedGridColors = gridColors.map((color, index) => {
      if (100-(index * 5) >= value) {
        return '#FFFFFF';
      }else if(value>=90){
        return 'rgba(255,0,0,1)';
      }else if(value>=80){
        return 'rgba(255,165,0,1)';
      }else if(value>=70){
        return 'rgba(255,255,0,1)';
      }else if(value>=60){
        return 'rgba(0,128,0,1)';
      }
    });
    setGridColors(updatedGridColors);
  }, [value]);

  return (
    <View style={{
      flexDirection: 'column',
      justifyContent: 'space-around',
      height: (screenHeight*0.64),
      }}>
      <View
        style={{
          position:'absolute',
          height:screenHeight*0.64,
          width:screenWidth*0.3,
          top: 0,
          left:0,
          zIndex:1000,
          justifyContent:'center',
          alignItems:'center',
        }}
      >
        <Text style={{fontSize:36,color:'white',fontWeight:'bold'}}>{val}</Text>
      </View>
      {gridColors.map((color, index) => (
        <View key={index} style={{ width: screenWidth*0.3, height: (screenHeight*0.64)/20, backgroundColor: color,
          borderBottomWidth: 2, borderBottomColor: 'rgba(30,30,30,0.8)', borderStyle: 'solid'
      }} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({

});

export default VideoScreen;
