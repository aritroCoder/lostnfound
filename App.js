import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Custom Components
import Login from "./components/screens/Login";
import Signup from "./components/screens/Signup";
import PostforLostItem from "./components/screens/PostforLostItem";
import PostforFoundItem from "./components/screens/PostforFoundItem";
import MyPosts from "./components/screens/MyPosts";
import UpdatePassword from "./components/screens/UpdatePassword";
import Feed from "./components/screens/Feed";
import UserFeed from "./components/screens/UserFeed";

//constants Initailization
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login - Lost&Found" >
        <Stack.Screen name="Login - Lost&Found" component={Login} />
        <Stack.Screen name="Signup - Lost&Found" component={Signup} />
        <Stack.Screen name="Feed" options={{headerShown: false}} component={Feed} />
        <Stack.Screen name="Post for Lost Item" component={PostforLostItem} />
        <Stack.Screen name="Post for Found Item" component={PostforFoundItem} />
        <Stack.Screen name="My Posts" component={MyPosts} />
        <Stack.Screen name="Update Password" component={UpdatePassword} />
        <Stack.Screen name='User Feed' component={UserFeed} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;