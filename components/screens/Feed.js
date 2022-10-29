import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import LostFeed from "./LostFeed";
import FoundFeed from "./FoundFeed";

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
        <Tab.Screen name="Lost Feed" component={LostFeed} />
        <Tab.Screen name="Found Feed" component={FoundFeed} />
      </Tab.Navigator>
  );
}