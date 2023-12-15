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
} from 'react-native';
import {Avatar} from '@rneui/themed';
import { useEffect, useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {WaterfallList} from './community';
import {useNavigation} from '@react-navigation/native';
import { MMKV } from '../../App';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

function PersonScreen() {
  const navigation = useNavigation();
  const [userName, setUserName] = useState('');
  // get user name
  useEffect(() => {
    const fetchData = async () => {
      const url = 'http://bodybuddy.fater.top/api/users/getName';
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({uid: MMKV.getInt('userId')}),
      };
      try {
        const response = await fetch(url, requestOptions);
        const json = await response.json();
        setUserName(json.userName);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }
  ,[]);
  return (
    <FlatList
      style={styles.container}
      ListHeaderComponent={() => (
        <View>
            <TouchableOpacity style={{postion:'absolute', left:screenWidth-34, top:12, zIndex:1000}} onPress={()=>navigation.navigate("PersonDetails")}>
              <MaterialCommunityIcons name="lead-pencil" size={26}  color={'#cccccc'}/>
            </TouchableOpacity>
          <ImageBackground style={styles.userBackground} source={require("../assets/backgrounds/rain_glass.jpg")}>
            <View style={styles.userInfo}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('LoginScreen');
                }}>
                <Avatar
                  source={{
                    uri: 'https://cdn.pixabay.com/photo/2016/11/21/12/42/beard-1845166_1280.jpg',
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
                  {userName?userName:'Username'}
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
          </ImageBackground>
          <View style={styles.fansList}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('FollowingScreen');
              }}>
              <View style={styles.fansButton}>
                <Text style={{color: '#333333', fontSize: 20}}>4</Text>
                <Text style={{fontSize: 15}}>Following</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('FollowersScreen');
              }}>
              <View style={styles.fansButton}>
                <Text style={{color: '#333333', fontSize: 20}}>2</Text>
                <Text style={{fontSize: 15}}>Followers</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.fansButton}>
              <Text style={{color: '#333333', fontSize: 20}}>6</Text>
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
                  overflow:'hidden'
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: '#4969ff',
                    fontSize: 20,
                    lineHeight: 30,
                    paddingLeft:8,
                    marginTop: -5,
                  }}>
                  Moments Data
                </Text>
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={26}
                  color="#4969ff"
                />
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
                    paddingLeft:8,
                    marginTop: -5,
                  }}>
                  Health Data
                </Text>
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={26}
                  color="#4969ff"
                />
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
    backgroundColor: 'rgba(248,248,248,1)',
  },
  userBackground: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop:-26,
    height: screenHeight * 0.26,
    width: '100%',
  },
  userInfo: {
    marginLeft: 20,
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
    paddingHorizontal:10,
    flexDirection: 'row',
  },
  dataCard: {
    backgroundColor: 'white',
    elevation: 1,
    width: '44%',
    borderRadius: 6,
    height: '80%',
  },
  waterfall: {
    alignItems: 'center',
    marginTop: 16,
  },
});

export default PersonScreen;
