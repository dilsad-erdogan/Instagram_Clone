import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'

// Sayfalar
import Login from '../pages/Login'
import Register from '../pages/Register'
import MainPage from '../pages/Main'
import Profile from '../pages/Profile'

export type RootStackParamList = {
    Login: undefined;
    Register: undefined;
    Main: undefined;
    Profile: undefined;
}

const Stack = createStackNavigator<RootStackParamList>()

const AppNavigator = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Main" component={MainPage} />
            <Stack.Screen name="Profile" component={Profile} />
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigator