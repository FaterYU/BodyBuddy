import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  FlatList,
  ReactFragment,
  ImageBackground,
  TouchableOpacity,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Avatar} from '@rneui/themed';
import {useEffect, useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {WaterfallList} from './community';
import {useNavigation} from '@react-navigation/native';
import UsersService from '../services/users.service';
import MomentsService from '../services/moments.service';
import FitsService from '../services/fits.service';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

function PersonScreen({route}) {
  const navigation = useNavigation();
  const [refresh, setRefresh] = useState(false);
  const [userName, setUserName] = useState('');
  const [photo, setPhoto] = useState('avatar.png');
  const [followList, setFollowList] = useState([]);
  const [followedList, setFollowedList] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [momentList, setMomentList] = useState([]);
  const [comeDate, setComeDate] = useState('');
  const [totalData, setTotalData] = useState([
    {
      totalCalorie: null,
      totalDay: null,
      totalDuration: null,
    },
  ]);

  useEffect(() => {
    FitsService.getLongTimeData({ id: global.storage.getNumber('uid') })
      .then(res => {
        setTotalData(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [refresh]);

  useEffect(() => {
    const Refresh = () => setRefresh(route.params?.refresh);
    Refresh();
  }, [route.params]);
  useEffect(() => {
    setRefresh(false);
    if (!global.storage.getBoolean('isLogin')) {
      return;
    }
  }, [refresh]);
  useEffect(() => {
    const fetchData = () => {
      setRefresh(false);
      if (!global.storage.getBoolean('isLogin')) {
        setPhoto('avatar.png');
        setUserName('Username');
        setFollowList([]);
        setFollowedList([]);
        setMomentList([]);
        setComeDate('**');
        setUserInfo({});
        return;
      }
      UsersService.findOne({uid: global.storage.getNumber('uid')}).then(
        response => {
          setUserName(response.data.userName);
          setPhoto(response.data.photo);
        },
      );
      UsersService.getFollowList({uid: global.storage.getNumber('uid')}).then(
        response => {
          setFollowList(response.data);
        },
      );
      UsersService.getFollowedList({uid: global.storage.getNumber('uid')}).then(
        response => {
          setFollowedList(response.data);
        },
      );
      MomentsService.getMomentByAuthor({
        author: global.storage.getNumber('uid'),
      }).then(response => {
        setMomentList(response.data);
      });
      UsersService.findOne({uid: global.storage.getNumber('uid')}).then(
        response => {
          var nowDate = new Date();
          var nowYear = nowDate.getFullYear();
          var nowMonth = nowDate.getMonth() + 1;
          var nowDay = nowDate.getDate();

          var comeDate = new Date(response.data.createdAt);
          var comeYear = comeDate.getFullYear();
          var comeMonth = comeDate.getMonth() + 1;
          var comeDay = comeDate.getDate();

          var days = (nowDate - comeDate) / (24 * 3600 * 1000);
          console.log(days);
          if (days < 1) {
            setComeDate('1');
          } else if (days > 999) {
            setComeDate('999+');
          } else {
            setComeDate(Math.floor(days).toString());
          }
          setUserInfo(response.data);
        },
      );
    };
    fetchData();
  }, [refresh]);
  return (
    <FlatList
      style={styles.container}
      ListHeaderComponent={() => (
        <View>
          {global.storage.getBoolean('isLogin') && (
            <TouchableOpacity
              style={{
                postion: 'absolute',
                left: screenWidth - 34,
                top: 15,
                zIndex: 1000,
              }}
              onPress={() =>
                navigation.navigate('PersonDetails', {refresh: refresh})
              }>
              <MaterialCommunityIcons
                name="lead-pencil"
                size={26}
                color={'#ffffff'}
              />
            </TouchableOpacity>
          )}
          {/* {!global.storage.getBoolean('isLogin') && (
            <TouchableOpacity
              style={{
                postion: 'absolute',
                left: screenWidth - 48,
                top: 14,
                zIndex: 1000,
              }}
              onPress={() =>
                navigation.navigate('LoginScreen', {refresh: refresh})
              }>
              <Text
                style={{
                  color: 'white',
                  fontWeight: '900',
                  textDecorationStyle: 'solid',
                  textDecorationLine: 'underline',
                }}>
                Login
              </Text>
            </TouchableOpacity>
          )} */}
          <ImageBackground
            style={styles.userBackground}
            source={require('../assets/backgrounds/rain_glass.jpg')}>
            <LinearGradient
              colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.7)']}
              style={{
                height: screenHeight * 0.26,
                width: '100%',
                flexDirection: 'column',
                justifyContent: 'flex-end',
              }}>
              <View style={styles.userInfo}>
                <TouchableOpacity
                  onPress={() => {
                    global.storage.getBoolean('isLogin')
                      // ? Alert.alert(
                      //     'Log Out',
                      //     'Are you sure to log out?',
                      ? Alert.alert(
                        '退出',
                        '确定退出登录？',
                          [
                            {
                              // text: 'Cancel',
                              text:'取消',
                              onPress: () => console.log('Cancel Pressed'),
                              style: 'cancel',
                            },
                            {
                              // text: 'OK',
                              text: '确定',
                              onPress: () => {
                                global.storage.set('isLogin', false);
                                global.storage.set('uid', -1);
                                navigation.navigate('Person', {
                                  refresh: refresh + 1,
                                });
                                navigation.navigate('Calendar', {
                                  refresh: true,
                                });
                                navigation.navigate('Courses', {
                                  refresh: true,
                                });
                              },
                            },
                          ],
                          {cancelable: false},
                        )
                      : navigation.navigate('LoginScreen', {
                          refresh: refresh,
                        });
                  }}>
                  <Avatar
                    source={{
                      uri:
                        global.storage.getString('serverDomain') +
                        'files/download?name=' +
                        photo,
                    }}
                    size={76}
                    containerStyle={styles.avatar}
                    rounded
                  />
                </TouchableOpacity>
                <View style={{flexDirection: 'column'}}>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 22,
                      fontWeight: 'bold',
                      marginTop: 6,
                      marginLeft: 8,
                    }}>
                    {/* {userName ? userName : 'Username'} */}
                    {userName ? userName : '登录/注册'}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      flexWrap: 'nowrap',
                      flex: 1,
                      width: '100%',
                    }}>
                    <View style={styles.fab}>
                      {/* <Text style={styles.fabText}>Community Master</Text> */}
                      <Text style={styles.fabText}>社区达人</Text>
                    </View>
                    <View style={styles.fab}>
                      {/* <Text style={styles.fabText}>Medal 1</Text> */}
                       <Text style={styles.fabText}>徽章 1</Text>
                    </View>
                  </View>
                </View>
              </View>
            </LinearGradient>
          </ImageBackground>
          <View style={styles.fansList}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('FollowingScreen');
              }}>
              <View style={styles.fansButton}>
                <Text style={{color: '#333333', fontSize: 20}}>
                  {followList.length}
                </Text>
                {/* <Text style={{fontSize: 15}}>Following</Text>*/}
                <Text style={{fontSize: 15}}>关注</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('FollowersScreen');
              }}>
              <View style={styles.fansButton}>
                <Text style={{color: '#333333', fontSize: 20}}>
                  {followedList.length}
                </Text>
                {/* <Text style={{fontSize: 15}}>Followers</Text> */}
                <Text style={{fontSize: 15}}>粉丝</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.fansButton}>
              <Text style={{color: '#333333', fontSize: 20}}>
                {momentList.length}
              </Text>
              {/* <Text style={{fontSize: 15}}>Moments</Text> */}
              <Text style={{fontSize: 15}}>动态</Text>
            </View>
          </View>

          <View style={styles.cardList}>
            <View style={styles.dataCard}>
              <View
                style={{
                  flexDirection: 'row',
                  alignContent: 'center',
                  justifyContent: 'space-between',
                  marginTop: 10,
                  overflow: 'hidden',
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: '#4969ff',
                    fontSize: 20,
                    lineHeight: 30,
                    paddingLeft: 8,
                  }}>
                  运动数据
                </Text>
              </View>
              <Text style={{marginTop: 10, marginLeft: 10, color: 'gray'}}>
                您已坚持运动
              </Text>
              <View style={{flexDirection: 'row', marginLeft: 10}}>
                <Text style={{marginTop: 6, fontSize: 38, color: 'black'}}>
                  {comeDate ? comeDate : '**'}
                  {totalData? totalData.totalDay : '**'}
                </Text>
                <Text style={{marginTop: 16, color: 'black', marginLeft: 6}}>
                  {/* {comeDate > 1 ? 'days' : 'day'} */}
                  天
                </Text>
              </View>
              {/* <Text style={{marginLeft: 10}}>
                164 thousand calories consumed this week
              </Text> */}
            </View>
            <View style={styles.dataCard}>
              <View
                style={{
                  flexDirection: 'row',
                  alignContent: 'center',
                  justifyContent: 'space-between',
                  marginTop: 10,
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: '#4969ff',
                    fontSize: 20,
                    lineHeight: 30,
                    paddingLeft: 8,
                  }}>
                  {/* Health Data */}
                  健康数据
                </Text>
              </View>
              <Text style={{marginTop: 10, marginLeft: 10, color: 'gray'}}>
                {/* Weight */}
                体重
              </Text>
              <View style={{flexDirection: 'row', marginLeft: 10}}>
                <Text style={{marginTop: 6, fontSize: 38, color: 'black'}}>
                  {userInfo.infomation === null ||
                  userInfo.infomation === undefined ||
                  userInfo.infomation?.weight === 0
                    ? '**'
                    : userInfo.infomation.weight}
                </Text>
                <Text style={{marginTop: 16, color: 'black', marginLeft: 6}}>
                  kg
                </Text>
              </View>
              {/* <Text style={{marginTop: 10, marginLeft: 10, color: 'gray'}}>
                Height
              </Text>
              <View style={{flexDirection: 'row', marginLeft: 10}}>
                <Text style={{marginTop: 6, fontSize: 38, color: 'black'}}>
                  {userInfo.infomation === undefined ||
                  userInfo.infomation.height === 0
                    ? '- -'
                    : userInfo.infomation.height}
                </Text>
                <Text style={{marginTop: 16, color: 'black', marginLeft: 6}}>
                  cm
                </Text>
              </View> */}
            </View>
          </View>
        </View>
      )}
      ListFooterComponent={() => (
        <View style={styles.waterfall}>
          <Text
            style={{
              color: 'black',
              fontSize: 18,
              fontWeight: 'bold',
              marginLeft: 20,
              marginBottom: 10,
              marginTop: -20,
              alignSelf: 'flex-start',
            }}>
            {/* Moments */}
            动态
          </Text>
          <WaterfallList tabIndex={0} />
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    // justifyContent:'flex-start',
    backgroundColor: '#ffffff',
  },
  userBackground: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -26,
    height: screenHeight * 0.26,
    width: '100%',
  },
  userInfo: {
    marginLeft: 20,
    marginBottom: 70,
    flexDirection: 'row',
  },
  avatar: {
    borderRadius: 50,
  },
  fab: {
    marginTop: 6,
    marginLeft: 8,
    height: 30,
    backgroundColor: 'black',
    borderRadius: 15,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fabText: {
    color: 'white',
  },
  fansList: {
    backgroundColor: 'white',
    marginTop: -40,
    height: 80,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 6,
    elevation: 6,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  fansButton: {
    alignItems: 'center',
  },
  cardList: {
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 10,
    flexDirection: 'row',
    marginVertical: 16,
  },
  dataCard: {
    backgroundColor: 'white',
    width: '44%',
    borderRadius: 6,
    height: '100%',
    elevation: 5,
    padding: 2,
    paddingBottom: 4,
  },
  waterfall: {
    alignItems: 'center',
    marginTop: 16,
  },
});

export default PersonScreen;
