import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {
  Input,
  Box,
  AspectRatio,
  Image,
  Center,
  Stack,
  HStack,
} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Tab, TabView, SearchBar} from '@rneui/themed';
import {useNavigation} from '@react-navigation/native';
import CourseCard from './courseCard';
import {WaterfallList} from './community';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const AllCourse = ({navigation}) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const url =
        global.storage.getString('serverDomain') + '/courses/getCourseList';
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      };
      try {
        const response = await fetch(url, requestOptions);
        const jsonData = await response.json();
        console.log(jsonData);
        setData(jsonData.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
  }, []);
  return(
    <View>
      <CourseList renderData={data}></CourseList>
    </View>
  );
}

const CourseList = ({renderData}) => {
  if (renderData === undefined) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        {/* <Text>Network Error!</Text> */}
        <Text>网络错误！</Text>
        <Image
          source={require('../assets/backgrounds/empty.png')}
          alt="empty"
          style={{width: screenWidth - 80, height: screenWidth - 80}}
        />
      </View>
    );
  }
  if (renderData.length === 0) {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
        {/* <Text>No Course Was Found!</Text> */}
        <Text>没有找到相关课程！</Text>
        <Image
          source={require('../assets/backgrounds/empty.png')}
          alt="empty"
          style={{width: screenWidth - 80, height: screenWidth - 80}}
        />
      </View>
    );
  }
  return (
    <ScrollView contentContainerStyle={{marginTop: 10}}>
      {renderData.map((item, index) => {
        return (
          <CourseCard
            courseId={item.id}
            courseName={item.name}
            courseImg={{
              uri:
                global.storage.getString('serverDomain') +
                'files/download?name=' +
                item.photo,
            }}
            courseTime={item.duration}
            courseCalorie={item.calorie}
            courseLevel={item.level}
            finishTime={
              global.storage.getBoolean('isLogin')
                ? item.userPracticed
                : item.practiced
            }
          />
        );
      })}
    </ScrollView>
  );
};


export default AllCourse;
