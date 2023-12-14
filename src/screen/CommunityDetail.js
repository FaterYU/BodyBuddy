import {
  Text,
  View,
  Image,
  Dimensions,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  PanResponder,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Swiper from 'react-native-swiper';
import React, {useRef, useEffect, useState} from 'react';
// import { createStackNavigator } from '@react-navigation/stack';

import CourseCard from './courseCard';
const screenWidth = Dimensions.get('window').width;

function CommunityDetail({navigation, route}) {
  const [data, setData] = useState([]);
  const id = route.params.momentId;
  useEffect(() => {
    const fetchData = async () => {
      const url = 'http://bodybuddy.fater.top/api/moments/findOne';
      const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({id: id}),
      };
      try {
        const response = await fetch(url, requestOptions);
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [id]);
  console.log("data: ",data);
  if (!data || data.length === 0) {
    return(
      <View style={{justifyContent:'center',alignItems:'center',flex:1,height:'100%'}}>
        <Text>Loading...</Text>
      </View>
    )
  }
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{backgroundColor: 'gray', height: 300, width: '100%'}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 10,
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons
              name="chevron-left"
              size={40}
              color="black"
            />
          </TouchableOpacity>
        </View>
      </View>
      {/* <ImageSlider /> */}
      <Text style={{color: 'black', paddingHorizontal: 26, paddingTop: 16}}>
        {data.content.text}
      </Text>
      <CourseCard
        courseImg={require('../assets/courses/pexels-li-sun-2294361.jpg')}
        courseName={"HIIT燃脂-臀推初级"}
        courseTime={30}
        courseCalorie={300}
        courseLevel={'零基础'}
        finishTTime={2}
      />
      <Text
        style={{
          alignSelf: 'flex-start',
          fontSize: 12,
          marginLeft: 12,
          marginTop: -4,
        }}>
        发布于11月29日 22:00
      </Text>
      <View
        style={{
          height: 1,
          width: '90%',
          backgroundColor: 'rgba(220,220,220,0.8)',
          marginTop: 10,
        }}></View>
      <CommentCard />
      <CommentCard />
      <CommentCard />
    </ScrollView>
  );
}

const ImageSlider = ({images}) => {
  return (
    <Swiper style={styles.wrapper} showsButtons={false} showsPagination={false}>
      {images.map((image, index) => (
        <View key={index} style={styles.slide}>
          <Image source={{uri: image}} style={styles.image} />
        </View>
      ))}
    </Swiper>
  );
};

const CommentCard = () => {
  return (
    <View style={{flexDirection: 'row', width: '100%', height: 80}}>
      <View
        style={{
          height: 40,
          width: 40,
          borderRadius: 20,
          backgroundColor: 'gray',
          margin: 10,
        }}></View>
      <View style={{flexDirection: 'column', width: '76%'}}>
        <Text style={{marginTop: 10}}>UserName</Text>
        <Text style={{color: 'black'}}>点赞评论加关注，坚持打工不迷路</Text>
        <Text style={{fontSize: 10}}>11月29日 22:31</Text>
      </View>
      <MaterialCommunityIcons
        name="heart-outline"
        size={15}
        style={{alignSelf: 'flex-start', marginTop: 16}}
      />
      {/* <MaterialCommunityIcons name="heart" color={'red'} size={15} style={{alignSelf:'flex-start', marginTop:16}} /> */}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CommunityDetail;
