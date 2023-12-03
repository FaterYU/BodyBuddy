import {Text, View, Image,Dimensions, StyleSheet, ScrollView, TouchableOpacity, TouchableHighlight, TouchableWithoutFeedback, PanResponder} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Swiper from 'react-native-swiper';
import React, { useRef } from 'react';

import CourseCard from './courseCard';
const screenWidth = Dimensions.get('window').width;

function CommunityDetail({navigation}) {

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={{backgroundColor:'gray',height:300,width:"100%"}}>
                <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',padding:10}}>
                    <TouchableOpacity onPress={()=>navigation.goBack()}>
                        <MaterialCommunityIcons name="chevron-left" size={40} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
            {/* <ImageSlider /> */}
            <Text style={{color:'black',paddingHorizontal:26,paddingTop:16}}>
                锻炼后30分钟是运动恢复的绝佳时机，可参照以下建议来进行运动恢复
                {"\n"}
                    1.饮水补充:在运动后的30分钟内，补充身体所失去的水分是非常重要的。通过饮用适量的水或运动饮料，可以帮助补充体内的水分和电解质，并促进身体的水平衡恢复。{"\n"}
                    2.营养摄入:运动后的30分钟内，适当摄入营养是为肌肉恢复和修复提供能量和营养物质的关键时期。优先选择含有高质量蛋白质和碳水化合物的食物，如瘦肉、鸡蛋、全麦面包或水果等，以促进肌肉的修复和能量的恢复。{"\n"}
                    3.轻度拉伸和放松:进行适度的拉伸和放松活动可以帮助减少肌肉酸痛和僵硬感。重点关注运动所涉及的肌肉群，并进行缓慢而温和的拉伸动作，有助于恢复肌肉的弹性和灵活性。{"\n"}
            </Text>
            <CourseCard />
            <Text style={{alignSelf:'flex-start', fontSize:12,marginLeft:12,marginTop:-4,}}>发布于11月29日 22:00</Text>
            <View style={{height:1,width:"90%",backgroundColor:'rgba(220,220,220,0.8)',marginTop:10}}></View>
            <CommentCard />
            <CommentCard />
            <CommentCard />
        </ScrollView>
    )
}

const ImageSlider = ({ images }) => {
    return (
      <Swiper style={styles.wrapper} showsButtons={false} showsPagination={false}>
        {images.map((image, index) => (
          <View key={index} style={styles.slide}>
            <Image source={{ uri: image }} style={styles.image} />
          </View>
        ))}
      </Swiper>
    );
  };
const CommentCard = () => {
    return (
        <View style={{flexDirection:'row',width:'100%',height:80}}>
            <View style={{height:40,width:40,borderRadius:20,backgroundColor:'gray',margin:10}}></View>
            <View style={{flexDirection:'column',width:'76%'}}>
                <Text style={{marginTop:10}}>UserName</Text>
                <Text style={{color:'black'}}>点赞评论加关注，坚持打工不迷路</Text>
                <Text style={{fontSize:10}}>11月29日 22:31</Text>
            </View>
            <MaterialCommunityIcons name="heart-outline" size={15} style={{alignSelf:'flex-start', marginTop:16}} />
            {/* <MaterialCommunityIcons name="heart" color={'red'} size={15} style={{alignSelf:'flex-start', marginTop:16}} /> */}

        </View>
    );
};
const styles = StyleSheet.create({
    container:{
        justifyContent:'center',
        alignItems:'center',
    }
})

export default CommunityDetail;
