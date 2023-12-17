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
} from 'react-native';
import {
  Input,
  Box,
  AspectRatio,
  Image,
  Center,
  Stack,
  Heading,
  HStack,
  Toast,
} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MasonryList from '@react-native-seoul/masonry-list';
import {Tab, TabView, SearchBar} from '@rneui/themed';
import { MMKV } from '../../App';
import {useNavigation} from '@react-navigation/native';

const numColumns = 2;
const screenWidth = Dimensions.get('window').width;

export const WaterfallList = ({tabIndex}) => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const url =
        tabIndex === 0
          ? 'http://bodybuddy.fater.top/api/moments/findAll'
          : 'http://bodybuddy.fater.top/api/moments/getFollowMoment';
      var requestOptions;
      if (tabIndex === 1) {
        const id = MMKV.getString('uid');
        requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({uid: id}),
        };
      } else if (tabIndex === 0) {
        requestOptions = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        };
      }
      try {
        const response = await fetch(url, requestOptions);
        const allData = await response.json();
        setData(allData);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, [tabIndex]);

  const HeaderComponent = () => <View style={styles.headerComp}></View>;

  const CardList = ({item,index,columnIndex}) => {
    // 奇数id margin-left: 8, margin-right: 4，偶数id margin-left: 4, margin-right: 8
    const marginLeft = columnIndex % 2 === 0 ? -20 : 0;
    const marginRight = columnIndex % 2 === 0 ? 30 : 14;
    const photo = 'http://bodybuddy.fater.top/api/files/download?name=' + item.photo;
    return (
      <View
        style={[styles.cardList,{marginLeft,marginRight}]}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('CommunityDetailScreen',{
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
            <View style={{paddingTop: 4, paddingHorizontal: 10}}>
              <Text
              numberOfLines={2}
              ellipsizeMode="tail"
                style={{
                  color: 'black',
                  alignSelf: 'flex-start',
                  fontSize: 18,
                  fontWeight: 'bold',
                  overflow: 'hidden',
                }}>
                {item.content.title}
              </Text>
              <Text
                numberOfLines={3}
                ellipsizeMode="tail"
                style={{
                  marginTop: 6,
                  fontSize: 14,
                  lineHeight: 14,
                  overflow: 'hidden',
                  marginBottom:22,
                  color:"#333333"
                }}>
                {item.content.text}
              </Text>
            </View>
            <View style={{position: 'absolute', bottom: 6, left: 10}}>
              <Text style={{fontSize: 10, color: "#999999"}}>
                Published : {item.updatedAt.slice(0, 16)}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
<MasonryList
  data={data}
  keyExtractor={item => item.id.toString()}
  numColumns={2}
  showsVerticalScrollIndicator={false}
  style={{width:"100%",paddingHorizontal:6,justifyContent:"center",alignItems:"center",marginTop:6}}
  renderItem={({item}) => <CardList item={item}/>}
/>
  );
};

const CommunityScreen = ({navigation}) => {
  const [index, setIndex] = React.useState(0);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.view}>
          <SearchBar
            inputStyle={styles.input}
            placeholder="Search Here..."
            round={true}
            lightTheme
            showCancel
            platform="android"
            containerStyle={styles.containerStyle}
            inputContainerStyle={styles.inputContainerStyle}
            // onChangeText={updateSearch}
            // value={search}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate('PublishScreen')}>
            <MaterialCommunityIcons
              name="plus-circle"
              style={{marginLeft: 4}}
              size={40}
              color="blue"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.nav}>
          <Tab
            value={index}
            onChange={e => setIndex(e)}
            indicatorStyle={{
              backgroundColor: 'blue',
              borderRadius: 1,
              height: 2,
              width: '50%',
            }}
            variant="default"
            style={styles.tabContent}>
            <Tab.Item
              title="广场"
              titleStyle={{fontSize: 16, fontWeight: 'bold', color: 'black'}}
              buttonStyle={styles.selectButton}
            />
            <Tab.Item
              title="关注"
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
          <WaterfallList tabIndex={index} />
        </TabView.Item>
        <TabView.Item
          style={{
            backgroundColor: '#fff',
            width: '100%',
            alignItems: 'center',
          }}>
          <WaterfallList tabIndex={index} />
        </TabView.Item>
      </TabView>
    </>
  );
};

const styles = StyleSheet.create({
  cardList:{
    width:"100%",
    justifyContent:"center",
    alignItems:"center",
    marginBottom:8,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  tabContent: {
    width: '50%',
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
    borderRadius: 6,
    backgroundColor: '#f7f7f7',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: screenWidth / numColumns - 16,
    overflow: 'hidden',
  },
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  input: {
    fontSize: 16,
  },
  containerStyle: {
    backgroundColor: 'rgba(1,1,1,0)',
    width: screenWidth - 60,
  },
  inputContainerStyle: {
    backgroundColor: 'rgba(220,220,220,0.4)',
    borderRadius: 20,
    height: 40,
  },
});

export default CommunityScreen;
