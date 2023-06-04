import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DrawerNav from './DrawerNav';
import AuthNav from './AuthNav'
import Splash from './Splash';
import WeelStack from './WeelStack';
import {View ,StyleSheet,ActivityIndicator,SafeAreaView,Alert,ImageBackground ,Text, Platform} from 'react-native';
import {  useSelector, useDispatch } from 'react-redux';
import { setLoading,saveUserResult} from '../redux/actions/user_action';
import messaging from '@react-native-firebase/messaging';
import {setNotificationData,setNotify,setDeviceToken} from '../redux/actions/latLongAction';
// import firestore from '@react-native-firebase/firestore'
import SplashScreen from 'react-native-splash-screen'

    const MainNav =() => {
     const [showSplash , setShowSplash ]  = useState(true);
    const dispatch =  useDispatch();
    const isSignedIn  = useSelector(state => state.user.user_details)
     const getAllValues = async() => {
        const user = await AsyncStorage.getItem("kinengo");
         SplashScreen.hide();
         setShowSplash(false);
        dispatch(saveUserResult(JSON.parse(user)))
    }
    useEffect(()=> { 
       
      
     //  messaging().setAutoInitEnabled(true)
        gettoken()
 //  getToken()
        const timeout = setTimeout(async () => {
            getAllValues();
              },3000);  
    },[]);


    const gettoken = async () => {       
        //  await messaging().registerDeviceForRemoteMessages();
         const token = await messaging().getToken();
         console.log('Token==>>',token);
         dispatch(setDeviceToken(token))
        };
 
       

    if(showSplash){
        return <Splash /> 
    }
   

    return (
        isSignedIn ?
        (
            // <DrawerNav />
            <WeelStack />
        )
    :
        (
         
             <AuthNav />
            
         
        )
    )
}
export default MainNav ;