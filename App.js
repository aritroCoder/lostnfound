import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Custom Components
import Login from "./components/screens/Login";
import Signup from "./components/screens/Signup";
import LostFeed from "./components/screens/LostFeed";
import FoundFeed from "./components/screens/FoundFeed";
import PostforLostItem from "./components/screens/PostforLostItem";
import PostforFoundItem from "./components/screens/PostforFoundItem";
import MyPosts from "./components/screens/MyPosts";
import UpdatePassword from "./components/screens/UpdatePassword";
// import {decode, encode} from 'base-64'; if (!global.btoa) { global.btoa = encode; } if (!global.atob) { global.atob = decode; }

//constants Initailization
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login - Lost&Found">
        <Stack.Screen name="Login - Lost&Found" component={Login} />
        <Stack.Screen name="Signup - Lost&Found" component={Signup} />
        <Stack.Screen name="Lost Feed" component={LostFeed} />
        <Stack.Screen name="Found Feed" component={FoundFeed} />
        <Stack.Screen name="Post for Lost Item" component={PostforLostItem} />
        <Stack.Screen name="Post for Found Item" component={PostforFoundItem} />
        <Stack.Screen name="My Posts" component={MyPosts} />
        <Stack.Screen name="Update Password" component={UpdatePassword} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;