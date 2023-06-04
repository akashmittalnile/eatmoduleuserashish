import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

 
import MovieHome from '../pages/Talkie/Movie/MovieHome';
import MovieDetails from '../pages/Talkie/Movie/MovieDetails';
import MovieNewsfeed from '../pages/Talkie/Movie/MovieNewsfeed';
import UploadMovie from '../pages/Talkie/Movie/UploadMovie';

const MovieStack = (props) => {

    const Stack = createNativeStackNavigator();

    return (

        <Stack.Navigator
            screenOptions={{ headerShown: false, }}
        >
            <Stack.Screen component={MovieHome} name="MovieHome" />
            <Stack.Screen component={MovieDetails} name="MovieDetails" />
            <Stack.Screen component={MovieNewsfeed} name="MovieNewsfeed" />
            <Stack.Screen component={UploadMovie} name="UploadMovie" />
            

        </Stack.Navigator>

    )
};
export default MovieStack