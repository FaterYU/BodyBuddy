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
  FlatList,
  ReactFragment,
  ImageBackground,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from 'react-native';
import {BorderlessButton} from 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

function DetailsScreen({navigation,route}) {
  const courseId = route.params.id;
  const [courseData, setCourseData] = useState(null);
  useEffect(() => {
    const getCourseDate = () => {
      const url = 'http://bodybuddy.fater.top/api/courses/getCourseById';
      const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          id: courseId,
        }),
      };
      fetch(url, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setCourseData(data);
        });
    };
    getCourseDate();
  }, []);

  const goToVideo = () => {
    navigation.navigate('VideoScreen');
  };

  const photoUrl = courseData ? 'http://bodybuddy.fater.top/api/files/download?name=' + courseData.photo : '';
  if (courseData == null) {
    return (
      <View>
        <Text>loading</Text>
      </View>
    );
  }
  return (
    <ScrollView>
      <ImageBackground style={styles.top} source={courseData ? { uri: photoUrl } : null}>
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
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.header}>{courseData.name}</Text>
        <View style={styles.top_list}>
          <View>
            <Text style={styles.tlhead}>时长</Text>
            <Text style={styles.tldetails}>2次</Text>
          </View>
          <Divider style={styles.tl_divider} orientation="vertical" width={2} />
          <View>
            <Text style={styles.tlhead}>燃脂</Text>
            <Text style={styles.tldetails}>68千卡</Text>
          </View>
          <Divider style={styles.tl_divider} orientation="vertical" width={2} />
          <View>
            <Text style={styles.tlhead}>难度</Text>
            <Text style={styles.tldetails}>零基础</Text>
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
            marginTop: 20,
          }}>
          课程介绍
        </Text>
        <Text
          style={{
            color: '#6E6E6E',
            fontSize: 16,
            margin: 10,
            marginTop: 10,
            paddingHorizontal: 12,
          }}>
          HIIT通过短暂高强度的运动和休息的交替重复进行，
          能在单位时间内就达到非常高的能量消耗效果，
          对于快节奏生活的都市人群来说这是一种非常不错的训练方式。
        </Text>
        <View style={styles.trainData}>
          <View style={{flexDirection: 'column', alignItems: 'center'}}>
            <Text style={{color: '#4969FF', fontWeight: '700', fontSize: 20}}>
              训练次数
            </Text>
            <Text style={{color: 'black', fontSize: 24, fontWeight: 'bold'}}>
              2次
            </Text>
          </View>
          <View
            style={{height: 50, width: 2, backgroundColor: '#E4E4E4'}}></View>
          <View style={{flexDirection: 'column', alignItems: 'center'}}>
            <Text style={{color: '#4969FF', fontWeight: '700', fontSize: 20}}>
              最高评分
            </Text>
            <Text style={{color: 'black', fontSize: 24, fontWeight: 'bold'}}>
              95分
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
        <View style={styles.list}>
          <View style={styles.list_pic}></View>
          <View style={{justifyContent: 'flex-start', flexDirection: 'column'}}>
            <Text style={styles.list_head}>臀部动态拉伸</Text>
            <Text style={styles.list_details}>10次</Text>
          </View>
        </View>
        <View style={styles.list}>
          <View style={styles.list_pic}></View>
          <View style={{justifyContent: 'flex-start', flexDirection: 'column'}}>
            <Text style={styles.list_head}>正踢腿</Text>
            <Text style={styles.list_details}>16次</Text>
          </View>
        </View>
        <View style={styles.list}>
          <View style={styles.list_pic}></View>
          <View style={{justifyContent: 'flex-start', flexDirection: 'column'}}>
            <Text style={styles.list_head}>俯身转体</Text>
            <Text style={styles.list_details}>8次</Text>
          </View>
        </View>
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
    height: screenHeight * 0.33,
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
    color: '#E4E4E4',
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
  },
  list_pic: {
    width: 125,
    height: 100,
    backgroundColor: 'gray',
    marginLeft: 0,
    borderRadius: 10,
  },
  list_head: {
    marginLeft: 15,
    marginTop: 5,
    color: '#333333',
    fontSize: 18,
  },
  list_details: {
    marginLeft: 15,
    fontSize: 16,
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
