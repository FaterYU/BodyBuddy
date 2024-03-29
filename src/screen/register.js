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
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import React, {useRef, useState, useEffect} from 'react';

const screenWidth = Dimensions.get('window').width;

const RegisterScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [password, setPassword] = useState('');

  // 消息提示
  function showToast(Text) {
    ToastAndroid.show(Text, ToastAndroid.SHORT);
  }
  const checkValid = (email, password, username, phoneNum) => {
    // 验证邮箱 *@*.*
    const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // 验证密码 6-16位字母数字组合
    const passwordReg = /^[a-zA-Z0-9_-]{6,16}$/;
    // 验证用户名 1-16位字母数字组合
    const usernameReg = /^[a-zA-Z0-9_-]{1,16}$/;
    // 验证手机号 11位数字
    const phoneNumReg = /^[123456789]\d{10}$/;

    if (!emailReg.test(email)) {
      showToast('Please Enter a Valid Email!');
      return false;
    }
    if (!passwordReg.test(password)) {
      showToast('Password Should Be 6-16 Characters(Numbers or Letters)!');
      return false;
    }
    if (!usernameReg.test(username)) {
      showToast('Username Should Be 1-16 Characters(Numbers or Letters)!');
      return false;
    }
    if (!phoneNumReg.test(phoneNum)) {
      showToast('Please Enter a Valid Phone Number!');
      return false;
    }
    return true;
  };
  // 新建用户（注册）
  function Register() {
    const url = global.storage.getString('serverDomain') + 'users/create';
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        userName: username,
        email: email,
        password: password,
        phone: phoneNum,
        photo: 'avatar.png',
      }),
    };
    if (!(email && password && username && phoneNum)) {
      showToast('Please Complete Your Information!');
      return;
    }
    if (checkValid(email, password, username, phoneNum)) {
      // 获取请求结果
      fetch(url, requestOptions)
        .then(response => {
          if (response.status === 400) {
            showToast('Email has been registered!');
            return Promise.reject('Email has been registered!');
          }
          if (!response.ok) {
            showToast('Sign Up Failed! Please Try Again!');
            return Promise.reject('Sign Up Failed');
          } else {
            return response.json();
          }
        })
        .then(data => {
          console.log(data.uid);
          global.storage.set('isLogin', true);
          global.storage.set('uid', data.uid);
          showToast('Sign Up Successfully!');
          navigation.navigate('Person', {refresh: true});
          navigation.navigate('Calendar', {refresh: true});
          navigation.navigate('Courses', {refresh: true});
        });
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{position: 'absolute', top: 10, left: 10, zIndex: 1000}}
        onPress={() => navigation.goBack()}>
        <MaterialCommunityIcons
          name="chevron-left-circle"
          color="#575dfb"
          size={40}
        />
      </TouchableOpacity>
      <KeyboardAwareScrollView
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
          width: screenWidth,
        }}
        resetScrollToCoords={{x: 0, y: 0}}
        scrollEnabled={true}
        style={{marginTop: 20}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'flex-start',
            width: '100%',
            marginBottom: -6,
          }}>
          <View>
            <Text
              style={{
                marginLeft: 40,
                color: '#575dfb',
                fontSize: 18,
                marginBottom: 2,
              }}>
              Sign Up For
            </Text>
            <Text
              style={{
                alignSelf: 'flex-end',
                fontSize: 30,
                fontWeight: '800',
                color: '#575dfb',
                marginLeft: 40,
                marginBottom: 10,
              }}>
              BodyBuddy
            </Text>
          </View>
          <Image
            source={require('../assets/icons/小跑哥.png')}
            style={{
              width: screenWidth * 0.45,
              height: screenWidth * 0.45,
              marginBottom: -15,
            }}
          />
        </View>
        <Text
          style={{
            alignSelf: 'flex-start',
            fontSize: 17,
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
            style={styles.input}
            placeholder="Username"
            paddingRight={25}
            fontSize={16}
            onChangeText={text => setUsername(text)}
            value={username}></TextInput>
        </View>
        <View style={styles.login}>
          <MaterialCommunityIcons
            name="email-outline"
            size={30}
            color="#575dfb"
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            paddingRight={25}
            fontSize={16}
            onChangeText={text => setEmail(text)}
            value={email}></TextInput>
        </View>
        <View style={styles.login}>
          <MaterialCommunityIcons name="cellphone" size={30} color="#575dfb" />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            paddingRight={25}
            fontSize={16}
            onChangeText={text => setPhoneNum(text)}
            value={phoneNum}></TextInput>
        </View>
        <View style={styles.login}>
          <MaterialCommunityIcons
            name="lock-outline"
            size={30}
            color="#575dfb"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            paddingRight={25}
            fontSize={16}
            onChangeText={text => setPassword(text)}
            value={password}></TextInput>
        </View>
        <TouchableOpacity style={styles.loginButton} onPress={() => Register()}>
          <Text style={{color: 'white', fontSize: 18, fontWeight: '600'}}>
            Register
          </Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    paddingTop: 20,
    backgroundColor: 'rgba(250,250,250,1)',
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

export default RegisterScreen;
