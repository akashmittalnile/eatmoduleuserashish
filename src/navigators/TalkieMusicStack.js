import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import MusicHome from '../pages/Talkie/Music/MusicHome';
import MusicPlayScreen from '../pages/Talkie/Music/MusicPlayScreen';
import SingerMusicListScreen from '../pages/Talkie/Music/SingerMusicListScreen';
import UploadMusic from '../pages/Talkie/Music/UploadMusic';
import MusicNewsfeed from '../pages/Talkie/Music/MusicNewsfeed';
import MusicCommentsScreen from '../pages/Talkie/Music/MusicCommentsScreen';

 
const MusicStack = (props) => {

    const Stack = createNativeStackNavigator();

    return (

        <Stack.Navigator
            screenOptions={{ headerShown: false, }}
        >
            <Stack.Screen component={MusicHome} name="MusicHome" />
            <Stack.Screen component={MusicPlayScreen} name="MusicPlayScreen" />
            <Stack.Screen component={MusicCommentsScreen} name="MusicCommentsScreen" />
            <Stack.Screen component={MusicNewsfeed} name="MusicNewsfeed" />
            <Stack.Screen component={SingerMusicListScreen} name="SingerMusicListScreen" />
            <Stack.Screen component={UploadMusic} name="UploadMusic" />
            

        </Stack.Navigator>

    )
};
export default MusicStack