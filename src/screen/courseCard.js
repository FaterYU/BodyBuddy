import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;

function CourseCard() {
  const navigation = useNavigation();
  const goToCourse = () => {
    navigation.navigate('DetailsScreen');
  };
  return (
    <TouchableOpacity style={styles.container} onPress={goToCourse}>
      <View style={styles.img}></View>
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'space-around',
          height: 90,
        }}>
        <Text style={{fontSize: 16, fontWeight: '500', color: 'black'}}>
          HIIT燃脂-臀腿初级
        </Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{fontSize: 12}}>30分钟</Text>
          <Text style={{fontSize: 12}}>200千卡</Text>
          <Text style={{fontSize: 12}}>零基础</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <MaterialCommunityIcons
            name="poll"
            size={16}
            color="gray"
            style={{marginTop: 18}}
          />
          <Text style={{marginTop: 16, fontSize: 13}}>已完成2次</Text>
        </View>
      </View>
      <MaterialCommunityIcons
        name="chevron-right-circle"
        size={20}
        color="rgba(200,200,200,0.8)"
        style={{
          alignSelf: 'flex-start',
          marginTop: 10,
          marginLeft: screenWidth - 294,
        }}
      />
    </TouchableOpacity>
  );
}

styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'rgba(220,220,220,0.4)',
    width: screenWidth - 20,
    marginBottom: 10,
    borderRadius: 8,
  },
  img: {
    width: 90,
    height: 90,
    margin: 10,
    borderRadius: 8,
    marginVertical: 8,
    backgroundColor: 'rgba(200,200,200,0.8)',
  },
});

export default CourseCard;
