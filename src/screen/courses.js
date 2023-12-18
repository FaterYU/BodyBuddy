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
import React, {useState, useEffect} from 'react';
import {SearchBar} from '@rneui/themed';
import SevenDaysCalendar from './weekCalendar';
import CourseCard from './courseCard';
import {Image} from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';
import FitsService from '../services/fits.service';
import CoursesService from '../services/courses.service';
import {useNavigation} from '@react-navigation/native';
const screenWidth = Dimensions.get('window').width;

function CoursesScreen({navigation}) {
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

  const handleSearch = () => {
    setSearch('');
    navigation.navigate('SearchScreen', {searchContent: search});
  };
  const updateSearch = text => {
    setSearch(text);
  };

  useEffect(() => {
    FitsService.getLongTimeData({id: 1})
      .then(res => {
        setTotalData(res.data);
      })
      .catch(err => {
        console.log(err);
      });
    CoursesService.getLastCourseList({uid: 1})
      .then(res => {
        setLastCourse(res.data);
      })
      .catch(err => {
        console.log(err);
      });
    CoursesService.getRecommendCourseList({uid: 1})
      .then(res => {
        setRecommendCourse(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  var currentDate = new Date();
  const todayWeek = currentDate.getDay();
  const weekName = ['日', '一', '二', '三', '四', '五', '六'];
  const currentMonth = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate();
  currentDate = currentMonth + '/' + currentDay;
  const goToCalendar = () => {
    navigation.navigate('Calendar');
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      style={{backgroundColor: '#ffffff'}}>
      <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
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
            fontSize: 16,
            fontWeight: 'bold',
            marginLeft: 10,
            marginBottom: 4,
          }}>
          星期{weekName[todayWeek]}
        </Text>
      </View>
      <SearchBar
        inputStyle={{
          fontSize: 16,
        }}
        placeholder="Search Here..."
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
          <View style={{flexDirection: 'column', alignItems: 'center'}}>
            <Text style={{fontSize: 14}}>累计运动</Text>
            <Text style={{fontSize: 18, color: 'black', marginTop: 10}}>
              {totalData.totalDuration} min
            </Text>
          </View>
          <View style={{flexDirection: 'column', alignItems: 'center'}}>
            <Text style={{fontSize: 14}}>完成天数</Text>
            <Text style={{fontSize: 18, color: 'black', marginTop: 10}}>
              {totalData.totalDay} day
            </Text>
          </View>
          <View style={{flexDirection: 'column', alignItems: 'center'}}>
            <Text style={{fontSize: 14}}>累计消耗</Text>
            <Text style={{fontSize: 18, color: 'black', marginTop: 10}}>
              {totalData.totalCalorie} kcal
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
            查看今日训练计划
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{width: '100%'}}>
        <Text
          style={{
            color: 'black',
            fontSize: 16,
            fontWeight: 'bold',
            marginLeft: 20,
            marginVertical: 10,
          }}>
          最近课程
        </Text>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
          }}>
          {lastCourse &&
            lastCourse.map((item, index) => {
              return (
                <CourseCard
                  courseId={item.id}
                  courseImg={{
                    uri:
                      'http://bodybuddy.fater.top/api/files/download?name=' +
                      item.photo,
                  }}
                  courseName={item.name}
                  courseTime={item.duration}
                  courseCalorie={item.calorie}
                  courseLevel={''}
                  finishTime={2}
                />
              );
            })}
        </View>
      </View>
      <View style={{width: '100%'}}>
        <Text
          style={{
            color: 'black',
            fontSize: 16,
            fontWeight: 'bold',
            marginLeft: 20,
            marginVertical: 10,
          }}>
          推荐课程
        </Text>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
          }}>
          {recommendCourse &&
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
                      'http://bodybuddy.fater.top/api/files/download?name=' +
                      item.photo,
                  }}
                />
              );
            })}
        </View>
      </View>
    </ScrollView>
  );
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
        navigation.navigate('DetailsScreen', {id: courseId});
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
          <Text style={{color: 'white', fontSize: 17, marginLeft: 10}}>
            {courseName}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              marginBottom: 6,
            }}>
            <Text style={{fontSize: 12, marginLeft: 10, color: 'white'}}>
              {takeTime}分钟
            </Text>
            <Text style={{fontSize: 12, marginLeft: 10, color: 'white'}}>
              {kalorie}千卡
            </Text>
            <Text style={{fontSize: 12, marginLeft: 10, color: 'white'}}>
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
