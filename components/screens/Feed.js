import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass'
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons/faSquareCheck'

import LostFeed from "./LostFeed";
import FoundFeed from "./FoundFeed";

const Tab = createBottomTabNavigator();

export default function App({ navigation }) {
  return (
      <Tab.Navigator screenOptions={({ route })=>({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          return <FontAwesomeIcon icon={ route.name==='Lost Feed'?faMagnifyingGlass:faSquareCheck } color={focused?"#61764B":"#9BA17B"}/>;
        },
        tabBarActiveTintColor: '#61764B',
        tabBarInactiveTintColor: '#9BA17B',
      })
    }
      >
        <Tab.Screen name="Lost Feed" component={LostFeed} />
        <Tab.Screen name="Found Feed" component={FoundFeed} />
      </Tab.Navigator>
  );
}