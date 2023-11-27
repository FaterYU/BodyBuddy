import React from 'react';
import { View, Text, ScrollView } from 'react-native';

const App = () => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.nav}>
          <Text style={styles.navText}>推荐</Text>
          <Text style={styles.navText}>会员</Text>
          <Text style={styles.navText}>活动</Text>
        </View>
        <View style={styles.searchbar}>
          <Text>search bar</Text>
        </View>

        <ScrollScreen />

        <View style={styles.cards1}>
          <Text>全部课程</Text>
          <Text>练计划</Text>
        </View>
        <View style={styles.cards2}>
          <Text>正在直播</Text>
          <Text>赛事</Text>
        </View>
      </View>
    </View>
  );
};
const ScrollScreen = () => {
  return (
    <ScrollView horizontal style={styles.topBut}>
      <Text style={styles.topButText}>跑步</Text>
      <Text style={styles.topButText}>行走</Text>
      <Text style={styles.topButText}>全身燃脂</Text>
      <Text style={styles.topButText}>马拉松</Text>
      <Text style={styles.topButText}>腰腹训练</Text>
      <Text style={styles.topButText}>臀推训练</Text>
  </ScrollView>
  );
}
const styles = {
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },

};

export default App;
