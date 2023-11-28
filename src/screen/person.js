// import {Text, View} from 'react-native';

// function PersonScreen() {
//   return (
//     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//       <Text>Person!</Text>
//     </View>
//   );
// }

// export default PersonScreen;

import React from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions } from 'react-native';
const numColumns = 2;
const screenWidth = Dimensions.get('window').width;

const generateData = () => {
  const data = [];
  for (let i = 1; i <= 20; i++) {
    const item = {
      id: i,
      title: `Item ${i}`,
      height: Math.floor(Math.random() * 100) + 200, // 随机生成高度
    };
    data.push(item);
  }
  return data;
};

const data = generateData();

const WaterfallList = () => {
  const renderItem = ({ item }) => (
    <View style={[styles.item, { height: item.height }]}>
      <Text style={styles.title}>{item.title}</Text>
    </View>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      numColumns={numColumns}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    flex: 1,
    margin: 8,
    borderRadius: 8,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default WaterfallList;
