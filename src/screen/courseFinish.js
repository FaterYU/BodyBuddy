import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {WaterfallList} from './community';

const screenWidth = Dimensions.get('window').width;

const CourseFinish = ({navigation, route}) => {
  const fitId = route.params.fitId;
  const score = Math.round(route.params.score * 100) / 100;
  const duration = route.params.duration;
  const goToHome = () => {
    navigation.navigate('Courses');
  };
  return (
    <>
      <FlatList
        contentContainerStyle={{alignItems: 'center'}}
        ListHeaderComponent={() => (
          <View
            style={{
              width: screenWidth + 20,
              elevation: 8,
              marginTop: -16,
              marginBottom: 36,
              paddingBottom: 14,
              borderBottomRightRadius: 24,
              borderBottomLeftRadius: 24,
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}>
            <MaterialCommunityIcons
              name="chevron-left-circle"
              size={34}
              style={{
                alignSelf: 'flex-start',
                marginTop: 22,
                marginLeft: 14,
                marginBottom: 20,
              }}
              color="rgba(190,190,190,0.8)"
              onPress={goToHome}
            />
            <Image
              source={require('../assets/icons/大拇哥.png')}
              style={{
                width: 280,
                height: 270,
                marginTop: -80,
                borderRadius: 40,
                marginBottom: 16,
                marginLeft: 8,
              }}
            />
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  fontSize: 40,
                  color: 'black',
                  fontWeight: 'bold',
                  marginTop: -80,
                }}>
                训练完成
              </Text>
              <Image
                source={require('../assets/icons/礼花哥.png')}
                style={{width: 36, height: 36, marginTop: -68, marginLeft: 10}}
              />
            </View>
            <View style={styles.trainData}>
              <View style={{flexDirection: 'column', alignItems: 'center'}}>
                <Text
                  style={{color: '#4969FF', fontWeight: '700', fontSize: 20}}>
                  平均得分
                </Text>
                <Text
                  style={{color: 'black', fontSize: 24, fontWeight: 'bold'}}>
                  {score}
                </Text>
              </View>
              <View
                style={{
                  height: 50,
                  width: 2,
                  backgroundColor: '#E4E4E4',
                }}></View>
              <View style={{flexDirection: 'column', alignItems: 'center'}}>
                <Text
                  style={{color: '#4969FF', fontWeight: '700', fontSize: 20}}>
                  训练时长
                </Text>
                <Text
                  style={{color: 'black', fontSize: 24, fontWeight: 'bold'}}>
                  {Math.floor(duration / 60)
                    .toString()
                    .padStart(2, '0') +
                    ':' +
                    Math.floor(duration % 60)
                      .toString()
                      .padStart(2, '0')}
                </Text>
              </View>
              <View
                style={{
                  height: 50,
                  width: 2,
                  backgroundColor: '#E4E4E4',
                }}></View>
              <View style={{flexDirection: 'column', alignItems: 'center'}}>
                <Text
                  style={{color: '#4969FF', fontWeight: '700', fontSize: 20}}>
                  连续天数
                </Text>
                <Text
                  style={{color: 'black', fontSize: 24, fontWeight: 'bold'}}>
                  2天
                </Text>
              </View>
            </View>
          </View>
        )}
        ListFooterComponent={() => (
          <View style={styles.waterfall}>
            <Text
              style={{
                marginTop: -20,
                marginBottom: 36,
                marginLeft: 10,
                color: 'black',
                fontWeight: '900',
                fontSize: 16,
              }}>
              社区精彩内容
            </Text>
            <WaterfallList tabIndex={0} />
          </View>
        )}
      />
    </>
  );
};

const styles = StyleSheet.create({
  trainData: {
    backgroundColor: 'rgba(236,236,236,1)',
    marginVertical: 12,
    width: screenWidth - 40,
    height: 90,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
});

export default CourseFinish;
