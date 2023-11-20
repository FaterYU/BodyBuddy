import * as React from 'react';
// import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import CommunityScreen from './src/screen/community';
import FitScreen from './src/screen/fit';
import PersonScreen from './src/screen/person';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Community" component={CommunityScreen} />
        <Tab.Screen name="Fit" component={FitScreen} />
        <Tab.Screen name="Person" component={PersonScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
