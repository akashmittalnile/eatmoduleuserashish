import React, { useEffect, useState } from  'react' ;
import { createNativeStackNavigator} from '@react-navigation/native-stack'


import ServiceHome from '../pages/Deal/Service/ServiceHome';
import ServiceProductList from '../pages/Deal/Service/ServiceProductList';
import ServiceProductDetail from '../pages/Deal/Service/ServiceProductDetail';
import ServiceMessages from '../pages/Deal/Service/ServiceMessages';
import ServiceCategories from '../pages/Deal/Service/ServiceCategories';
import ServiceCart from '../pages/Deal/Service/ServiceCart';
import ServiceBooking from '../pages/Deal/Service/ServiceBooking';

const ConnectDatingStack=(props)=>{
   
    const Stack = createNativeStackNavigator();

    return(
       
           <Stack.Navigator
            screenOptions={{ headerShown:false,}}
             >
            <Stack.Screen component = {ServiceHome} name="ServiceHome" />
            <Stack.Screen component = {ServiceProductList} name="ServiceProductList" />
            <Stack.Screen component = {ServiceProductDetail} name="ServiceProductDetail" />
            <Stack.Screen component = {ServiceMessages} name="ServiceMessages" />
            <Stack.Screen component = {ServiceCategories} name="ServiceCategories" />
            <Stack.Screen component = {ServiceCart} name="ServiceCart" />
            <Stack.Screen component = {ServiceBooking} name="ServiceBooking" />
            

        </Stack.Navigator>

)
}




export default ConnectDatingStack