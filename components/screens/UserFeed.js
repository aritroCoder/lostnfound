import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faKey } from '@fortawesome/free-solid-svg-icons/faKey'
import { faSignsPost } from '@fortawesome/free-solid-svg-icons/faSignsPost'

import UpdatePassword from './UpdatePassword';
import MyPosts from './MyPosts';

const Tab = createBottomTabNavigator();

export default function App({ navigation }) {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === 'Update Password') {
          iconName = faKey;
        } else if (route.name === "My Posts") {
          iconName = faSignsPost;
        }
        return <FontAwesomeIcon icon={iconName} color={focused?"#61764B":"#9BA17B"}/>;
      },
      
      tabBarActiveTintColor: '#61764B',
      tabBarInactiveTintColor: '#9BA17B',
    })}>
      <Tab.Screen name="Update Password" component={UpdatePassword} />
      <Tab.Screen name="My Posts" component={MyPosts} />
    </Tab.Navigator>
  );
}