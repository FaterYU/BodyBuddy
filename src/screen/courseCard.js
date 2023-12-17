import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;

function CourseCard({
  courseId,
  courseName,
  courseTime,
  courseCalorie,
  courseLevel,
  finishTime,
  courseImg,
  adaptWidthRate = 1,
}) {
  const containerWidth = adaptWidthRate * screenWidth - 20;
  const navigation = useNavigation();
  const goToCourse = () => {
    navigation.navigate('DetailsScreen', {id: courseId});
  };
  return (
    <TouchableOpacity
      style={{
        ...styles.container,
        width: containerWidth,
      }}
      onPress={goToCourse}>
      <View>
        <Image source={courseImg} style={styles.img} />
      </View>
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'space-around',
          height: 90,
        }}>
        <Text
          numberOfLines={3}
          ellipsizeMode="tail"
          style={{
            fontSize: 16,
            fontWeight: '500',
            color: 'black',
            width: containerWidth - 135,
          }}>
          {courseName}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            width: '100%',
            marginTop: 8,
          }}>
          <Text style={{fontSize: 12}}>{courseTime}分钟</Text>
          <Text style={{fontSize: 12, marginLeft: 8}}>{courseCalorie}千卡</Text>
          <Text style={{fontSize: 12, marginLeft: 8}}>{courseLevel}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <MaterialCommunityIcons
            name="poll"
            size={16}
            color="gray"
            style={{marginTop: 18}}
          />
          <Text style={{marginTop: 16, fontSize: 13}}>
            已完成{finishTime}次
          </Text>
        </View>
      </View>
      <MaterialCommunityIcons
        name="chevron-right-circle"
        size={20}
        color="rgba(200,200,200,0.8)"
        style={{
          alignSelf: 'flex-start',
          marginTop: 10,
        }}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'rgba(220,220,220,0.4)',
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
