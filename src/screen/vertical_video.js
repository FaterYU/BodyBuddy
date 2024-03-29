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
  const scores=[90, 67, 93, 83, 81, 89, 62, 55, 85, 51, 53, 54, 87, 61, 60, 77, 79, 83, 88, 84, 75, 95, 97, 91, 92, 87, 89, 88, 79, 88, 89, 91, 81, 76, 86, 82, 85, 81, 82, 87, 90];
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


  useEffect(() => {
    const handleVideoPlay = () => {
      const videoInterval = setInterval(() => {
        console.log(`scores:${ scores[currentIndex]}`, currentIndex);
        if (currentIndex < scores.length - 1) {
          setCurrentIndex(currentIndex + 1);
        }
      }, 1000);

      return () => clearInterval(videoInterval);
    };

    handleVideoPlay(); // Start reading values when video starts playing

    // Cleanup function
    // return () => clearInterval(handleVideoPlay);
  }, [currentIndex, scores]);

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
              paused={!playVideos}
            />
            <VerticalGrid
              value={scores[currentIndex]}

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

  useEffect(() => {
    const updatedGridColors = gridColors.map((color, index) => {
      return index * 5 <= value ? `rgb(${255 - value * 2.55}, ${255 - value * 2.55}, 255)` : '#FFFFFF';
    });
    setGridColors(updatedGridColors);
  }, [value]);

  return (
    <View style={{ flexDirection: 'column', justifyContent: 'space-around', height: (screenHeight*0.64) }}>
      {gridColors.map((color, index) => (
        <View key={index} style={{ width: screenWidth*0.3, height: (screenHeight*0.64)/20, backgroundColor: color,
          borderBottomWidth: 1, borderBottomColor: 'rgba(200,200,200,0.8)'
      }} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  score: {
    backgroundColor: 'rgba(70,210,90,1)',
    width: 320,
    height: screenHeight - (320 * 9) / 16,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    overflow: 'visible',
    paddingVertical: 30,
  },
});

export default VideoScreen;
