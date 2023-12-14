import React, {useEffect, useState} from 'react';
// import { Tab, Text, TabView } from '@rneui/themed';
// import { FlatList, View } from 'react-native';
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
import {Tab, TabView, SearchBar} from '@rneui/themed';
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
        requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({uid: 1}),
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

  const CardList = ({item}) => {
    const marginTop = item.id % numColumns === 1 ? -30 : 8;
    const height = 240;
    const photo =
      'http://bodybuddy.fater.top/api/files/download?name=' + item.photo;

    return (
      <Box alignItems="center" style={[styles.cardList, {height, marginTop}]}>
        <TouchableOpacity
          onPress={() => navigation.navigate('CommunityDetailScreen')}>
          <Box
            style={styles.cardItem}
            maxW="80"
            rounded="lg"
            overflow="hidden"
            borderColor="coolGray.200"
            borderWidth="1">
            <Box style={{backgroundColor: 'rgba(120,180,240,0.8)'}}>
              <AspectRatio w="100%" ratio={3 / 2}>
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
                style={{
                  marginTop: 4,
                  height: 36,
                  fontSize: 12,
                  lineHeight: 12,
                  overflow: 'hidden',
                }}>
                {item.content.text}
              </Text>
            </View>
            <View style={{position: 'absolute', bottom: 6, left: 8}}>
              <Text style={{fontSize: 12}}>
                Published : {item.updatedAt.slice(0, 16)}
              </Text>
            </View>
          </Box>
        </TouchableOpacity>
      </Box>
    );
  };

  return (
    <FlatList
      data={data}
      renderItem={CardList}
      keyExtractor={item => item.id.toString()}
      numColumns={numColumns}
      ListHeaderComponent={HeaderComponent}
      contentContainerStyle={styles.flatListContent}
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
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
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
    flex: 1,
    marginLeft: 4,
    marginRight: 4,
    borderRadius: 10,
    backgroundColor: 'rgba(248,248,248,0.9)',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: screenWidth / numColumns - 16,
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
