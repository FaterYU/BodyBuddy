import {Text, View, Dimensions, StyleSheet} from 'react-native';
import { SearchBar} from '@rneui/themed';
const screenWidth = Dimensions.get('window').width;

function CoursesScreen() {
  return (
    <View style={styles.container}>
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
              width: screenWidth-18,
            }}
            inputContainerStyle={{
              backgroundColor: 'rgba(220,220,220,0.4)',
              borderRadius:12,
              height:40,
            }}
            // onChangeText={updateSearch}
            // value={search}
          />
    </View>
  );
}

export default CoursesScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',

  },
})
