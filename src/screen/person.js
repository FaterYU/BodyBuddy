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

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

function PersonScreen({route}) {
  const navigation = useNavigation();
  const [refresh, setRefresh] = useState(1);
  const [userName, setUserName] = useState('');
  const [photo, setPhoto] = useState('');
  const [followList, setFollowList] = useState([]);
  const [followedList, setFollowedList] = useState([]);
  const [momentList, setMomentList] = useState([]);
  useEffect(() => {
    const Refresh = () => setRefresh(route.params?.refresh ?? 0);
    Refresh();
  }, [route.params?.refresh]);

  useEffect(() => {
    const fetchData = () => {
      if (!global.storage.getBoolean('isLogin')) {
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
    };
    fetchData();
  }, [refresh]);
  return (
    <FlatList
      style={styles.container}
      ListHeaderComponent={() => (
        <View>
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
                      ? Alert.alert(
                          'Log Out',
                          'Are you sure to log out?',
                          [
                            {
                              text: 'Cancel',
                              onPress: () => console.log('Cancel Pressed'),
                              style: 'cancel',
                            },
                            {
                              text: 'OK',
                              onPress: () => {
                                global.storage.set('isLogin', false);
                                global.storage.set('uid', -1);
                                navigation.navigate('Person', {
                                  refresh: refresh + 1,
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
                    {userName ? userName : 'Username'}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      flexWrap: 'nowrap',
                      flex: 1,
                      width: '100%',
                    }}>
                    <View style={styles.fab}>
                      <Text style={styles.fabText}>Community Master</Text>
                    </View>
                    <View style={styles.fab}>
                      <Text style={styles.fabText}>Medal 1</Text>
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
                <Text style={{fontSize: 15}}>Following</Text>
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
                <Text style={{fontSize: 15}}>Followers</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.fansButton}>
              <Text style={{color: '#333333', fontSize: 20}}>
                {momentList.length}
              </Text>
              <Text style={{fontSize: 15}}>Moments</Text>
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
                  Moments Data
                </Text>
              </View>
              <Text style={{marginTop: 10, marginLeft: 10}}>Total</Text>
              <View style={{flexDirection: 'row', marginLeft: 10}}>
                <Text style={{marginTop: 14, fontSize: 36, color: 'black'}}>
                  336
                </Text>
                <Text style={{marginTop: 22, color: 'black', marginLeft: 6}}>
                  minutes
                </Text>
              </View>
              <Text style={{marginLeft: 10}}>
                164 thousand calories consumed this week
              </Text>
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
                  Health Data
                </Text>
              </View>
              <Text style={{marginTop: 10, marginLeft: 10}}>Weight</Text>
              <View style={{flexDirection: 'row', marginLeft: 10}}>
                <Text style={{marginTop: 14, fontSize: 36, color: 'black'}}>
                  52.3
                </Text>
                <Text style={{marginTop: 22, color: 'black', marginLeft: 6}}>
                  kg
                </Text>
              </View>
              <Text style={{marginLeft: 10}}>Last recorded 10 days ago</Text>
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
            Moments
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
    height: screenHeight * 0.28,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 10,
    flexDirection: 'row',
  },
  dataCard: {
    backgroundColor: 'white',
    width: '44%',
    borderRadius: 6,
    height: '80%',
    elevation: 5,
  },
  waterfall: {
    alignItems: 'center',
    marginTop: 16,
  },
});

export default PersonScreen;
