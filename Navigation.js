import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import ChatList from './screens/ChatList';
import SearchList from './screens/SearchList';

const Stack = createStackNavigator();

const Navigation = () => {


    return(
      <NavigationContainer>
      <Stack.Navigator initialRouteName="Login"
        screenOptions={{headerShown:false}}>

      <Stack.Screen
        name="Login"
        component={Login}
      />
      
      <Stack.Screen
        name="SearchList"
        component={SearchList}
      />



            <Stack.Screen
        name="ChatList"
        component={ChatList}
      />

<Stack.Screen
        name="SignUp"
        component={SignUp}
      />

            </Stack.Navigator>
</NavigationContainer>

    )}

    export default Navigation