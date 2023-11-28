import { useState, useEffect, useRef  } from 'react'
import {Text, View, StyleSheet, ScrollView, FlatList, ActivityIndicator, Dimensions} from 'react-native';
import { Input, Box, AspectRatio, Image, Center, Stack, Heading, HStack, Toast} from "native-base";

import RNFS from 'react-native-fs';
const numColumns = 2;
const SCREENHEIGHT = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;


const CommunityScreen = () => {
  /*
  const [fileList, setFileList] = useState([]);
  useEffect(() => {
    RNFS.readDirAssets('courses').then((result) => {
      console.log('GOT RESULT', result);
      const files = result.map(file => file.name);
      setFileList(files);
    }).catch((err) => {
      console.log(err.message, err.code);
    });
      
    // const readFiles = async () => {
    //   try {
    //     const path = 'D:/developProject/BodyBuddy/src/assets/courses';
    //     console.log('path',path)
    //     const result = await RNFS.readDir(path);
    //     console.log('GOT RESULT', result);
    //     const files = result.map(file => file.name);
    //     setFileList(files);
    //   } catch (error) {
    //     console.error('Error reading files:', error);
    //   }
    // };
    // readFiles();
  }, []);
  */

  return (
      <View style={styles.container}>
        <Input style={styles.topInput} variant="rounded" placeholder="Search Here" />
        <WaterfallList />
      </View>
  );
};

const ScrollBase = ({ dataArray }) => {
  return (
    <ScrollView
      horizontal showsHorizontalScrollIndicator={false} style={styles.courseList} nestedScrollEnabled={true}
      >
        {dataArray.map((item) => (
          <View style={styles.courseItem}>
              <Text>{item.title}</Text>
          </View>
        ))}
    </ScrollView>
  );
};

const generateData = () => {
  const data = [];
  for (let i = 1; i <= 20; i++) {
    const item = {
      id: i,
      title: `Item ${i}`,
      height: Math.floor(Math.random() * 200) + 100, // 随机生成高度
    };
    data.push(item);
  }
  return data;
};

const data = generateData();

const WaterfallList = () => {
  const dataArray = [
    { title: '跑步' },
    { title: '行走' },
    { title: '全身燃脂' },
    { title: '马拉松' },
    { title: '腰腹训练' },
  ];
  const HeaderComponent = () => (
    <ScrollBase dataArray={dataArray} />
  );
  const CardList = ({item}) => {
    const marginTop = item.id % numColumns === 1 ? -30 : 8;
    const height = 260
    // const height = item.height

    return(
    <Box alignItems="center" style={[styles.cardList, {height, marginTop }]}>
        <Box style={styles.cardItem } maxW="80" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
          borderColor: "coolGray.600",
          backgroundColor: "gray.700"
        }} _web={{
          shadow: 2,
          borderWidth: 0
        }} _light={{
          backgroundColor: "gray.50"
        }}>
          <Box>
            <AspectRatio w="100%" ratio={16 / 9}>
              {/* <Image source={{
              uri: ""
            }} alt="image" /> */}
            </AspectRatio>
  
            <Center bg="violet.500" _dark={{
            bg: "violet.400"
          }} _text={{
            color: "warmGray.50",
            fontWeight: "700",
            fontSize: "xs"
          }} position="absolute" bottom="0" px="3" py="1.5">
              {item.title}
            </Center>
          </Box>
          <Stack p="4" space={3}>
            <Stack space={2}>
              <Heading size="md" ml="-1">
                The Garden City
              </Heading>
            </Stack>
            <Text fontWeight="400">
              Bengaluru (also called Bangalore) is the center of India's high-tech
              industry.
            </Text>
            <HStack alignItems="center" space={4} justifyContent="space-between">
              <HStack alignItems="center">
                <Text color="coolGray.600" _dark={{
                color: "warmGray.200"
              }} fontWeight="400">
                  6 mins ago
                </Text>
              </HStack>
            </HStack>
          </Stack>
        </Box>
      </Box>
    )
  };

  return (
    <FlatList
      data={data}
      renderItem={CardList}
      keyExtractor={(item) => item.id.toString()}
      numColumns={numColumns}
      ListHeaderComponent={HeaderComponent}
      contentContainerStyle={styles.flatListContent}
      onStartShouldSetResponderCapture={() => {
        handleStop(false)
    }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 8,
    border: 1,
    borderColor: 'red',
    
  },
  topInput: {
    width: '100%',
  },
  courseList: {
    width: '100%',
    height: 80,
    marginTop: 10,
    marginBottom: 40,
},
  courseItem: {
    width: 100,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
    marginRight: 6,
    backgroundColor: '#6ee7b7',
    color: '#059669',
  },

  cardItem: {
    flex: 1,
    marginLeft: 4,
    marginRight: 4,
    borderRadius: 10,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
    width: screenWidth / numColumns - 20,
  },

});

export default CommunityScreen;
