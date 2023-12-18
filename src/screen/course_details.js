import {Divider} from '@rneui/themed';
import {
  Button,
  Center,
  Flex,
  IconButton,
  VStack,
  Box,
  Icon,
  ScrollView,
} from 'native-base';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
  ReactFragment,
  ImageBackground,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  StatusBar,
  Image,
} from 'react-native';
import {BorderlessButton} from 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FitsService from '../services/fits.service';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

function DetailsScreen({navigation, route}) {
  const courseId = route.params.id;
  const [courseData, setCourseData] = useState(null);
  const [fitId, setFitId] = useState(null);
  useEffect(() => {
    const getCourseDate = () => {
      const url =
        global.storage.getString('serverDomain') + 'courses/getCourseById';
      const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          id: courseId,
        }),
      };
      fetch(url, requestOptions)
        .then(response => response.json())
        .then(data => {
          console.log(data.content.poseList);
          setCourseData(data);
        });
    };
    getCourseDate();
  }, []);

  const goToVideo = () => {
    FitsService.create({
      userId: 1,
      courseId: courseId,
    })
      .then(res => {
        console.log(res.data.id);
        setFitId(res.data.id);
        return res.data.id;
      })
      .then(id => {
        navigation.navigate('VideoScreen', {
          id: courseId,
          courseData: courseData,
          fitId: id,
        });
      });
  };

  const photoUrl = courseData
    ? global.storage.getString('serverDomain') +
      'files/download?name=' +
      courseData.photo
    : '';
  if (courseData == null) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  return (
    <ScrollView>
      <StatusBar translucent backgroundColor="transparent" />
      <ImageBackground
        style={styles.top}
        source={courseData ? {uri: photoUrl} : null}>
        <View
          style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.2)', paddingTop: 32}}>
          <View
            style={{
              width: '95%',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <MaterialCommunityIcons
                name="chevron-left"
                size={40}
                color="white"
              />
            </TouchableOpacity>
            <MaterialCommunityIcons name="share" size={35} color="white" />
          </View>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.header}>
            {courseData.name}
          </Text>
          <View style={styles.top_list}>
            <View>
              <Text style={styles.tlhead}>时长</Text>
              <Text style={styles.tldetails}>{courseData.duration}s</Text>
            </View>
            <Divider
              style={styles.tl_divider}
              color={'rgba(240,240,240,0.1)'}
              orientation="vertical"
              width={2}
            />
            <View>
              <Text style={styles.tlhead}>燃脂</Text>
              <Text style={styles.tldetails}>
                {courseData.infomation.calorie}千卡
              </Text>
            </View>
            <Divider
              style={styles.tl_divider}
              color={'rgba(240,240,240,0.1)'}
              orientation="vertical"
              width={2}
            />
            <View>
              <Text style={styles.tlhead}>难度</Text>
              <Text style={styles.tldetails}>
                L{courseData.infomation.level}
              </Text>
            </View>
          </View>
        </View>
      </ImageBackground>
      <View style={{flexDirection: 'column', width: '100%'}}>
        <Text
          style={{
            color: '#333333',
            fontSize: 20,
            fontWeight: '700',
            margin: 10,
            marginTop: 14,
          }}>
          课前准备
        </Text>
        <Text
          style={{
            color: '#6E6E6E',
            fontSize: 16,
            margin: 10,
            marginTop: 4,
            paddingHorizontal: 12,
          }}>
          {courseData.content.prepare}
        </Text>
        <Text
          style={{
            color: '#333333',
            fontSize: 20,
            fontWeight: '700',
            margin: 10,
            marginTop: 2,
          }}>
          课程介绍
        </Text>
        <Text
          style={{
            color: '#6E6E6E',
            fontSize: 16,
            margin: 10,
            marginTop: 4,
            paddingHorizontal: 12,
          }}>
          {courseData.content.description}
        </Text>
        <View style={styles.trainData}>
          <View style={{flexDirection: 'column', alignItems: 'center'}}>
            <Text style={{color: '#4969FF', fontWeight: '700', fontSize: 20}}>
              训练次数
            </Text>
            <Text style={{color: 'black', fontSize: 24, fontWeight: 'bold'}}>
              {courseData.infomation.practiced > 99
                ? '99+'
                : courseData.infomation.practiced}
              次
            </Text>
          </View>
          <View
            style={{height: 50, width: 2, backgroundColor: '#E4E4E4'}}></View>
          <View style={{flexDirection: 'column', alignItems: 'center'}}>
            <Text style={{color: '#4969FF', fontWeight: '700', fontSize: 20}}>
              最高评分
            </Text>
            <Text style={{color: 'black', fontSize: 24, fontWeight: 'bold'}}>
              {courseData.infomation.score}分
            </Text>
          </View>
          <View
            style={{height: 50, width: 2, backgroundColor: '#E4E4E4'}}></View>
          <View style={{flexDirection: 'column', alignItems: 'center'}}>
            <Text style={{color: '#4969FF', fontWeight: '700', fontSize: 20}}>
              连续天数
            </Text>
            <Text style={{color: 'black', fontSize: 24, fontWeight: 'bold'}}>
              2天
            </Text>
          </View>
        </View>
        <View>
          <Text
            style={{
              color: '#333333',
              fontSize: 20,
              fontWeight: '900',
              marginTop: 20,
              margin: 10,
            }}>
            动作列表
          </Text>
        </View>
      </View>
      <VStack>
        {courseData.content.poseList?.map((item, index) => {
          const img =
            global.storage.getString('serverDomain') +
            'files/download?name=' +
            item.photo;
          return (
            <View style={styles.list}>
              <Image source={{uri: img}} style={styles.list_pic}></Image>
              <View style={{flexDirection: 'column'}}>
                <Text style={styles.list_head}>{item.name}</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    marginLeft: 16,
                    overflow: 'scroll',
                    width: '95%',
                    height: 20,
                  }}>
                  {item.tags.muscle?.map((item, index) => {
                    if (index > 1 || item.length > 24) {
                      return;
                    }
                    return (
                      <View
                        style={{
                          backgroundColor: 'rgba(140,130,250,0.8)',
                          borderRadius: 20,
                          paddingHorizontal: 6,
                          paddingVertical: 2,
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginRight: 4,
                        }}>
                        <Text style={{fontSize: 12, color: 'white'}}>
                          {item}
                        </Text>
                      </View>
                    );
                  })}
                </View>
                <Text style={styles.list_details}>{item.like} likes</Text>
              </View>
            </View>
          );
        })}
      </VStack>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          marginVertical: 10,
        }}>
        <TouchableOpacity style={styles.button} onPress={goToVideo}>
          <Text style={{color: 'white', fontSize: 18}}>开始第3次训练</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  top: {
    height: screenHeight * 0.34,
    width: '100%',
    justifyContent: 'center',
  },
  header: {
    fontWeight: '900',
    color: 'white',
    fontSize: 32,
    alignSelf: 'center',
    marginTop: '10%',
  },
  top_list: {
    alignSelf: 'center',
    height: 100,
    marginTop: 15,
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tlhead: {
    flexDirection: 'row',
    marginTop: 20,
    color: 'white',
    fontSize: 15,
    alignSelf: 'center',
  },
  tl_divider: {
    backgroundColor: 'rgba(255,255,255,1)',
    marginVertical: 30,
  },
  tldetails: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 8,
    color: 'white',
    fontSize: 24,
    flexGrow: 3,
  },
  trainData: {
    backgroundColor: '#FAFAFA',
    marginVertical: 12,
    width: screenWidth - 40,
    height: 100,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 20,
    alignSelf: 'center',
  },
  list: {
    width: '90%',
    height: 100,
    marginTop: 15,
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  list_pic: {
    width: 125,
    height: 100,
    backgroundColor: 'gray',
    marginLeft: 0,
    borderRadius: 10,
  },
  list_head: {
    marginLeft: 16,
    marginVertical: 4,
    color: '#333333',
    fontSize: 18,
  },
  list_details: {
    marginLeft: 16,
    marginTop: 4,
    fontSize: 14,
  },
  button: {
    width: '90%',
    borderRadius: 20,
    backgroundColor: '#4969FF',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DetailsScreen;
