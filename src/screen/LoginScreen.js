import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import React, {useRef, useState} from 'react';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

function LoginScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  function showToast(Text) {
    ToastAndroid.show(Text, ToastAndroid.SHORT);
  }
  const Login = () => {
    const url = "http://bodybuddy.fater.top/api/users/login";
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    };
    if (email && password) {
      fetch(url, requestOptions)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          if (data.status == 200) {
            console.log('Login success');
            showToast('Login Successfully!');
            navigation.navigate('HomeScreen');
          } else {
            showToast('Login failed!');
            console.log('Login failed');
          }
        });
    }
  };

  return (
    <View style={styles.container}>
      <View style={{flexDirection:'column'}}>
      <TouchableOpacity style={{alignSelf:'flex-start',margin:10}} onPress={()=>navigation.goBack()}>
        <MaterialCommunityIcons name="chevron-left-circle" color="#575dfb" size={40} />
      </TouchableOpacity>
      <KeyboardAwareScrollView
        contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
        resetScrollToCoords={{ x: 0, y: 0 }}
        scrollEnabled={true}
      >
      <Image
        source={require('../assets/icons/小跑哥.png')}
        style={{
          width: 360,
          height: 360,
          marginTop: -40,
        }}
      />
      <Text
        style={{
          alignSelf: 'flex-start',
          fontSize: 32,
          fontWeight: '800',
          color: '#575dfb',
          paddingHorizontal: 40,
        }}>
        BodyBuddy
      </Text>
      <Text
        style={{
          alignSelf: 'flex-start',
          fontSize: 19,
          color: '#000000',
          paddingHorizontal: 40,
        }}>
        Intelligent buddy, for your healthy body
      </Text>

          <View style={styles.login}>
            <MaterialCommunityIcons
              name="account-circle-outline"
              size={30}
              color="#575dfb"
            />
            <TextInput
              style={styles.inpu}
              placeholder="Username/Email/Phone Number"
              paddingRight={25}
              fontSize={16}
              onChangeText={text => setEmail(text)}
              value={email}
              >
            </TextInput>
          </View>
          <View style={styles.login}>
            <MaterialCommunityIcons name="lock-outline" size={30} color="#575dfb" />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry={true}
              paddingRight={25}
              fontSize={16}
              onChangeText={text => setPassword(text)}
              >
            </TextInput>
          </View>
      <TouchableOpacity style={styles.loginButton} onPress={Login}>
        <Text style={{color: 'white', fontSize: 18, fontWeight: '600'}}>
          Login
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{alignSelf: 'flex-end', marginRight: 42, marginTop: 6, flexDirection:'row', justifyContent:'center', alignItems:'flex-end',alignItems:'center'}}
        onPress={() => navigation.navigate('RegisterScreen')}>
        <Text style={{marginRight:6, fontSize:13}}>
          Don't have an account?
        </Text>
        <Text style={{color: '#575dfb', fontSize: 16, fontWeight: '600', textDecorationLine:'underline' }}>
          Register
        </Text>
      </TouchableOpacity>
      </KeyboardAwareScrollView>
      </View>

    </View>
  );
}

const ImageSlider = ({images}) => {
  return (
    <Swiper style={styles.wrapper} showsButtons={false} showsPagination={false}>
      {images.map((image, index) => (
        <View key={index} style={styles.slide}>
          <Image source={{uri: image}} style={styles.image} />
        </View>
      ))}
    </Swiper>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirectionL: 'column',
  },
  login: {
    flexDirection: 'row',
    justifyContent: 'left',
    alignItems: 'center',
    backgroundColor: 'rgba(220,220,220,0)',
    width: screenWidth - 80,
    marginBottom: 10,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#575dfb',
    paddingHorizontal: 10,
    marginTop: 20,
  },
  loginButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: screenWidth - 80,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#575dfb',
    paddingHorizontal: 10,
    marginTop: 20,
    activeOpacity: 0.4,
  },
});

export default LoginScreen;
