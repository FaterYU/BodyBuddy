import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  ImageBackground,
  StatusBar,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React, { useState, useEffect } from 'react';
import { SearchBar } from '@rneui/themed';
import SevenDaysCalendar from './weekCalendar';
import CourseCard from './courseCard';
import { Image } from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';
import FitsService from '../services/fits.service';
import CoursesService from '../services/courses.service';
import { useNavigation } from '@react-navigation/native';
const screenWidth = Dimensions.get('window').width;

function CoursesScreen({ navigation, route }) {
  const [search, setSearch] = useState('');
  const [totalData, setTotalData] = useState([
    {
      totalCalorie: null,
      totalDay: null,
      totalDuration: null,
    },
  ]);
  const [lastCourse, setLastCourse] = useState([]);
  const [recommendCourse, setRecommendCourse] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const handleSearch = () => {
    setSearch('');
    navigation.navigate('SearchScreen', { searchContent: search });
  };
  const updateSearch = text => {
    setSearch(text);
  };

  useEffect(() => {
    if (global.storage.getBoolean('isLogin') === false) {
      setRefresh(false);
      setTotalData([
        {
          totalCalorie: null,
          totalDay: null,
          totalDuration: null,
        },
      ]);
      setLastCourse([]);
      CoursesService.getRecommendCourseList()
        .then(res => {
          setRecommendCourse(res.data);
        })
        .catch(err => {
          console.log(err);
        });
      return;
    }
    FitsService.getLongTimeData({ id: global.storage.getNumber('uid') })
      .then(res => {
        setTotalData(res.data);
      })
      .catch(err => {
        console.log(err);
      });
    CoursesService.getLastCourseList({ uid: global.storage.getNumber('uid') })
      .then(res => {
        setLastCourse(res.data);
      })
      .catch(err => {
        console.log(err);
      });
    CoursesService.getRecommendCourseList({
      uid: global.storage.getNumber('uid'),
    })
      .then(res => {
        setRecommendCourse(res.data);
      })
      .catch(err => {
        console.log(err);
      });
    setRefresh(false);
  }, [refresh]);

  useEffect(() => {
    setRefresh(route.params?.refresh);
  }, [route.params]);

  var currentDate = new Date();
  const todayWeek = currentDate.getDay();
  // const weekName = [
  //   'Sunday',
  //   'Monday',
  //   'Tuesday',
  //   'Wednesday',
  //   'Thursday',
  //   'Friday',
  //   'Saturday',
  // ];
  const weekName = [
    '星期日',
    '星期一',
    '星期二',
    '星期三',
    '星期四',
    '星期五',
    '星期六',
    '星期日',
  ]
  const currentMonth = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate();
  currentDate = currentMonth + '/' + currentDay;
  const goToCalendar = () => {
    navigation.navigate('Calendar');
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      style={{ backgroundColor: '#ffffff' }}>
      <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
        <Text
          style={{
            color: '#4969ff',
            fontSize: 26,
            fontWeight: 'bold',
            marginLeft: 10,
          }}>
          {currentDate}
        </Text>
        <Text
          style={{
            color: 'black',
            fontSize: 17,
            fontWeight: 'bold',
            marginLeft: 10,
            marginBottom: 4,
          }}>
          {weekName[todayWeek]}
        </Text>
      </View>
      <SearchBar
        inputStyle={{
          fontSize: 16,
        }}
        // placeholder="Search Here..."
        placeholder='点击搜索'
        round={true}
        lightTheme
        showCancel
        platform="android"
        containerStyle={{
          backgroundColor: 'rgba(1,1,1,0)',
          width: screenWidth - 20,
          alignSelf: 'center',
          marginTop: -4,
        }}
        inputContainerStyle={{
          backgroundColor: '#f6f6f6',
          borderRadius: 20,
          height: 40,
        }}
        onSubmitEditing={handleSearch}
        onChangeText={updateSearch}
        value={search}
      />
      <View style={styles.calendarCard}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            paddingTop: 8,
          }}>
          <View style={{ flexDirection: 'column', alignItems: 'center' }}>
            {/* <Text style={{ fontSize: 14, color: 'gray' }}>Total Time</Text> */}
            <Text style={{ fontSize: 14, color: 'gray' }}>锻炼时长</Text> 
            <Text style={{ fontSize: 18, color: 'black', marginTop: 10 }}>
              {/* {totalData.totalDuration?totalData.totalDuration:'- -'} min */}
              {totalData.totalDuration?totalData.totalDuration:'- -'} 分钟
            </Text>
          </View>
          <View style={{ flexDirection: 'column', alignItems: 'center' }}>
            {/* <Text style={{ fontSize: 14, color: 'gray' }}>Continuous Day</Text> */}
            <Text style={{ fontSize: 14, color: 'gray' }}>持续锻炼</Text>
            <Text style={{ fontSize: 18, color: 'black', marginTop: 10 }}>
              {/* {totalData.totalDay?totalData.totalDay:'- -'} day */}
              {totalData.totalDay?totalData.totalDay:'- -'} 天
            </Text>
          </View>
          <View style={{ flexDirection: 'column', alignItems: 'center' }}>
            {/* <Text style={{ fontSize: 14, color: 'gray' }}>Total Consume</Text> */}
            <Text style={{ fontSize: 14, color: 'gray' }}>共计消耗</Text>
            <Text style={{ fontSize: 18, color: 'black', marginTop: 10 }}>
              {/* {totalData.totalCalorie?totalData.totalCalorie:'- -'} kcal */}
              {totalData.totalCalorie?totalData.totalCalorie:'- -'} 卡路里
            </Text>
          </View>
        </View>
        <SevenDaysCalendar />
        <TouchableOpacity
          activeOpacity={0.4}
          style={styles.planButton}
          onPress={goToCalendar}>
          <Text
            style={{
              color: 'white',
              fontSize: 15,
              fontWeight: 'bold',
              marginBottom: 2,
            }}>
            {/* View Today Schedule */}
            查看今日计划
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ width: '100%' }}>
        <Text
          style={{
            color: 'black',
            fontSize: 16,
            fontWeight: 'bold',
            marginLeft: 20,
            marginVertical: 10,
          }}>
          {/* Recent Course */}
          近日课程
        </Text>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
          }}>
          {
            lastCourse.length === 0 && (
              <View style={{width:'100%'}}>
                <CourseSkeleton />
                <CourseSkeleton />
              </View>
            )
          }
          {lastCourse &&
            lastCourse.map((item, index) => {
              return (
                <CourseCard
                  key={index}
                  courseId={item.id}
                  courseImg={{
                    uri:
                      global.storage.getString('serverDomain') +
                      'files/download?name=' +
                      item.photo,
                  }}
                  courseName={item.name}
                  courseTime={item.duration}
                  courseCalorie={item.calorie}
                  courseLevel={item.level}
                  finishTime={item.userPracticed}
                />
              );
            })}
        </View>
      </View>
      <View style={{ width: '100%' }}>
        <Text
          style={{
            color: 'black',
            fontSize: 16,
            fontWeight: 'bold',
            marginLeft: 20,
            marginVertical: 10,
          }}>
          {/* Recommend Course */}
          推荐课程
        </Text>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
          }}>
          {/* {recommendCourse &&
            recommendCourse.map((item, index) => {
              return (
                <RecommendCourse
                  courseId={item.id}
                  courseName={item.name}
                  takeTime={item.duration}
                  kalorie={item.calorie}
                  level={''}
                  BGimg={{
                    uri:
                      global.storage.getString('serverDomain') +
                      'files/download?name=' +
                      item.photo,
                  }}
                />
              );
            })} */}
          <RecommendCourse
            courseName={'Push-up Training'}
            takeTime={'20'}
            kalorie={'120'}
            level={'L1'}
            courseId={1}
            BGimg={require('../assets/courses/pexels-li-sun-2294361.jpg')}
          />
          <RecommendCourse
            courseName={'Waist and Abdomen Core Training'}
            takeTime={'20'}
            kalorie={'188'}
            level={'L1'}
            courseId={2}
            BGimg={require('../assets/courses/pexels-li-sun-2294363.jpg')}
          />
          <RecommendCourse
            courseName={'800 meters running training speed'}
            takeTime={'35'}
            kalorie={'100'}
            level={'L2'}
            courseId={3}
            BGimg={require('../assets/courses/pexels-pixabay-40751.jpg')}
          />
        </View>
      </View>
    </ScrollView>
  );
}
const containerWidth = 1 * screenWidth - 20;

