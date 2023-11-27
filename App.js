import * as React from 'react';
// import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { NativeBaseProvider, Text, Box } from "native-base";
// import {MaterialCommunityIcons} from '@expo/vector-icons';
import CommunityScreen from './src/screen/community';
import FitScreen from './src/screen/fit';
import PersonScreen from './src/screen/person';

// const Tab = createBottomTabNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Tab.Navigator>
//         <Tab.Screen name="Community" component={CommunityScreen} />
//         <Tab.Screen name="Fit" component={FitScreen} />
//         <Tab.Screen name="Person" component={PersonScreen} />
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// }



const Tab = createBottomTabNavigator();

export default function MyTabs() {
  return (
    <NativeBaseProvider>
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="CommunityScreen"
        screenOptions={{
          headerShown: false, // 隐藏标题栏
          tabBarActiveTintColor: '#e91e63',
          
        }}
      >
        <Tab.Screen
          name="Community"
          component={CommunityScreen}
          options={{
            tabBarLabel: 'Community',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Fit"
          component={FitScreen}
          options={{
            tabBarLabel: 'Fit',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="calendar" color={color} size={size} />
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
    </NavigationContainer>
    </NativeBaseProvider>
  );
}