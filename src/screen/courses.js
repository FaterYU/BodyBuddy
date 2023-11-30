import {Text, View, Dimensions, StyleSheet, ScrollView, TouchableOpacity, TouchableHighlight, TouchableWithoutFeedback} from 'react-native';
import { SearchBar} from '@rneui/themed';
import SevenDaysCalendar from './weekCalendar';
import CourseCard from './courseCard';
const screenWidth = Dimensions.get('window').width;

function CoursesScreen({navigation}) {
  var currentDate = new Date();
  // 获取今日星期
  const todayWeek = currentDate.getDay();
  const weekName = ['日', '一', '二', '三', '四', '五', '六'];
  currentDate = currentDate.toLocaleDateString().slice(0,-5);
  const goToCalendar = () => {
    navigation.navigate('Calendar');
  }
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{flexDirection:'row',alignItems:"flex-end"}}>
        <Text style={{color:'blue', fontSize:26, fontWeight:'bold',marginLeft:10}}>{currentDate}</Text>
        <Text style={{color:'black', fontSize:16, fontWeight:'bold',marginLeft:10, marginBottom:4}}>星期{weekName[todayWeek]}</Text>
      </View>
      <SearchBar
            inputStyle={{
              fontSize:16
            }}
            placeholder="Search Here..."
            round={true}
            lightTheme
            showCancel
            platform='android'
            containerStyle={{
              backgroundColor: 'rgba(1,1,1,0)',
              width: screenWidth-20,
              alignSelf:'center',
              marginTop:-4,
            }}
            inputContainerStyle={{
              backgroundColor: 'rgba(220,220,220,0.4)',
              borderRadius:20,
              height:40,
            }}
            // onChangeText={updateSearch}
            // value={search}
          />
      <View style={styles.calendarCard}>
        <View style={{flexDirection:'row',justifyContent:'space-around',paddingTop:8}}>
          <View style={{flexDirection:"column",alignItems:'center'}}>
            <Text style={{fontSize:12}}>累计运动</Text>
            <Text style={{fontSize:16,color:'black',marginTop:10}}>68分钟</Text>
          </View>
          <View style={{flexDirection:"column",alignItems:'center'}}>
            <Text style={{fontSize:12}}>完成天数</Text>
            <Text style={{fontSize:16,color:'black',marginTop:10}}>2/28天</Text>
          </View>
          <View style={{flexDirection:"column",alignItems:'center'}}>
            <Text style={{fontSize:12}}>累计消耗</Text>
            <Text style={{fontSize:16,color:'black',marginTop:10}}>82分钟</Text>
          </View>
        </View>
        <SevenDaysCalendar />
        <TouchableOpacity activeOpacity={0.4} style={styles.planButton} onPressOut={goToCalendar}>
          <Text style={{color:'white'}}>查看今日训练计划</Text>
        </TouchableOpacity >
      </View>
      <View style={{width:'100%'}}>
        <Text style={{color:'black', fontSize:16, fontWeight:'bold',marginLeft:16, marginBottom:4, marginTop:8}}>最近课程</Text>
        <View style={{flexDirection:'column',justifyContent:'center',alignItems:'center',alignSelf:'center'}}>
          <CourseCard />
          <CourseCard />
        </View>
      </View>
      <View style={{width:'100%'}}>
        <Text style={{color:'black', fontSize:16, fontWeight:'bold',marginLeft:16, marginBottom:4, marginTop:8}}>推荐课程</Text>
        <View style={{flexDirection:'column',justifyContent:'center',alignItems:'center',alignSelf:'center'}}>
            <RecommendCourse />
            <RecommendCourse />
            <RecommendCourse />
        </View>
      </View>
    </ScrollView>
  );
}

const RecommendCourse = () => {
  return(
    <View style={{backgroundColor:'rgba(180,180,180,1)',marginBottom:10,paddingLeft:16,height:100,width:screenWidth-20,borderRadius:2,flexDirection:'column',justifyContent:'flex-end'}}>
      <Text style={{color:'white',fontSize:17,marginLeft:10}}>腹肌训练入门</Text>
      <View style={{flexDirection:'row',justifyContent:'flex-start',marginBottom:6,}}>
        <Text style={{fontSize:12,marginLeft:10,color:'white'}}>20分钟</Text>
        <Text style={{fontSize:12,marginLeft:10,color:'white'}}>81千卡</Text>
        <Text style={{fontSize:12,marginLeft:10,color:'white'}}>零基础</Text>
      </View>
    </View>
  )
}


export default CoursesScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  calendarCard:{
    width:screenWidth-20,
    alignSelf:'center',
    borderRadius: 10,
    backgroundColor: 'rgba(220,220,220,0.4)'
  },
  planButton:{
    width:screenWidth-56,
    alignSelf:'center',
    backgroundColor:'blue',
    height:32,
    borderRadius:18,
    justifyContent:'center',
    alignItems:'center',
    marginBottom:10,
  },
})