const CourseSkeleton = () => {
  return (
    <View style={{
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: '#f2f2f2',
      marginBottom: 10,
      borderRadius: 8,
      paddingVertical:2,
      width: containerWidth,
    }}>
      <View style={{
        width: 90,
        height: 90,
        margin: 10,
        borderRadius: 8,
        marginVertical: 8,
        backgroundColor: 'rgba(215,215,215,1)',
        justifyContent:'space-around',
        paddingVertical:22,
        alignItems:'center',
        flexDirection:'column',
      }}>
        {/* <Text style={{color:"rgba(190,190,190,0.8)",fontWeight:'bold'}}>No</Text>
        <Text style={{color:"rgba(190,190,190,0.8)",fontWeight:'bold'}}>Recent</Text>
        <Text style={{color:"rgba(190,190,190,0.8)",fontWeight:'bold'}}>Course</Text> */}
        <Text style={{color:"rgba(190,190,190,0.8)",fontWeight:'bold'}}>无近日课程</Text>
      </View>
      <View
        style={{
          paddingTop:2,
          width:containerWidth-140,
          flexDirection: 'column',
          justifyContent: 'space-around',
          height: 90,
        }}>
        <View style={{
          height:16,
          width: "64%",
          paddingRight: 4,
          backgroundColor:"rgb(214,214,214)",
          borderRadius:30,
        }}></View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            width: '100%',
            marginTop: 8,
          }}>
        <View style={{
          height:12,
          width: "20%",
          paddingRight: 4,
          backgroundColor:"rgb(220,220,220)",
          borderRadius:30,
        }}></View>
        <View style={{
          height:12,
          width: "20%",
          paddingRight: 4,
          backgroundColor:"rgb(220,220,220)",
          borderRadius:30,
          marginLeft:"2%",
        }}></View>
        <View style={{
          height:12,
          width: "20%",
          paddingRight: 4,
          backgroundColor:"rgb(220,220,220)",
          borderRadius:30,
          marginLeft:"2%",
        }}></View>
        </View>
        <View style={{ flexDirection: 'column',width:"100%"}}>
        <View style={{
          height:8,
          width:"90",
          paddingRight: 4,
          backgroundColor:"rgb(210,210,210)",
          borderRadius:30,
          marginBottom:6,
          marginTop:10,
        }}></View>
        <View style={{
          height:8,
          width:"90",
          paddingRight: 4,
          backgroundColor:"rgb(210,210,210)",
          borderRadius:30,
          marginBottom:2,
        }}></View>
        </View>
      </View>
      <MaterialCommunityIcons
        name="chevron-right-circle"
        size={20}
        color="#c3c3c3"
        style={{
          alignSelf: 'flex-start',
          position: 'absolute',
          right: 10,
          top: 10,
        }}
      />
    </View>
  )
}

