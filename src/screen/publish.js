import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  Image,
  Picker,
  TextInput,
} from 'react-native';
import React, {useEffect, useState, Component} from 'react';
import {
  Input,
  TextArea,
  Box,
  Stagger,
  useDisclose,
  Center,
  IconButton,
  Icon,
  HStack,
} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {selectImage, takePhoto} from '../components/imagePicker';
import SearchablePicker from '../components/SearchablePicker';
import MomentsService from '../services/moments.service';
import CoursesService from '../services/courses.service';
import UploadFilesService from '../services/upload.service';

const PublishScreen = ({navigation}) => {
  const {isOpen, onToggle} = useDisclose();
  const [imageSourceList, setImageSourceList] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedValue, setSelectedValue] = useState(null);
  const [CourseList, setCourseList] = useState([]);

  useEffect(() => {
    const loadCourseData = () => {
      CoursesService.findAllCourse().then(res => {
        var courseList = [];
        res.data.forEach(item => {
          courseList.push({
            label: item.name,
            value: item.id,
          });
        });
        setCourseList(courseList);
      });
    };
    loadCourseData();
  }, []);

  const publishMoment = async () => {
    console.log(title);
    console.log(content);
    const imageNameList = [];
    imageSourceList.forEach(item => {
      imageNameList.push(item.fileName);
    });
    const momentData = {
      author: 1,
      photo: imageNameList[0],
      content: {
        title: title,
        text: content,
        type: 'photo',
        photo: imageNameList,
        video: [],
        mention: [],
      },
      tags: {
        tagsList: [],
      },
    };
    const postImageList = [];
    imageSourceList.forEach(item => {
      postImageList.push({
        uri: item.uri,
        type: 'image/jpeg',
        name: item.fileName,
      });
    });
    await Promise.all(
      postImageList.map(async (item, index) => {
        const res = await UploadFilesService.upload(item, event => {
          // console.log(event);
        });
        momentData.content.photo[index] = res.data.message;
      }),
    );
    momentData.photo = momentData.content.photo[0];
    MomentsService.createMoment(momentData).then(res => {
      navigation.goBack();
    });
  };

  const handleValueChange = value => {
    console.log(value);
    setSelectedValue(value);
  };

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons
            name="close"
            size={36}
            color="gray"
            style={{margin: 10, width: 60}}
          />
        </TouchableOpacity>
        <Text style={{fontSize: 18, color: 'black'}}>编辑动态</Text>
        <TouchableOpacity onPress={publishMoment}>
          <View
            style={{
              paddingHorizontal: 4,
              backgroundColor: 'blue',
              width: 60,
              height: 28,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 16,
              margin: 10,
              marginRight: 14,
            }}>
            <Text style={{color: 'white'}}>发布</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{marginLeft: '2%', width: '90%'}}>
        <Input
          placeholder="标题"
          variant="unstyled"
          size="2xl"
          value={title}
          onChangeText={setTitle}
        />
      </View>
      <View style={{width: '94%', alignSelf: 'center'}}>
        <TextArea
          placeholder="说点什么..."
          containerStyle={{border: 1, borderColor: 'gray'}}
          h={160}
          style={styles.inputContent}
          value={content}
          onChangeText={setContent}
        />
      </View>
      <View
        style={{
          width: '94%',
          alignSelf: 'center',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <SearchablePicker data={CourseList} onValueChange={handleValueChange} />
      </View>
      {/* {selectedValue && <Text>Selected Value: {selectedValue}</Text>} */}
      <ScrollView
        horizontal={true}
        style={{flexDirection: 'row', marginTop: 10, padding: 10}}
        contentContainerStyle={{alignItems: 'flex-start'}}>
        {imageSourceList.length > 0 &&
          imageSourceList.map((item, index) => {
            return (
              <View
                key={index}
                style={{
                  backgroundColor: '#ccc',
                  height: 68,
                  width: 68,
                  borderRadius: 12,
                  marginLeft: 10,
                }}>
                {item && (
                  <Image
                    source={{uri: item.uri}}
                    style={{height: 68, width: 68, borderRadius: 12}}
                  />
                )}
              </View>
            );
          })}
        <View
          style={{
            marginTop: 2,
            marginLeft: 10,
            flexDirection: 'column-reverse',
          }}>
          <Box
            alignItems="flex-start"
            minH="100"
            style={{flexDirection: 'column-reverse'}}>
            <Stagger
              visible={isOpen}
              initial={{
                opacity: 0,
                scale: 0,
                translateY: 34,
              }}
              animate={{
                translateY: 0,
                scale: 1,
                opacity: 1,
                transition: {
                  type: 'spring',
                  mass: 0.8,
                  stagger: {
                    offset: 30,
                    reverse: true,
                  },
                },
              }}
              exit={{
                translateY: 34,
                scale: 0.5,
                opacity: 0,
                transition: {
                  duration: 80,
                  stagger: {
                    offset: 30,
                    reverse: true,
                  },
                },
              }}>
              <IconButton
                mb="4"
                variant="solid"
                bg="indigo.500"
                colorScheme="indigo"
                borderRadius="10"
                icon={
                  <Icon
                    as={MaterialCommunityIcons}
                    size="10"
                    name="map-marker"
                    _dark={{
                      color: 'warmGray.50',
                    }}
                    color="warmGray.50"
                  />
                }
              />
              <IconButton
                mb="4"
                variant="solid"
                bg="yellow.400"
                colorScheme="yellow"
                borderRadius="10"
                onPress={async () => {
                  var imageSrc = await selectImage();
                  var uriList = [];
                  imageSrc.forEach(item => {
                    uriList.push(item);
                  });
                  setImageSourceList([...imageSourceList, ...uriList]);
                  onToggle();
                }}
                icon={
                  <Icon
                    as={MaterialCommunityIcons}
                    _dark={{
                      color: 'warmGray.50',
                    }}
                    size="10"
                    name="panorama"
                    color="warmGray.50"
                  />
                }
              />
              <IconButton
                mb="4"
                variant="solid"
                bg="teal.400"
                colorScheme="teal"
                borderRadius="10"
                icon={
                  <Icon
                    as={MaterialCommunityIcons}
                    _dark={{
                      color: 'warmGray.50',
                    }}
                    size="10"
                    name="video"
                    color="warmGray.50"
                  />
                }
              />
              <IconButton
                mb="4"
                variant="solid"
                bg="red.500"
                colorScheme="red"
                borderRadius="10"
                onPress={async () => {
                  var imageSrc = await takePhoto();
                  var uriList = [];
                  imageSrc.forEach(item => {
                    uriList.push(item);
                  });
                  setImageSourceList([...imageSourceList, ...uriList]);
                  onToggle();
                }}
                icon={
                  <Icon
                    as={MaterialCommunityIcons}
                    size="10"
                    name="camera"
                    _dark={{
                      color: 'warmGray.50',
                    }}
                    color="warmGray.50"
                  />
                }
              />
            </Stagger>
          </Box>
          <HStack alignItems="center" style={{marginBottom: 10}}>
            <IconButton
              variant="solid"
              borderRadius="10"
              size="lg"
              onPress={onToggle}
              bg="cyan.400"
              icon={
                <Icon
                  as={MaterialCommunityIcons}
                  size="10"
                  name="plus"
                  color="warmGray.50"
                  _dark={{
                    color: 'warmGray.50',
                  }}
                />
              }
            />
          </HStack>
        </View>
      </ScrollView>
    </View>
  );
};

// const ChooesButton = () => {

//   return (

//   );
// };

const styles = StyleSheet.create({
  inputContent: {
    height: 160,
    textAlignVertical: 'top',
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    flexWrap: 'wrap',
  },
});

export default PublishScreen;
