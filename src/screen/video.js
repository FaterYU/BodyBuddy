import React, { useEffect } from 'react';
import {Text, View, Dimensions, StyleSheet, ScrollView, TouchableOpacity, TouchableHighlight, TouchableWithoutFeedback} from 'react-native';
import Orientation from 'react-native-orientation-locker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const VideoScreen = ({navigation}) => {
    useEffect(() => {
        // 设置为横屏
        Orientation.lockToLandscape();
    
        // 在组件卸载时重置为竖屏
        return () => {
          Orientation.lockToPortrait();
        };
      }, []); // 确保这个 effect 只在组件挂载和卸载时执行
    const goBack = () => {
        navigation.navigate('Courses');
    }
    return (
        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'row' }}>
            <View style={styles.video}>
                <TouchableOpacity onPress={goBack}>
                    <MaterialCommunityIcons name="chevron-left-circle" size={26} color="rgba(200,200,200,0.8)" style={{alignSelf:'flex-start',marginTop:14,marginLeft:14}} />
                </TouchableOpacity>
            </View>
            <View style={styles.sideCard}>
                <View style={styles.camera}>
                    <Text style={{color:'black'}}>用户摄像头界面</Text>
                </View>
                <View style={styles.score}>
                    <Text style={{color:'white',marginTop:30}}>当前评分</Text>
                    <Text style={{color:'white',fontSize:44,fontWeight:700}}>93</Text>
                    <Text style={{color:'white',marginBottom:30}}>继续保持</Text>
                </View>
            </View>


            {/* <Video 
                ref={ref = this.Video = ref}
                source={{uri: "url"}}  
                poster={"url"}
                paused={paused}
                onProgress={({currentTime}) => {}}
                onLoad={({duration}) => {}}
                onEnd={() => {}}
                resizeMode="cover"
                posterResizeMode="cover"
                style={style}
            /> */}
        </View>
    );
    }

const styles = StyleSheet.create({
    video: {
        height: '100%',
        backgroundColor: 'gray',
        width: '80%',
    },
    camera:{
        height: '50%',
        backgroundColor: 'rgba(200,200,200,0.8)',
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    sideCard:{
        height: '100%',
        width: '20%',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    score:{
        backgroundColor:'rgba(70,210,90,1)',
        width: '100%',
        height: '50%',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
    }
});

export default VideoScreen;
