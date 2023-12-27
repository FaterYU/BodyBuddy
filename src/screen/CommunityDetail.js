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
  ToastAndroid,
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
import CoursesService from '../services/courses.service';
import UsersService from '../services/users.service';

function CommunityDetail({navigation, route}) {
  const [data, setData] = useState([]);
  const [avatar, setAvatar] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [comment, setComment] = useState('');
  const [like, setLike] = useState(false);
  const [follow, setFollow] = useState(false);
  const [likeNum, setLikeNum] = useState(0);
  const [atComment, setAtComment] = useState(false);
  const [mention, setMention] = useState(null);
  const [refresh, setRefresh] = useState(false);
  function showToast(Text) {
    ToastAndroid.show(Text, ToastAndroid.SHORT);
  }
  const id = route.params.momentId;
  const userId = global.storage.getNumber('uid');
  useEffect(() => {
    const fetchData = async () => {
      if (data.content?.mention) {
        await CoursesService.getCourseById({
          id: data.content?.mention ? data.content.mention[0] : 0,
        }).then(response => {
          setMention(response.data);
        });
      }
    };
    fetchData();
  }, [data]);

  const clickLike = () => {
    if (!global.storage.getBoolean('isLogin')) {
      showToast('Please Login First!');
      return;
    }
    const url = like
      ? global.storage.getString('serverDomain') + 'users/unlikeMoment'
      : global.storage.getString('serverDomain') + 'users/likeMoment';
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        uid: global.storage.getNumber('uid'),
        momentId: id,
      }),
    };
    try {
      fetch(url, requestOptions)
        .then(response => response.json())
        .then(data => {
          // console.log(data);
        })
        .catch(error => console.log(error));
    } catch (error) {
      console.log(error);
    }
    setLike(like ? false : true);
    setLikeNum(like ? likeNum - 1 : likeNum + 1);
  };

  const submitComment = () => {
    const url = 'http://bodybuddy.fater.top/api/moments/addComment';
    if (!global.storage.getBoolean('isLogin')) {
      ToastAndroid.show('Please login first', ToastAndroid.SHORT);
      return;
    }
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        id: id,
        comment: {
          content: comment,
          author: userId,
        },
      }),
    };
    try {
      const response = fetch(url, requestOptions);
      setRefresh(true);
    } catch (error) {
      console.log(error);
    }
    setComment('');
  };
  useEffect(() => {
    setRefresh(false);
    const fetchData = async () => {
      const url = global.storage.getString('serverDomain') + 'moments/findOne';
      var requestOptions;
      if (global.storage.getBoolean('isLogin')) {
        requestOptions = {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: id,
            uid: global.storage.getNumber('uid'),
          }),
        };
      } else {
        requestOptions = {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: id,
          }),
        };
      }

      try {
        const response = await fetch(url, requestOptions);
        const json = await response.json();

        fetchAuthor(json.author, json);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchAuthor = async (authorId, data) => {
      // console.log('call fetchAuthor');
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
        setLikeNum(data.like);
        // console.log('like:', data.like);
        if (global.storage.getBoolean('isLogin')) {
          setLike(data.isLike);
          setFollow(data.isFollow);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id, atComment, refresh]);
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
  const changeFollow = () => {

    if (!global.storage.getBoolean('isLogin')) {
      showToast('Please Login First!');
      return;
    }
    if(global.storage.getNumber('uid')===data.author){
      showToast('You cannot follow yourself!');
      return;
    }
    const url = follow
      ? global.storage.getString('serverDomain') + 'users/unfollow'
      : global.storage.getString('serverDomain') + 'users/follow';
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        uid: global.storage.getNumber('uid'),
        followId: data.author,
      }),
    };
    try {
      fetch(url, requestOptions)
        .then(response => response.json())
        .then(data => {
          // console.log(data);
        })
        .catch(error => console.log(error));
    } catch (error) {
      console.log(error);
    }
    setFollow(follow ? false : true);
  };
  // console.log(mention)
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
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

        <TouchableOpacity
          style={{position: 'absolute', right: 20}}
          onPress={() => {
            changeFollow();
          }}>
          <View
            style={{
              borderRadius: 20,
              borderWidth: 1.3,
              borderColor: '#575dfb',
              paddingHorizontal: 18,
              paddingVertical: 6,
              backgroundColor: follow ? '#575dfb' : 'white',
            }}>
            <Text
              style={{
                color: follow ? 'white' : '#575dfb',
              }}>
              {follow ? 'followed' : 'follow'}
            </Text>
          </View>
        </TouchableOpacity>
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
          {
            mention && (
            <CourseCard
            courseId={mention?.id}
            courseImg={{
              uri:
                global.storage.getString('serverDomain') +
                'files/download?name=' +
                mention?.photo,
            }}
            courseName={mention?.name}
            courseTime={mention?.duration / 60}
            courseCalorie={mention?.infomation.calorie}
            courseLevel={mention?.infomation.level}
            finishTime={2}
          />
            )
          }
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
          {data?.comment &&
            data.comment.commentList.map((commentDetail, index) => (
              <CommentCard comment={commentDetail} key={index} />
            ))}
          <Text style={{fontSize: 14, marginTop: 20}}>-- THE END --</Text>
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
            onSubmitEditing={() => {
              submitComment();
            }}
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
              {likeNum}
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
              {data.comment?.commentList.length}
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

const CommentCard = commentItem => {
  const [commentUser, setCommentUser] = useState('');
  useEffect(() => {
    if (commentItem.comment === null) {
      return;
    }
    UsersService.findOne({uid: commentItem.comment.author}).then(response => {
      setCommentUser(response.data);
    });
  }, [commentItem]);
  if (commentItem.comment === null) {
    return null;
  }
  return (
    <View style={{flexDirection: 'row', width: screenWidth,marginVertical:4}}>
      <View
        style={{
          height: 40,
          width: 40,
          borderRadius: 20,
          backgroundColor: 'gray',
          margin: 10,
        }}>
        <Image
          source={{
            uri:
              global.storage.getString('serverDomain') +
              'files/download?name=' +
              commentUser.photo,
          }}
          style={{
            height: 40,
            width: 40,
            borderRadius: 20,
          }}
        />
      </View>
      <View style={{flexDirection: 'column', width: '76%'}}>
        <Text style={{marginTop: 10}}>{commentUser.userName}</Text>
        <Text style={{color: 'black'}}>{commentItem?.comment.content}</Text>
        {/* <Text style={{fontSize: 10}}>11月29日 22:31</Text> */}
        <View style={{width:'100%',height:0.4,backgroundColor:'rgba(180,180,180,0.4)',marginTop:10}}></View>
      </View>
      {/* <MaterialCommunityIcons
        name="heart-outline"
        size={15}
        style={{alignSelf: 'flex-start', marginTop: 16}}
      /> */}
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
