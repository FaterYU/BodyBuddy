import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React, {useRef} from 'react';

const screenWidth = Dimensions.get('window').width;

function LoginScreen({navigation}) {
  return (
    <View style={styles.container}>
      <View
        style={{backgroundColor: 'gray', height: 300, width: '100%'}}></View>
      {/* <ImageSlider /> */}
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
          fontSize: 20,
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
          placeholder="Username/Email/Phone Number"
          paddingRight={25}
          fontSize={16}>
          {/* // onChangeText={updateSearch}
                // value={search} */}
        </TextInput>
      </View>
      <View style={styles.login}>
        <MaterialCommunityIcons name="lock-outline" size={30} color="#575dfb" />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          paddingRight={25}
          fontSize={16}>
          {/* // onChangeText={updateSearch}
                // value={search} */}
        </TextInput>
      </View>
      <TouchableOpacity style={styles.loginButton}>
        <Text style={{color: 'white', fontSize: 18, fontWeight: '600'}}>
          Login
        </Text>
      </TouchableOpacity>
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
    justifyContent: 'center',
    alignItems: 'center',
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