const RecommendCourse = ({
  courseId,
  courseName,
  takeTime,
  kalorie,
  level,
  BGimg,
}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('DetailsScreen', { id: courseId });
      }}>
      <ImageBackground
        source={BGimg}
        style={{
          marginBottom: 10,
          height: 100,
          width: screenWidth - 20,
          borderRadius: 8,
          overflow: 'hidden',
        }}>
        <LinearGradient
          colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.7)']}
          style={{
            height: 100,
            flexDirection: 'column',
            justifyContent: 'flex-end',
            overflow: 'hidden',
            paddingLeft: 10,
          }}>
          <Text style={{ color: 'white', fontSize: 17, marginLeft: 10 }}>
            {courseName}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              marginBottom: 6,
            }}>
            <Text style={{ fontSize: 12, marginLeft: 10, color: 'white' }}>
              {/* {takeTime}min */}
              {takeTime}分钟
            </Text>
            <Text style={{ fontSize: 12, marginLeft: 10, color: 'white' }}>
              {/* {kalorie}kcal */}
              {kalorie}卡路里
            </Text>
            <Text style={{ fontSize: 12, marginLeft: 10, color: 'white' }}>
              {level}
            </Text>
          </View>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default CoursesScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  calendarCard: {
    width: screenWidth - 20,
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: '#f6f6f6',
  },
  planButton: {
    width: screenWidth - 56,
    alignSelf: 'center',
    backgroundColor: '#4969ff',
    height: 32,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
});
