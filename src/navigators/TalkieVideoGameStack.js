import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import VideoGameHome from '../pages/Talkie/VideoGame/VideoGameHome';
import VideoNewsfeed from '../pages/Talkie/VideoGame/VideoNewsfeed';
import VideoUpload from '../pages/Talkie/VideoGame/VideoUpload';
import VideoGamedetails from '../pages/Talkie/VideoGame/VideoGamedetails';

 

 
const VideoGameStack = (props) => {

    const Stack = createNativeStackNavigator();

    return (

        <Stack.Navigator
            screenOptions={{ headerShown: false, }}
        >
            <Stack.Screen component={VideoGameHome} name="VideoGameHome" />
            <Stack.Screen component={VideoGamedetails} name="VideoGamedetails" />
            <Stack.Screen component={VideoNewsfeed} name="VideoNewsfeed" />
            <Stack.Screen component={VideoUpload} name="VideoUpload" />
            

        </Stack.Navigator>

    )
};
export default VideoGameStack