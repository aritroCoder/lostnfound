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
        <Stack.Screen name="Login - Lost&Found" options={{headerShown: false}} component={Login} />
        <Stack.Screen name="Signup - Lost&Found" options={{title: 'Sign Up', headerStyle: {
            backgroundColor: '#9BA17B',
          },
          headerTintColor: '#F8FFDB',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          }} component={Signup} />
        <Stack.Screen name="Feed" options={{headerShown: false}} component={Feed} />
        <Stack.Screen name="Post for Lost Item" options={{
          headerStyle: {
            backgroundColor: '#9BA17B',
          },
          headerTintColor: '#F8FFDB',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} component={PostforLostItem} />
        <Stack.Screen name="Post for Found Item" options={{
          headerStyle: {
            backgroundColor: '#9BA17B',
          },
          headerTintColor: '#F8FFDB',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} component={PostforFoundItem} />
        <Stack.Screen name="My Posts" options={{
          headerStyle: {
            backgroundColor: '#9BA17B',
          },
          headerTintColor: '#F8FFDB',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} component={MyPosts} />
        <Stack.Screen name="Update Password" options={{
          headerStyle: {
            backgroundColor: '#9BA17B',
          },
          headerTintColor: '#F8FFDB',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} component={UpdatePassword} />
        <Stack.Screen name='User Feed' options={{
          headerStyle: {
            backgroundColor: '#9BA17B',
          },
          headerTintColor: '#F8FFDB',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} component={UserFeed} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;



// keytool -genkeypair -v -storetype PKCS12 -keystore lostnfound.keystore -alias lostnfound -keyalg RSA -keysize 2048 -validity 10000         
// password for key generation: 'password'