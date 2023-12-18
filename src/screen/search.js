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
import {useRoute} from '@react-navigation/native';
import CourseCard from './courseCard';
import MasonryList from '@react-native-seoul/masonry-list';

const numColumns = 2;
const screenWidth = Dimensions.get('window').width;

const WaterfallList = ({renderData}) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(renderData);
  }, [renderData]);
  const navigation = useNavigation();
  // const HeaderComponent = () => <View style={styles.headerComp}></View>;

  const CardList = ({item}) => {
    const photo =
      global.storage.getString('serverDomain') +
      'files/download?name=' +
      item.photo;
    return (
      <View style={styles.cardList}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('CommunityDetailScreen', {
              momentId: item.id,
            });
          }}>
          <View style={styles.cardItem}>
            <Box style={{backgroundColor: 'rgba(120,180,240,0.8)'}}>
              <AspectRatio w="100%" ratio={3 / 3.2}>
                <Image
                  source={{
                    uri: photo,
                  }}
                  alt="image"
                />
              </AspectRatio>
            </Box>
            {/* 卡片文本 */}
            <View style={{paddingTop: 4, paddingHorizontal: 4}}>
              <Text
                numberOfLines={2}
                ellipsizeMode="tail"
                style={{
                  color: 'black',
                  alignSelf: 'flex-start',
                  fontSize: 17,
                  fontWeight: 'bold',
                  overflow: 'hidden',
                }}>
                {item.content.title}
              </Text>
              <Text
                numberOfLines={3}
                ellipsizeMode="tail"
                style={{
                  marginTop: 4,
                  fontSize: 12,
                  lineHeight: 14,
                  overflow: 'hidden',
                  marginBottom: 28,
                }}>
                {item.content.text}
              </Text>
            </View>
            <View style={{position: 'absolute', bottom: 6, left: 8}}>
              <Text style={{fontSize: 12}}>
                Published : {item.updatedAt.slice(0, 16)}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  if (!renderData || renderData === undefined) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  return (
    <MasonryList
      data={renderData}
      keyExtractor={item => item.id.toString()}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      style={{
        width: '100%',
        paddingHorizontal: 6,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 6,
      }}
      renderItem={({item}) => <CardList item={item} />}
    />
  );
};
const PoseList = ({renderData}) => {
  if (renderData.length === 0) {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
        <Text>No Pose Was Found!</Text>
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
        const img =
          global.storage.getString('serverDomain') +
          'files/download?name=' +
          item.photo;
        return (
          <View style={styles.list}>
            <Image
              source={{uri: img}}
              style={styles.list_pic}
              alt="pose"></Image>
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
                  if (index > 1 || item.length > 20) {
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
                      <Text style={{fontSize: 12, color: 'white'}}>{item}</Text>
                    </View>
                  );
                })}
              </View>
              <Text style={styles.list_details}>{item.like} likes</Text>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
};

const CourseList = ({renderData}) => {
  if (renderData === undefined) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Network Error!</Text>
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
        <Text>No Course Was Found!</Text>
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
            courseId={index}
            courseName={item.name}
            courseImg={{
              uri:
                global.storage.getString('serverDomain') +
                'files/download?name=' +
                item.photo,
            }}
            courseTime={item.duration}
            courseCalorie={item.calorie}
            courseLevel={'初级'}
            finishTime={item.practiced}
          />
        );
      })}
    </ScrollView>
  );
};

const UserList = ({renderData}) => {
  if (renderData === undefined) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Network Error!</Text>
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
        <Text>No User Was Found!</Text>
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
    if (myId === -1) {
      showToast('Please login first!');
      return;
    }
    if (userId === myId) {
      showToast('You cannot follow yourself!');
      return;
    }
    const url = followed
      ? global.storage.getString('serverDomain') + 'users/follow'
      : global.storage.getString('serverDomain') + 'users/unfollow';
    console.log(followed, url, userId);
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

  return (
    <ScrollView
      contentContainerStyle={{marginTop: 10}}
      style={{flex: 1, width: '100%'}}>
      {renderData.map((item, index) => {
        const [follow, setFollow] = useState(item.isFollowed);
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
                  {follow && myid ? 'followed' : 'follow'}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        );
      })}
    </ScrollView>
  );
};

