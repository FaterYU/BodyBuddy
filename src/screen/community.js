import React, { useEffect, useState } from 'react';
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
import {Tab, TabView, SearchBar} from '@rneui/themed';
import {useNavigation} from '@react-navigation/native';

const numColumns = 2;
const screenWidth = Dimensions.get('window').width;

export const WaterfallList = ({ tabIndex }) => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);

  useEffect(() => {
    // 根据标签索引选择不同的请求方法
    const fetchData = async () => {
      const url = tabIndex === 0
        ? 'http://bodybuddy.fater.top/api/moments/findAll'
        : 'http://bodybuddy.fater.top/api/moments/getFollowMoment';

      const requestOptions = {
        method: tabIndex === 0 ? 'GET' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // body: JSON.stringify({ "uid": 'value' }),
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
  }, [tabIndex]);

  const HeaderComponent = () => (
    <View style={styles.headerComp}>
    </View>
  );

  const CardList = ({ item }) => {
    const marginTop = item.id % numColumns === 1 ? -30 : 8;
    const height = 240

    return (
      <Box alignItems="center" style={[styles.cardList, { height, marginTop }]}>
        <TouchableOpacity onPress={() => navigation.navigate('CommunityDetailScreen')}>
          <Box style={styles.cardItem} maxW="80" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1">
            <Box style={{ backgroundColor: 'rgba(120,180,240,0.8)' }}>
              <AspectRatio w="100%" ratio={3/2}>
                {/* <Image source={{
                uri: ""
              }} alt="image" /> */}
              </AspectRatio>
            </Box>
            <View style={{ paddingTop: 6, paddingLeft: 8 }}>
              <Text style={{ color: 'black', alignSelf: 'flex-start', fontSize: 18, fontWeight: 'bold' }}>
                {item.content.title}
              </Text>
              <Text stylie={{ marginTop: 4 }}>
                {item.content.text}
              </Text>
            </View>
            <View style={{ position: 'absolute', bottom: 6, left: 8 }}>
              <Text style={{fontSize:12}}>发布时间：12:00</Text>
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

const CommunityScreen = ({ navigation }) => {
  const [index, setIndex] = React.useState(0);

  return (
    <>
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 10 }}>
          <SearchBar
            inputStyle={{
              fontSize: 16
            }}
            placeholder="Search Here..."
            round={true}
            lightTheme
            showCancel
            platform='android'
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
          <TouchableOpacity onPress={() => navigation.navigate('PublishScreen')}>
            <MaterialCommunityIcons name="plus-circle" style={{ marginLeft: 4 }} size={40} color="blue" />
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
              titleStyle={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}
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
        <TabView.Item style={{ backgroundColor: '#fff', width: '100%', alignItems: 'center' }}>
          <WaterfallList tabIndex={index} />
        </TabView.Item>
        <TabView.Item style={{ backgroundColor: '#fff', width: '100%', alignItems: 'center' }}>
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
    justifyContent: "center",
    alignItems: "center",
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
});

export default CommunityScreen;
