import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import UpdatePassword from './UpdatePassword';
import MyPosts from './MyPosts';

const Tab = createBottomTabNavigator();

export default function App({ navigation }) {
  return (
      <Tab.Navigator screenOptions={({ route })=>({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Lost') {
            iconName = focused
              ? 'ios-information-circle'
              : 'ios-information-circle-outline';
          } else if (route.name === 'Found') {
            iconName = focused ? 'ios-list-box' : 'ios-list';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        }
      })}>
        <Tab.Screen name="Update Password" component={UpdatePassword} />
        <Tab.Screen name="My Posts" component={MyPosts} />
      </Tab.Navigator>
  );
}