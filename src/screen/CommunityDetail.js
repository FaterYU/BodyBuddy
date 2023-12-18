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
  ActivityIndicator,
  TextInput,
} from 'react-native';
// import {Input,Icon} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Swiper from 'react-native-swiper';
import React, {useRef, useMemo, useEffect, useState} from 'react';

import CourseCard from './courseCard';
import {ScreenHeight} from '@rneui/base';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

function CommunityDetail({navigation, route}) {
  const [data, setData] = useState([]);
  const [avatar, setAvatar] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [comment, setComment] = useState('');
  const [like, setLike] = useState(false);
  const [atComment, setAtComment] = useState(false);

  const id = route.params.momentId;
  const userId = 1;
  const clickLike = () => {
    const url = like
      ? global.storage.getString('serverDomain') + 'moments/likeMoment'
      : global.storage.getString('serverDomain') + 'moments/unlikeMoment';
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({uid: userId, momentId: id}),
    };
    try {
      const response = fetch(url, requestOptions);
    } catch (error) {
      console.log(error);
    }
    // const fetchData = async () => {
    //   const url = global.storage.getString('serverDomain') +'moments/findOne';
    //   const requestOptions = {
    //     method: 'POST',
    //     headers: {'Content-Type': 'application/json'},
    //     body: JSON.stringify({id: id}),
    //   };
    //   try {
    //     const response = await fetch(url, requestOptions);
    //     const json = await response.json();
    //     setData(json);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
    // fetchData();
    console.log('like:', data.like);
    setLike(like ? false : true);
  };
  useEffect(() => {
    const fetchData = async () => {
      const url = global.storage.getString('serverDomain') + 'moments/findOne';
      const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({id: id}),
      };
      try {
        const response = await fetch(url, requestOptions);
        const json = await response.json();
        fetchAuthor(json.author, json);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchAuthor = async (authorId, data) => {
      console.log('call fetchAuthor');
      const url = global.storage.getString('serverDomain') + 'users/findOne';
      const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({uid: authorId}),
      };
      try {
        const response = await fetch(url, requestOptions);
        const json = await response.json();
        setAvatar(json.photo);
        setAuthorName(json.userName);
        setData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id, atComment]);
  if (!data || data.length === 0) {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
          height: '100%',
        }}>
        <ActivityIndicator size="large" color="#575dfb" />
      </View>
    );
  }
  const likeHandler = () => {
    setLike(like ? false : true);
  };
  return (
    <View>
      <View
        style={{
          position: 'absolute',
          top: 0,
          zIndex: 1000,
          backgroundColor: 'white',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          width: '100%',
          height: 50,
          alignItems: 'center',
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="chevron-left" size={36} color="black" />
        </TouchableOpacity>
        <Image
          source={{
            uri:
              global.storage.getString('serverDomain') +
              'files/download?name=' +
              avatar,
          }}
          style={{
            borderColor: '#ccc',
            borderWidth: 1,
            width: 36,
            height: 36,
            borderRadius: 20,
            marginLeft: 8,
          }}
        />
        <Text style={{marginLeft: 8, color: 'black', fontSize: 16}}>
          {authorName}
        </Text>
        <View
          style={{
            position: 'absolute',
            right: 20,
            borderWidth: 1.3,
            borderColor: '#575dfb',
            borderRadius: 30,
            paddingHorizontal: 18,
            paddingVertical: 6,
          }}>
          <Text style={{color: '#575dfb'}}>follow</Text>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <ImageSlider images={data.content.photo} />
        <View
          style={{
            backgroundColor: 'white',
            alignItems: 'center',
            width: '100%',
          }}>
          <Text
            style={{
              color: 'black',
              paddingHorizontal: 16,
              paddingVertical: 16,
              textAlign: 'left',
              width: '100%',
            }}>
            {data.content.text}
          </Text>
          <CourseCard
            courseImg={require('../assets/courses/pexels-li-sun-2294361.jpg')}
            courseName={'HIIT燃脂-臀推初级'}
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
            Published : {data.updatedAt.slice(0, 16)}
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
          <CommentCard />
          <CommentCard />
        </View>
      </ScrollView>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          zIndex: 1000,
          backgroundColor: 'white',
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          height: 54,
          alignItems: 'center',
          paddingHorizontal: 8,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 20,
            height: 38,
            width: atComment ? '100%' : '58%',
            paddingHorizontal: 8,
          }}>
          <MaterialCommunityIcons name="pencil-plus-outline" size={25} />
          <TextInput
            placeholder="Say Something..."
            fontSize={15}
            onChangeText={text => setComment(text)}
            value={comment}
            style={{width: '88%', marginBottom: -2}}
            onFocus={() => {
              setAtComment(true);
            }}
            onBlur={() => {
              setAtComment(false);
            }}
          />
        </View>
        {!atComment && (
          <View
            style={{
              flexDirection: 'row',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 14,
                marginRight: 4,
                height: 24,
              }}>
              {data.like}
            </Text>
            <TouchableOpacity onPress={() => clickLike()}>
              {like ? (
                <MaterialCommunityIcons name="heart" size={24} color="red" />
              ) : (
                <MaterialCommunityIcons name="heart-outline" size={24} />
              )}
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 14,
                marginLeft: 10,
                marginRight: 4,
                height: 24,
              }}>
              comment
            </Text>
            <MaterialCommunityIcons
              style={{marginRight: 8}}
              name="comment-processing-outline"
              size={24}
            />
          </View>
        )}
      </View>
    </View>
  );
}

const ImageSlider = ({images}) => {
  var imagesList = [];
  for (let i = 0; i < images.length; i++) {
    var photo =
      global.storage.getString('serverDomain') +
      'files/download?name=' +
      images[i];
    imagesList.push(photo);
  }
  return (
    <Swiper style={styles.wrapper} showsButtons={false} showsPagination={false}>
      {imagesList.map((image, index) => (
        <View key={index} style={styles.slide}>
          <Image source={{uri: image}} style={styles.image} />
        </View>
      ))}
    </Swiper>
  );
};

const CommentCard = () => {
  return (
    <View style={{flexDirection: 'row', width: screenWidth, height: 80}}>
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
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 54,
  },
  image: {
    width: screenWidth,
    height: ScreenHeight * 0.48,
  },
  wrapper: {
    height: ScreenHeight * 0.48,
    marginTop: 50,
  },
});

export default CommunityDetail;
