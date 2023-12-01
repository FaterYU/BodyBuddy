import * as React from 'react';
import { Text, View, TouchableWithoutFeedback } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { NativeBaseProvider } from "native-base";
import 'react-native-gesture-handler';
import CommunityScreen from './src/screen/community';
import CoursesScreen from './src/screen/courses';
import PersonScreen from './src/screen/person';
import CalendarScreen from './src/screen/calendar';
import VideoScreen from './src/screen/video';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="CommunityScreen"
      screenOptions={{
        headerShown: false, // 隐藏标题栏
        tabBarActiveTintColor: '#e91e63',
        scrollEnabled: true,
        animationEnabled: true,
      }}
    >
      <Tab.Screen
        name="Courses"
        component={CoursesScreen}
        options={({ route }) => ({
          tabBarLabel: 'Courses',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="human" color={color} size={size} />
          ),
        })}
      />
      <Tab.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          tabBarLabel: 'Calendar',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="calendar-month" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Community"
        component={CommunityScreen}
        options={{
          tabBarLabel: 'Community',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home-city" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Person"
        component={PersonScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function MyTabs() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="MainTabs"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="MainTabs" component={MainTabs} />
          <Stack.Screen name="VideoScreen" component={VideoScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
