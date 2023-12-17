import * as React from 'react';
import {Text, View, TouchableWithoutFeedback} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import { MMKV } from 'react-native-mmkv'
import { MMKVLoader, useMMKVStorage } from "react-native-mmkv-storage";
import { SvgXml } from 'react-native-svg';


import {NativeBaseProvider} from 'native-base';
import 'react-native-gesture-handler';
import CommunityScreen from './src/screen/community';
import CoursesScreen from './src/screen/courses';
import PersonScreen from './src/screen/person';
import CalendarScreen from './src/screen/calendar';
import VideoScreen from './src/screen/video';
import DetailsScreen from './src/screen/course_details';
import CommunityDetailScreen from './src/screen/CommunityDetail';
import CourseFinish from './src/screen/courseFinish';
import PublishScreen from './src/screen/publish';
import LoginScreen from './src/screen/LoginScreen';
import FollowingScreen from './src/screen/FollowingScreen';
import FollowersScreen from './src/screen/FollowersScreen';
import SearchScreen from './src/screen/search';
import RegisterScreen from './src/screen/register';
import PersonDetails from './src/screen/person_details';
import { couresesActiveSvg,couresesInactiveSvg, calendarInactiveSvg, calendarActiveSvg, communityInactiveSvg, communityActiveSvg, profileInactiveSvg, profileActiveSvg } from './src/components/barSvgCode'

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
// export const storage = new MMKV({
//   id: `user-${userId}-storage`,
//   path: `${USER_DIRECTORY}/storage`,
//   encryptionKey: 'hunter2'
// })
// export const storage = new MMKV()
export const MMKV = new MMKVLoader().initialize();

const MainTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="CommunityScreen"
      screenOptions={{
        headerShown: false, // 隐藏标题栏
        tabBarActiveTintColor: '#4969ff',
        scrollEnabled: true,
        animationEnabled: true,
      }}>
      <Tab.Screen
        name="Courses"
        component={CoursesScreen}
        options={({route}) => ({
          tabBarLabel: 'Courses',
          tabBarIcon: ({focused}) => (
            focused ? <SvgXml xml={couresesActiveSvg} width="60%" height="60%" /> : <SvgXml xml={couresesInactiveSvg} width="75%" height="75%" />
          ),
        })}
      />
      <Tab.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          tabBarLabel: 'Calendar',
          tabBarIcon: ({focused}) => (
            focused ? <SvgXml xml={calendarActiveSvg} width="70%" height="70%" /> : <SvgXml xml={calendarInactiveSvg} width="70%" height="70%" />
          ),
        }}
      />
      <Tab.Screen
        name="Community"
        component={CommunityScreen}
        options={{
          tabBarLabel: 'Community',
          tabBarIcon: ({focused}) => (
            focused ? <SvgXml xml={communityActiveSvg} width="70%" height="70%" /> : <SvgXml xml={communityInactiveSvg} width="70%" height="70%" />
          ),
        }}
      />
      <Tab.Screen
        name="Person"
        component={PersonScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({focused}) => (
            focused ? <SvgXml xml={profileActiveSvg} width="60%" height="60%" /> : <SvgXml xml={profileInactiveSvg} width="60%" height="60%" />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default function MyTabs() {
  React.useEffect(() => {
    const initializeMMKV = async () => {
      await MMKV.setIntAsync('userId', 0);
      const result = await MMKV.getIntAsync('userId');
      console.log(result);
    }
    initializeMMKV();
  }
  , []);
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="MainTabs"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="MainTabs" component={MainTabs} />
          <Stack.Screen name="VideoScreen" component={VideoScreen} />
          <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
          <Stack.Screen
            name="CommunityDetailScreen"
            component={CommunityDetailScreen}
          />
          <Stack.Screen name="CourseFinish" component={CourseFinish} />
          <Stack.Screen name="PublishScreen" component={PublishScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="FollowingScreen" component={FollowingScreen} />
          <Stack.Screen name="FollowersScreen" component={FollowersScreen} />
          <Stack.Screen name="SearchScreen" component={SearchScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen name="PersonDetails" component={PersonDetails} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