function ResolveSearch({tabIndex, renderData}) {
  var data;
  if (!renderData || renderData === undefined) {
    return;
  }
  if (tabIndex === 0) {
    data = renderData.moments;
    return <WaterfallList renderData={data} />;
  } else if (tabIndex === 1) {
    data = renderData.courses;
    return <CourseList renderData={data} />;
  } else if (tabIndex === 2) {
    data = renderData.poses;
    return <PoseList renderData={data} />;
  } else if (tabIndex === 3) {
    data = renderData.users;
    return <UserList renderData={data} />;
  }
}

const SearchScreen = ({navigation}) => {
  const [index, setIndex] = React.useState(0);
  const [data, setData] = useState([]);
  const route = useRoute();
  const uid = global.storage.getNumber('uid');
  const {searchContent} = route.params;

  useEffect(() => {
    const fetchData = async () => {
      const url =
        global.storage.getString('serverDomain') + 'users/globalSearch';
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // uid: 1,
          uid: uid,
          keyword: searchContent,
        }),
      };
      try {
        const response = await fetch(url, requestOptions);
        const allData = await response.json();
        setData(allData);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 10,
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons
              name="chevron-left"
              style={{marginLeft: -10, marginRight: 4}}
              size={40}
              color="#4969ff"
            />
          </TouchableOpacity>
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
              width: screenWidth - 60,
            }}
            inputContainerStyle={{
              backgroundColor: 'rgba(220,220,220,0.4)',
              borderRadius: 20,
              height: 40,
            }}
            // onChangeText={updateSearch}
            // value={search}
          />
        </View>
        <View style={styles.nav}>
          <Tab
            value={index}
            onChange={e => setIndex(e)}
            indicatorStyle={{
              backgroundColor: '#4969ff',
              borderRadius: 1,
              height: 2,
              width: '25%',
            }}
            variant="default"
            style={styles.tabContent}>
            <Tab.Item
              title="Square"
              titleStyle={{fontSize: 14, fontWeight: 'bold', color: 'black'}}
              buttonStyle={styles.selectButton}
            />
            <Tab.Item
              title="Course"
              titleStyle={{fontSize: 14, fontWeight: 'bold', color: 'black'}}
              buttonStyle={styles.selectButton}
            />
            <Tab.Item
              title="Pose"
              titleStyle={{fontSize: 14, fontWeight: 'bold', color: 'black'}}
              buttonStyle={styles.selectButton}
            />
            <Tab.Item
              title="Users"
              titleStyle={{fontSize: 16, fontWeight: 'bold', color: 'black'}}
              buttonStyle={styles.selectButton}
            />
          </Tab>
        </View>
      </View>

      <TabView value={index} onChange={setIndex} animationType="spring">
        <TabView.Item
          style={{
            backgroundColor: '#fff',
            width: '100%',
            alignItems: 'center',
          }}>
          <ResolveSearch tabIndex={index} renderData={data} />
        </TabView.Item>
        <TabView.Item
          style={{
            backgroundColor: '#fff',
            width: '100%',
            alignItems: 'center',
          }}>
          <ResolveSearch tabIndex={index} renderData={data} />
        </TabView.Item>
        <TabView.Item
          style={{
            backgroundColor: '#fff',
            width: '100%',
            alignItems: 'center',
          }}>
          <ResolveSearch tabIndex={index} renderData={data} />
        </TabView.Item>
        <TabView.Item
          style={{
            backgroundColor: '#fff',
            width: '100%',
            alignItems: 'center',
          }}>
          <ResolveSearch tabIndex={index} renderData={data} />
        </TabView.Item>
      </TabView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  tabContent: {
    width: '100%',
    height: 46,
  },
  nav: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -8,
  },
  selectButton: {
    display: 'flex',
    backgroundColor: 'white',
    height: 54,
    marginTop: -2,
  },
  flatListContent: {
    paddingTop: 34,
  },
  cardItem: {
    borderRadius: 10,
    backgroundColor: 'rgba(248,248,248,0.9)',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: screenWidth / numColumns - 16,
    borderColor: 'rgba(200,200,200,1)',
    borderWidth: 0.6,
    overflow: 'hidden',
  },
  cardList: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
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
});

export default SearchScreen;
