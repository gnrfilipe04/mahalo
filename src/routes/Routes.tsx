import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Login } from '../pages/Login'
import { Home } from '../pages/Home'

const Stack = createStackNavigator()

export function Routes (){
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Home' headerMode='none'>
                <Stack.Screen name='Login' component={Login} />
                <Stack.Screen name='Home' component={Home} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}