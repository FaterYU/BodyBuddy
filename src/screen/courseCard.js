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
        paddingVertical:2,
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
          numberOfLines={2}
          ellipsizeMode="tail"
          style={{
            fontSize: 16,
            fontWeight: '500',
            color: 'black',
            width: containerWidth - 135,
            paddingRight:4,
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
          <Text style={{color:'gray',fontSize: 12}}>{courseTime}min</Text>
          <Text style={{color:'gray',fontSize: 12, marginLeft: 8}}>{courseCalorie}kcal</Text>
          <Text style={{color:'gray',fontSize: 12, marginLeft: 8}}>L{courseLevel}</Text>
        </View>
        <View style={{flexDirection: 'row',paddingTop:6}}>
          <MaterialCommunityIcons
            name="poll"
            size={16}
            color="rgb(160,160,160)"
            style={{marginTop: 18, marginRight:4}}
          />
          <Text style={{color:'gray',marginTop: 18, fontSize: 13}}>
            Finished {finishTime} times
          </Text>
        </View>
      </View>
      <MaterialCommunityIcons
        name="chevron-right-circle"
        size={20}
        color="#c3c3c3"
        style={{
          alignSelf: 'flex-start',
          position: 'absolute',
          right: 10,
          top: 10,
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
    backgroundColor: '#f2f2f2',
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
