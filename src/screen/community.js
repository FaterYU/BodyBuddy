import React from 'react';
// import { Tab, Text, TabView } from '@rneui/themed';
// import { FlatList, View } from 'react-native';
import { Text, View, StyleSheet, ScrollView, FlatList, ActivityIndicator, Dimensions, TouchableOpacity } from 'react-native';
import { Input, Box, AspectRatio, Image, Center, Stack, Heading, HStack, Toast } from "native-base";
import { Tab, TabView, SearchBar } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';

const numColumns = 2
const screenWidth = Dimensions.get('window').width;

const data = [
  { id: '1', title: 'Item 1' },
  { id: '2', title: 'Item 2' },
  { id: '3', title: 'Item 3' },
  { id: '4', title: 'Item 4' },
  { id: '5', title: 'Item 5' },
  { id: '6', title: 'Item 6' },
  { id: '7', title: 'Item 7' },
  { id: '8', title: 'Item 8' },
  { id: '9', title: 'Item 9' },
  { id: '10', title: 'Item 10' },
];


export const WaterfallList = () => {
  const navigation = useNavigation();

  const HeaderComponent = () => (
    <View style={styles.headerComp}>
    </View>
  );
  const CardList = ({ item }) => {
    const marginTop = item.id % numColumns === 1 ? -30 : 8;
    const height = 260
    // const height = item.height

    return (
      <Box alignItems="center" style={[styles.cardList, { height, marginTop}]}>
        <TouchableOpacity onPress={() => navigation.navigate('CommunityDetailScreen')}>
          <Box style={styles.cardItem} maxW="80" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
            borderColor: "coolGray.600",
            backgroundColor: "gray.700"
          }} _web={{
            shadow: 2,
            borderWidth: 0
          }} _light={{
            backgroundColor: "gray.50"
          }}>
            <Box>
              <AspectRatio w="100%" ratio={16 / 9}>
                {/* <Image source={{
                uri: ""
              }} alt="image" /> */}
              </AspectRatio>

              <Center bg="violet.500" _dark={{
                bg: "violet.400"
              }} _text={{
                color: "warmGray.50",
                fontWeight: "700",
                fontSize: "xs"
              }} position="absolute" bottom="0" px="3" py="1.5">
                {item.title}
              </Center>
            </Box>
            <Stack p="4" space={3}>
              <Stack space={2}>
                <Heading size="md" ml="-1">
                  The Garden City
                </Heading>
              </Stack>
              <Text fontWeight="400">
                Bengaluru (also called Bangalore) is the center of India's high-tech
                industry.
              </Text>
              <HStack alignItems="center" space={4} justifyContent="space-between">
                <HStack alignItems="center">
                  <Text color="coolGray.600" _dark={{
                    color: "warmGray.200"
                  }} fontWeight="400">
                    6 mins ago
                  </Text>
                </HStack>
              </HStack>
            </Stack>
          </Box>
        </TouchableOpacity>
      </Box>
    )
  };

  return (
    <FlatList
      data={data}
      renderItem={CardList}
      keyExtractor={(item) => item.id.toString()}
      numColumns={numColumns}
      ListHeaderComponent={HeaderComponent}
      contentContainerStyle={styles.flatListContent}
    />
  );
};

const CommunityScreen = () => {
  const [index, setIndex] = React.useState(0);

  return (
    <>
      <View style={styles.container}>
        <SearchBar
          inputStyle={{
            fontSize: 16
          }}
          placeholder="Search Here..."
          round={true}
          lightTheme
          showCancel
          platform='android'
          containerStyle={{
            backgroundColor: 'rgba(1,1,1,0)',
            width: screenWidth - 20,
          }}
          inputContainerStyle={{
            backgroundColor: 'rgba(220,220,220,0.4)',
            borderRadius: 20,
            height: 40,
          }}
        // onChangeText={updateSearch}
        // value={search}
        />
        <View style={styles.nav}>
          <Tab
            value={index}
            onChange={(e) => setIndex(e)}
            indicatorStyle={{
              backgroundColor: 'blue',
              height: 2,
              width: '50%',
            }}
            variant="default"
            style={styles.tabContent}
          >
            <Tab.Item
              title="Recent"
              titleStyle={{ fontSize: 12 }}
              buttonStyle={styles.selectButton}
              icon={{ name: 'timer', type: 'ionicon', color: 'blue' }}
            />
            <Tab.Item
              title="favorite"
              titleStyle={{ fontSize: 12 }}
              buttonStyle={styles.selectButton}
              icon={{ name: 'heart', type: 'ionicon', color: 'blue' }}
            />
          </Tab>
        </View>
      </View>

      <TabView value={index} onChange={setIndex} animationType="spring">
        <TabView.Item style={{ backgroundColor: '#fff', width: '100%', alignItems: 'center' }}>
          <WaterfallList />
        </TabView.Item>
        <TabView.Item style={{ backgroundColor: '#fff', width: '100%', alignItems: 'center' }}>
          <WaterfallList />
        </TabView.Item>
      </TabView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  tabContent: {
    width: '50%',
    height: 46,
  },
  nav: {
    backgroundColor: 'white',
    justifyContent: "center",
    alignItems: "center",
  },
  selectButton: {
    display: 'flex',
    backgroundColor: 'white',
    height: 40,
  },
  flatListContent: {
    paddingTop: 34,
  },
  cardItem: {
    flex: 1,
    marginLeft: 4,
    marginRight: 4,
    borderRadius: 10,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
    width: screenWidth / numColumns - 20,
  },

});

export default CommunityScreen;
