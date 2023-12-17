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
const screenWidth = Dimensions.get('window').width;

function CoursesScreen({navigation}) {
  const [search, setSearch] = useState('');

  const handleSearch = () => {
    setSearch('');
    navigation.navigate('SearchScreen', {searchContent: search});
  };
  const updateSearch = text => {
    setSearch(text);
  };

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
              68分钟
            </Text>
          </View>
          <View style={{flexDirection: 'column', alignItems: 'center'}}>
            <Text style={{fontSize: 14}}>完成天数</Text>
            <Text style={{fontSize: 18, color: 'black', marginTop: 10}}>
              2/28天
            </Text>
          </View>
          <View style={{flexDirection: 'column', alignItems: 'center'}}>
            <Text style={{fontSize: 14}}>累计消耗</Text>
            <Text style={{fontSize: 18, color: 'black', marginTop: 10}}>
              82分钟
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
          <CourseCard
            courseId={1}
            courseImg={require('../assets/courses/pexels-li-sun-2294361.jpg')}
            courseName={'HIIT燃脂-臀推初级'}
            courseTime={30}
            courseCalorie={300}
            courseLevel={'零基础'}
            finishTTime={2}
          />
          <CourseCard
            courseId={2}
            courseImg={require('../assets/courses/pexels-pixabay-235922.jpg')}
            courseName={'HIIT燃脂-臀推初级'}
            courseTime={22}
            courseCalorie={200}
            courseLevel={'零基础'}
            finishTTime={2}
          />
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
          <RecommendCourse
            courseName={'腹肌训练入门'}
            takeTime={'20'}
            kalorie={'81'}
            level={'零基础'}
            BGimg={require('../assets/courses/pexels-li-sun-2294361.jpg')}
          />
          <RecommendCourse
            courseName={'腰腹核心训练'}
            takeTime={'20'}
            kalorie={'131'}
            level={'零基础'}
            BGimg={require('../assets/courses/pexels-li-sun-2294363.jpg')}
          />
          <RecommendCourse
            courseName={'每日有氧'}
            takeTime={'30'}
            kalorie={'221'}
            level={'零基础'}
            BGimg={require('../assets/courses/pexels-pixabay-40751.jpg')}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const RecommendCourse = ({courseName, takeTime, kalorie, level, BGimg}) => {
  return (
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
