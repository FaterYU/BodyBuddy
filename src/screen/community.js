import { useState, useEffect } from 'react'
import {Text, View, StyleSheet, ScrollView, Alert} from 'react-native';
import { Input, Box, AspectRatio, Image, Center, Stack, Heading, HStack, Toast} from "native-base";
import RNFS from 'react-native-fs';

const CommunityScreen = ({ data }) => {
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
  
  return (
      <View style={styles.container}>
        <Input style={styles.topInput} variant="rounded" placeholder="Search Here" />
        <ScrollBase data={data} />
        <CardList fileList={fileList}/>
      </View>
  );
};

const ScrollBase = ({ data }) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.courseList}>
        {data.map((item, index) => (
          <ListItem key={index} item={item} />
        ))}
    </ScrollView>
  );
};

const ListItem = ({ item }) => {
  return (
    <View style={styles.courseItem}>
        <Text>{item.title}</Text>
    </View>
  );
};

const CardList = ({ fileList }) => {
  return <Box alignItems="center" style={styles.cardList}>
          {fileList.map((fileName, index) => (
        <Box key={index} style={styles.cardItem} maxW="80" rounded="lg" overflow="hidden">
          <Text>{fileName}</Text>
        </Box>
      ))}
      <Box style={styles.cardItem} maxW="80" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
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
            <Image source={{
            uri: "https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg"
          }} alt="image" />
          </AspectRatio>

          <Center bg="violet.500" _dark={{
          bg: "violet.400"
        }} _text={{
          color: "warmGray.50",
          fontWeight: "700",
          fontSize: "xs"
        }} position="absolute" bottom="0" px="3" py="1.5">
            PHOTOS
          </Center>
        </Box>
        <Stack p="4" space={3}>
          <Stack space={2}>
            <Heading size="md" ml="-1">
              The Garden City
            </Heading>
            <Text fontSize="xs" _light={{
            color: "violet.500"
          }} _dark={{
            color: "violet.400"
          }} fontWeight="500" ml="-0.5" mt="-1">
              The Silicon Valley of India.
            </Text>
          </Stack>
          <Text fontWeight="400">
            Bengaluru (also called Bangalore) is the center of India's high-tech
            industry. The city is also known for its parks and nightlife.
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
    </Box>;
};

const CommunityScreenData = () => {
  const dataArray = [
    { title: '跑步' },
    { title: '行走' },
    { title: '全身燃脂' },
    { title: '马拉松' },
    { title: '腰腹训练' },
  ];

  return <CommunityScreen data={dataArray} />;
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 8,
  },
  topInput: {
    width: '100%',
  },
  courseList: {
    width: '100%',
    padding: 8,
    marginTop: 10,
  },
  courseItem: {
    padding: 8,
    width: 100,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
    marginRight: 6,
    backgroundColor: '#6ee7b7',
    color: '#059669',
  },
  cardList: {
    width:'100%',
    display:'flex',
    flexDirection:'row',
  },
  cardItem: {
    width: '50%',
    height: 300,
  }
});

export default CommunityScreenData;
