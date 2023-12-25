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
    navigation.navigate('Courses', {reload: true});
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
              paddingTop: 34,
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
                marginTop: -70,
                borderRadius: 40,
                marginBottom: 16,
                marginLeft: 8,
              }}
            />
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  fontSize: 34,
                  color: 'black',
                  fontWeight: 'bold',
                  marginTop: -80,
                  marginLeft: 10,
                }}>
                Training Finshed!
              </Text>
              <Image
                source={require('../assets/icons/礼花哥.png')}
                style={{width: 32, height: 32, marginTop: -74, marginLeft: 10}}
              />
            </View>
            <View style={styles.trainData}>
              <View style={{flexDirection: 'column', alignItems: 'center'}}>
                <Text
                  style={{color: '#4969FF', fontWeight: '700', fontSize: 20}}>
                  Score
                </Text>
                <Text
                  style={{color: 'black', fontSize: 22, fontWeight: 'bold'}}>
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
                  Duration
                </Text>
                <Text
                  style={{color: 'black', fontSize: 22, fontWeight: 'bold'}}>
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
                  Days
                </Text>
                <Text
                  style={{color: 'black', fontSize: 22, fontWeight: 'bold'}}>
                  2 Days
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
                marginBottom: 10,
                marginLeft: 10,
                color: 'black',
                fontWeight: '900',
                fontSize: 16,
              }}>
              Community Reconmended
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
  waterfall: {
    flex: 1,
    width: screenWidth,
  },
});

export default CourseFinish;
