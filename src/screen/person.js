import {Text, View, StyleSheet} from 'react-native';
import { Avatar } from '@rneui/themed';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { WaterfallList } from './community';

function PersonScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.userBackground}>
        <View style={styles.userInfo}>
          <Avatar
            source={{uri:'https://cdn.pixabay.com/photo/2016/11/21/12/42/beard-1845166_1280.jpg'}}
            size={76}
            containerStyle={styles.avatar}
            rounded
            />
          <View style={{flexDirection:'column'}}>
              <Text style={{color:'white', fontSize:22, fontWeight:'bold',marginTop:6,marginLeft:8}}>UserName</Text>
              <View style={{flexDirection:'row',flexWrap:'nowrap',flex:1,width:"100%"}}>
                <View style={styles.fab}>
                  <Text style={styles.fabText}>社区达人</Text>
                </View>
                <View style={styles.fab}>
                  <Text style={styles.fabText}>勋章1</Text>
                </View>
              </View>
            </View>
        </View>
      </View>
      <View style={styles.fansList}>
        <View style={styles.fansButton}>
          <Text>4</Text>
          <Text>关注</Text>
        </View>
        <View style={styles.fansButton}>
          <Text>2</Text>
          <Text>粉丝</Text>
        </View>
        <View style={styles.fansButton}>
          <Text>6</Text>
          <Text>动态</Text>
        </View>
      </View>
      <View style={styles.cardList}>
        <View style={styles.dataCard}>
          <View style={{flexDirection:'row', alignContent:'space-around',justifyContent:'space-between',marginTop:10}}>
            <Text style={{fontWeight:'bold',color:'blue',fontSize:24,lineHeight:30,marginLeft:10}}>运动数据</Text>
            <MaterialCommunityIcons name='chevron-right' size={26} color='blue'/>
          </View>
            <Text style={{marginTop:10,marginLeft:10}}>总运动</Text>
          <View style={{flexDirection:'row',marginLeft:10}}>
            <Text style={{marginTop:14,fontSize:36,color:'black'}}>336</Text>
            <Text style={{marginTop:22,color:'black',marginLeft:6}}>分钟</Text>
          </View>
          <Text style={{marginLeft:10}}>本周消耗164千卡</Text>
        </View>
        <View style={styles.dataCard}>
          <View style={{flexDirection:'row', alignContent:'space-around',justifyContent:'space-between',marginTop:10}}>
            <Text style={{fontWeight:'bold',color:'blue',fontSize:24,lineHeight:30,marginLeft:10}}>健康数据</Text>
            <MaterialCommunityIcons name='chevron-right' size={26} color='blue'/>
          </View>
            <Text style={{marginTop:10,marginLeft:10}}>体重</Text>
          <View style={{flexDirection:'row',marginLeft:10}}>
            <Text style={{marginTop:14,fontSize:36,color:'black'}}>52.3</Text>
            <Text style={{marginTop:22,color:'black',marginLeft:6}}>kg</Text>
          </View>
          <Text style={{marginLeft:10}}>上次记录10天前</Text>
          </View>
        </View>
        <View style={styles.waterfall}>
          <WaterfallList />
        </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent:'flex-start',
    backgroundColor: 'rgba(248,248,248,1)',
  },
  userBackground: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(200,200,200,0.8)',
    height: '26%',
    width: '100%',
  },
  userInfo:{
    marginLeft: 20,
    flexDirection: 'row',
  },
  avatar:{
    borderRadius: 50,
  },
  fab:{
    marginTop: 6,
    marginLeft:8,
    height: 30,
    backgroundColor: 'black',
    borderRadius: 15,
    paddingHorizontal:10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fabText:{
    color: 'white',
  },
  fansList:{
    backgroundColor: 'white',
    marginTop:-44,
    height:88,
    width:'90%',
    alignSelf:'center',
    borderRadius:6,
    elevation: 6,
    justifyContent:'space-around',
    alignItems:'center',
    flexDirection:'row',
  },
  fansButton:{
    alignItems:'center',
  },
  cardList:{
    width:'100%',
    height:'28%',
    justifyContent:'space-around',
    alignItems:'center',
    flexDirection:'row',
  },
  dataCard:{
    backgroundColor:'white',
    elevation: 1,
    width:'44%',
    borderRadius:6,
    height:'80%',
  },
  waterfall:{
    alignItems:'center',
  }
});

export default PersonScreen;
