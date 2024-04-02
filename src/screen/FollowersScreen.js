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
  Image,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import UsersService from '../services/users.service';
import React, {useEffect, useState} from 'react';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

function FollowersScreen({navigation}) {
  const [followedList, setFollowedList] = useState([]);
  useEffect(() => {
    const fetchData = () => {
      console.log('uid', global.storage.getNumber('uid'));
      UsersService.getFollowedList({
        uid: global.storage.getNumber('uid'),
      }).then(response => {
        setFollowedList(response.data);
      });
    };
    fetchData();
  }
  , []);
  return (
    <View style={{backgroundColor:'white'}}>
      <View style={styles.top}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            height: 40,
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons
              name="chevron-left"
              size={40}
              color="rgba(30, 30, 30, 1)"
            />
          </TouchableOpacity>
          <Text
            style={{fontSize: 20, fontWeight: 600, color: 'rgba(30,30,30,1)'}}>
            {/* Followers */}
            粉丝
          </Text>
        </View>
      </View>
      <ScrollView
        contentContainerStyle={{
          flexDirection: 'column',
          justifyContent: 'flex-start',
        }}
        style={{height:'100%',backgroundColor:'white'}}
        >
          <UserList renderData={followedList} />
      </ScrollView>
    </View>
  );
}

const UserList = (renderData) => {
  const data = renderData.renderData;
  if (data.length === 0) {
    return (
      <View style={{height:"100%",marginTop:40,flex: 1,backgroundColor:'white', justifyContent: 'center', alignItems: 'center'}}>
        {/* <Text>No user was found</Text> */}
        <Text>您还没有粉丝</Text>
        <Image
          source={require('../assets/backgrounds/empty.png')}
          alt="empty"
          style={{width: screenWidth - 80, height: screenWidth - 80}}
        />
      </View>
    );
  }
  function showToast(Text) {
    ToastAndroid.show(Text, ToastAndroid.SHORT);
  }
  const FollowUser = (userId, followed) => {
    const myId = global.storage.getNumber('uid');
    if (myId===-1){
      // showToast('Please login first!');
      showToast('请先登录！');
      return;
    }
    if (userId === myId) {
      // showToast('You cannot follow yourself!');
      showToast('您不能关注自己！');
      return;
    }
    const url = followed
      ? global.storage.getString('serverDomain') + 'users/follow'
      : global.storage.getString('serverDomain') + 'users/unfollow';
    // console.log(followed, url, userId);
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uid: myId,
        followId: userId,
      }),
    };
    fetch(url, requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log(data);
      });
  };
  console.log("renderData:",data);
  return (
    <ScrollView
      contentContainerStyle={{marginTop: 10}}
      style={{flex: 1, width: '100%'}}>
      {data.map((item, index) => {
        const [follow, setFollow] = useState(false);
        const myid = 1;
        if (item.photo === undefined || item.photo === null) {
          return;
        }
        const img =
          global.storage.getString('serverDomain') +
          'files/download?name=' +
          item.photo;
        return (
          <View
            style={{
              width: '100%',
              height: 54,
              paddingHorizontal: 16,
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 8,
              marginTop: 6,
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flexDirection: 'row',
                flex: 1,
                height: '100%',
                alignItems: 'center',
              }}>
              <Image
                source={{uri: img}}
                style={{
                  width: 54,
                  height: 54,
                  backgroundColor: 'gray',
                  marginLeft: 0,
                  borderRadius: 10,
                }}
                alt="pose"></Image>
              <Text style={styles.list_head}>{item.userName}</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                FollowUser(item.uid, !follow);
                setFollow(!follow);
              }}>
              <View
                style={{
                  borderRadius: 20,
                  borderWidth: 2,
                  borderColor: 'rgba(80,150,240,0.8)',
                  paddingHorizontal: 16,
                  paddingVertical: 4,
                  backgroundColor:
                    follow && myid ? 'rgba(80,150,240,0.8)' : 'white',
                }}>
                <Text
                  style={{
                    color: follow && myid ? 'white' : 'rgba(80,150,240,0.8)',
                  }}>
                  {/* {follow && myid ? 'followed' : 'follow'} */}
                  {follow && myid ? '已关注' : '关注'}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        );
      })}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  top: {
    height: 50,
    width: '100%',
    backgroundColor: 'rgba(73, 105, 255, 0)',
    justifyContent: 'flex-start',
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
});

export default FollowersScreen;
