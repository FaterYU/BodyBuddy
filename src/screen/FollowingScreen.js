import {
  Button,
  Center,
  Flex,
  IconButton,
  VStack,
  Box,
  Icon,
  ScrollView,
} from 'native-base';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  FlatList,
  ReactFragment,
  ImageBackground,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

function FollowingScreen({navigation}) {
  return (
    <ScrollView
      contentContainerStyle={{
        flexDirection: 'column',
        justifyContent: 'flex-start',
      }}>
      <View style={styles.top}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            height: 40,
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons
              name="chevron-left"
              size={40}
              color="rgba(30, 30, 30, 1)"
            />
          </TouchableOpacity>
          <Text
            style={{fontSize: 20, fontWeight: 600, color: 'rgba(30,30,30,1)'}}>
            Following
          </Text>
        </View>
      </View>
      <View style={{flexDirection: 'column', flex: 1}}>
        <UserCard></UserCard>
        <UserCard></UserCard>
        <UserCard></UserCard>
        <UserCard></UserCard>
        <UserCard></UserCard>
        <UserCard></UserCard>
        <UserCard></UserCard>
        <UserCard></UserCard>
        <UserCard></UserCard>
        <UserCard></UserCard>
        <UserCard></UserCard>
        <UserCard></UserCard>
      </View>
    </ScrollView>
  );
}

const UserCard = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        height: 80,
      }}>
      <View
        style={{
          height: 50,
          width: 50,
          borderRadius: 30,
          backgroundColor: 'gray',
          margin: 10,
        }}></View>
      <Text
        style={{color: 'black', fontSize: 20, fontWeight: 500, marginLeft: 10}}>
        UserName
      </Text>
      <Button
        style={{
          marginLeft: 120,
          backgroundColor: 'rgba(222,222,222,0)',
          borderColor: '#a2a1a3',
          borderWidth: 1,
          borderRadius: 20,
          width: 90,
          height: 30,
        }}>
        <Text
          style={{color: '#a2a1a3', fontSize: 13, fontWeight: 500, height: 20}}>
          Following
        </Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  top: {
    height: 50,
    width: '100%',
    backgroundColor: 'rgba(73, 105, 255, 0)',
    justifyContent: 'flex-start',
  },
});

export default FollowingScreen;
