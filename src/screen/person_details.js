import React, {useState, useEffect} from 'react';
import {
  Button,
  Box,
  Input,
  Select,
  FormControl,
  ScrollView,
  InputRightAddon,
  InputGroup,
} from 'native-base';
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Avatar} from '@rneui/themed';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import {selectImage, takePhoto} from '../components/imagePicker';
import UsersService from '../services/users.service';
import UploadFilesService from '../services/upload.service';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

function PersonDetails({navigation}) {
  const [name, setName] = useState('');
  const [tel, setTel] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [gender, setGender] = useState('Male');
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [photoName, setPhotoName] = useState(null);

  const userId = global.storage.getNumber('uid');

  useEffect(() => {
    const url = 'http://bodybuddy.fater.top/api/users/findOne';
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({uid: userId}),
    };
    fetch(url, requestOptions)
      .then(response => response.json())
      .then(data => {
        setName(data.userName);
        setTel(data.phone);
        setAvatar(data.photo);
        setGender(data.infomation.gender);
        setHeight(data.infomation.height);
        setWeight(data.infomation.weight);
      });
  }, [userId]);

  const updateInfo = async () => {
    const postImage = async Image => {
      const res = await UploadFilesService.upload(Image, event => {});
      setPhotoName(res.data.message);
    };
    var Image = {
      uri: avatar.uri,
      type: 'image/jpeg',
      name: avatar.fileName,
    };
    await postImage(Image);
    console.log({
      uid: userId,
      userName: name,
      phone: tel,
      photo: photoName,
      infomation: {
        gender: gender,
        height: height,
        weight: weight,
      },
    });
    UsersService.update({
      uid: userId,
      userName: name,
      phone: tel,
      photo: photoName,
      infomation: {
        gender: gender,
        height: height,
        weight: weight,
      },
    })
      .then(res => {
        console.log(res);
        navigation.goBack();
      })
      .catch(err => {
        console.log(err);
      });
  };

  if (avatar === null) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#4869ff" />
      </View>
    );
  }
  return (
    <ScrollView>
      <StatusBar translucent backgroundColor="transparent" />
      <View style={{backgroundColor: '#ffffff'}}>
        <ImageBackground
          source={require('../assets/backgrounds/rain_glass.jpg')}
          style={{height: screenHeight * 0.38}}>
          <LinearGradient
            colors={['rgba(0,0,0,0.5)', 'rgba(0,0,0,0)']}
            style={{height: screenHeight * 0.35, paddingTop: 20}}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{marginLeft: 12, marginTop: 12, zIndex: 1000}}>
              <MaterialCommunityIcons
                name="chevron-left"
                size={36}
                color="#b6b7cc"
              />
            </TouchableOpacity>
            <Text style={styles.head}>Personal Profile</Text>
            <TouchableOpacity
              style={styles.avatar}
              onPress={async () => {
                var imageSrc = await selectImage();
                console.log(imageSrc);
                setAvatar(imageSrc[0]);
              }}>
              <Avatar
                source={{
                  uri: avatar
                    ? avatar.uri
                    : 'https://cdn.pixabay.com/photo/2016/11/21/12/42/beard-1845166_1280.jpg',
                }}
                size={150}
                rounded
              />
            </TouchableOpacity>
          </LinearGradient>
        </ImageBackground>
        <View
          style={{
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
            height: screenHeight * 0.75,
            marginTop: -40,
            backgroundColor: 'white',
            elevation: 6,
          }}>
          <View>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '700',
                color: '#05011f',
                margin: 25,
                marginBottom: 16,
              }}>
              Personal Information
            </Text>
            <View style={{marginHorizontal: 25}}>
              <View>
                <Text style={styles.info_head}>Name</Text>
                <Input
                  size="lg"
                  placeholder="Name"
                  value={name}
                  style={styles.input}
                />
                <Text style={styles.info_head}>Telephone Number</Text>
                <Input
                  size="lg"
                  placeholder="Tel"
                  value={tel}
                  style={styles.input}></Input>
              </View>
              {/* <View style={{flexDirection: 'column'}}>
                <Text style={styles.info_head}>Birthday</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <BirthYearSelect />
                </View>
              </View> */}

              <View>
                <Text style={styles.info_head} value={gender}>
                  Gender
                </Text>
                <FormControl
                  w="3/4"
                  maxW="300"
                  isRequired
                  isInvalid></FormControl>
                <Select
                  size="lg"
                  accessibilityLabel="Gender"
                  placeholder="Gender"
                  _selectedItem={{bg: 'teal.600'}}
                  mt="1">
                  <Select.Item label="Male" value="Male" />
                  <Select.Item label="Female" value="Female" />
                </Select>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View style={{flexDirection: 'column'}}>
                  <Text style={styles.info_head}>Height</Text>
                  <InputGroup>
                    <Input
                      size="lg"
                      placeholder="Height"
                      value={height}
                      w={(screenWidth - 175) / 2}></Input>
                    <InputRightAddon children="cm" />
                  </InputGroup>
                </View>
                <View style={{flexDirection: 'column'}}>
                  <Text style={styles.info_head}>Weight</Text>
                  <InputGroup>
                    <Input
                      size="lg"
                      placeholder="Weight"
                      value={weight}
                      w={(screenWidth - 175) / 2}></Input>
                    <InputRightAddon children="kg" />
                  </InputGroup>
                </View>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  style={styles.exit_button}
                  onPress={() => navigation.goBack()}>
                  <Text
                    style={{fontWeight: '600', color: '#4869ff', fontSize: 19}}>
                    Exit
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.save_button}
                  onPress={updateInfo}>
                  <Text
                    style={{fontWeight: '600', color: 'white', fontSize: 19}}>
                    Save
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const BirthYearSelect = () => {
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [isFirst, setIsFirst] = useState(true);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    setIsFirst(false);
    showMode('date');
  };

  return (
    <View>
      <Box
        style={styles.birth_select}
        overflow="hidden"
        borderColor="#e3e3e3"
        borderWidth="1.25">
        <Text style={{color: 'black', fontSize: 15, marginLeft: 10}}>
          {isFirst ? '' : date.toLocaleDateString()}
        </Text>

        <TouchableOpacity onPress={showDatepicker}>
          <MaterialCommunityIcons
            name="chevron-down"
            size={38}
            style={{marginLeft: 'auto'}}
          />
        </TouchableOpacity>
      </Box>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  head: {
    textAlign: 'center',
    fontSize: 18,
    color: '#ffffff',
    marginTop: -30,
    fontWeight: '600',
  },
  avatar: {
    alignSelf: 'center',
    margin: screenHeight * 0.05,
  },
  info_head: {
    color: '#05011f',
    fontSize: 16,
    marginTop: 10,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  exit_button: {
    backgroundColor: 'transparent',
    width: (screenWidth - 70) / 2,
    height: 50,
    marginTop: 25,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.8,
    borderColor: '#4869ff',
  },
  save_button: {
    backgroundColor: '#4869ff',
    width: (screenWidth - 70) / 2,
    height: 50,
    marginTop: 25,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  birth_select: {
    width: screenWidth - 50,
    flexDirection: 'row',
    height: 48,
    borderRadius: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default PersonDetails;
