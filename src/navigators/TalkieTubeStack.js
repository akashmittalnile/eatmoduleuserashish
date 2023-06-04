import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import NewsHome from '../pages/Talkie/Tube/NewsHome';
import NewsViewAll from '../pages/Talkie/Tube/NewsViewAll';
import CommentsScreen from '../pages/Talkie/Tube/CommentsScreen';
import NewsDetails from '../pages/Talkie/Tube/NewsDetails';
 

 
const TubeStack = (props) => {

    const Stack = createNativeStackNavigator();

    return (

        <Stack.Navigator
            screenOptions={{ headerShown: false, }}
        >
            <Stack.Screen component={NewsHome} name="NewsHome" />
            <Stack.Screen component={NewsViewAll} name="NewsViewAll" />
            <Stack.Screen component={CommentsScreen} name="CommentsScreen" />
            <Stack.Screen component={NewsDetails} name="NewsDetails" />
            

        </Stack.Navigator>

    )
};
export default TubeStack