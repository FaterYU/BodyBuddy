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
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {WaterfallList} from './community';

const screenWidth = Dimensions.get('window').width;

const CourseFinish = ({navigation}) => {
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
            <Text style={{fontSize: 40, color: 'black', fontWeight: 'bold'}}>
              训练完成
            </Text>
            <View style={styles.trainData}>
              <View style={{flexDirection: 'column', alignItems: 'center'}}>
                <Text
                  style={{color: '#4969FF', fontWeight: '700', fontSize: 20}}>
                  平均得分
                </Text>
                <Text
                  style={{color: 'black', fontSize: 24, fontWeight: 'bold'}}>
                  95
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
                  23:59
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
