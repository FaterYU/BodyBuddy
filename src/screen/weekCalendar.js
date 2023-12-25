import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';

const SevenDaysCalendar = () => {
  // 获取当前日期
  // const weekName = ['日', '一', '二', '三', '四', '五', '六'];
  const weekName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const currentDate = new Date();
  // 获取本周的日期
  const currentWeek = Array.from({length: 7}, (_, index) => {
    const day = new Date();
    day.setDate(currentDate.getDate() - currentDate.getDay() + index);
    return day;
  });

  const isToday = date => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const renderItem = ({item}) => (
    <View>
      <Text style={{textAlign: 'center', marginBottom: 10, marginTop: 10, color:"gray"}}>
        {weekName[item.getDay()]}
      </Text>
      <View
        style={[
          styles.dayContainer,
          isToday(item) && {
            backgroundColor: '#4969ff',
            borderColor: '#4969ff',
            borderWidth: 2,
          },
        ]}>
        <Text style={[styles.dayText, isToday(item) && {color: 'white'}]}>
          {item.getDate()}
        </Text>
        {/* 在这里可以添加其他日期相关的内容 */}
      </View>
    </View>
  );

  return (
    <FlatList
      data={currentWeek}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={item => item.toISOString()}
      renderItem={renderItem}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 1,
  },
  dayContainer: {
    backgroundColor: '#eaeaea',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 6,
    width: 40,
    height: 40,
    borderRadius: 10,
    marginBottom: 5,
  },
  dayText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SevenDaysCalendar;
