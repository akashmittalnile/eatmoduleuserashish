import React, { useEffect, useState } from  'react' ;
import { createNativeStackNavigator} from '@react-navigation/native-stack'


import DatingHome from '../pages/Connect/Dating/DatingHome';
import DatingSelection from '../pages/Connect/Dating/DatingSelection';
import DatingMessages from '../pages/Connect/Dating/DatingMessages';
import DatingChat from '../pages/Connect/Dating/DatingChat';
import DatingProfile from '../pages/Connect/Dating/DatingProfile';
import DatingEditProfile from '../pages/Connect/Dating/DatingEditProfile';
import DatingMoreInfo from '../pages/Connect/Dating/DatingMoreInfo';
import DatingYourMatches from '../pages/Connect/Dating/DatingYourMatches';

const ConnectDatingStack=(props)=>{
   
    const Stack = createNativeStackNavigator();

    return(
       
           <Stack.Navigator
            screenOptions={{ headerShown:false,}}
             >
            <Stack.Screen component = {DatingHome} name="DatingHome" />
            <Stack.Screen component = {DatingSelection} name="DatingSelection" />
            <Stack.Screen component = {DatingMessages} name="DatingMessages" />
            <Stack.Screen component = {DatingChat} name="DatingChat" />
            <Stack.Screen component = {DatingProfile} name="DatingProfile" />
            <Stack.Screen component = {DatingEditProfile} name="DatingEditProfile" />
            <Stack.Screen component = {DatingMoreInfo} name="DatingMoreInfo" />
            <Stack.Screen component = {DatingYourMatches} name="DatingYourMatches" />
            

        </Stack.Navigator>

)
}




export default ConnectDatingStack