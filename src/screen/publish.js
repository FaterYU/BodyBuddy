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
  StatusBar,
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
import CourseCard from './courseCard';

const PublishScreen = ({navigation, route}) => {
  const {isOpen, onToggle} = useDisclose();
  const [imageSourceList, setImageSourceList] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedValue, setSelectedValue] = useState(null);
  const [CourseList, setCourseList] = useState([]);
  const [linkCourse, setLinkCourse] = useState(null);
  const uid = 1;
  useEffect(() => {
    const Link = () => {
      setSelectedValue(route.params?.linkCourse);
      setLinkCourse(route.params?.linkCourse);
    };
    Link();
  }, [route.params]);
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
    if (uid == null) {
      showToast('Please login first');
      return;
    }
    if (title == '' || content == '' || imageSourceList.length == 0) {
      showToast('Please make sure you have filled in all the information');
      return;
    }
    const postImage = async postImageList => {
      await Promise.all(
        postImageList.map(async (item, index) => {
          const res = await UploadFilesService.upload(item, event => {});
          momentData.content.photo[index] = res.data.message;
        }),
      );
    };
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
        mention: selectedValue ? [selectedValue] : [],
      },
      tags: {
        tagsList: [],
      },
    };
    var postImageList = [];
    imageSourceList.forEach(item => {
      postImageList.push({
        uri: item.uri,
        type: 'image/jpeg',
        name: item.fileName,
      });
    });
    await postImage(postImageList);
    momentData.photo = momentData.content.photo[0];
    MomentsService.createMoment(momentData).then(res => {
      navigation.goBack();
    });
  };

  const handleValueChange = value => {
    setSelectedValue(value);
  };

  return (
    <View style={{backgroundColor: 'rgba(249,249,249,1)', height: '100%'}}>
      <StatusBar translucent backgroundColor="transparent" />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'white',
          paddingTop:28,
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons
            name="close"
            size={36}
            color="gray"
            style={{margin: 10, width: 60}}
          />
        </TouchableOpacity>
        <Text style={{fontSize: 18, color: 'black',marginLeft:12}}>Edict Movement</Text>
        <TouchableOpacity onPress={publishMoment}>
          <View
            style={{
              paddingHorizontal: 4,
              backgroundColor: '#575dfb',
              width: 80,
              height: 28,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 16,
              marginVertical: 10,
              paddingHorizontal:8,
              marginRight: 14,
            }}>
            <Text style={{color: 'white'}}>Release</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{marginLeft: '2%', width: '90%'}}>
        <Input
          placeholder="Title"
          variant="unstyled"
          size="2xl"
          value={title}
          onChangeText={setTitle}
        />
      </View>
      <View style={{width: '94%', alignSelf: 'center'}}>
        <TextArea
          placeholder="Share something here..."
          containerStyle={{border: 2, borderColor: '#575dfb'}}
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
          marginTop: 12,
        }}>
        {linkCourse ? (
          <Text style={{fontSize: 16, color: 'black', marginRight: 6}}>
            Linked Course:{' '}
            {CourseList.find(item => item.value === linkCourse)?.label}
          </Text>
        ) : (
          <SearchablePicker
            data={CourseList}
            onValueChange={handleValueChange}
          />
        )}
      </View>
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
            marginLeft: 2,
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
                bg="#575dfb"
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
                bg="rgba(80,150,240,1)"
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
    padding: 16,
    fontSize: 16,
    flexWrap: 'wrap',
  },
});

export default PublishScreen;
