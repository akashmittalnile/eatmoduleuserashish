import React, { useEffect, useState } from  'react' ;
import { createNativeStackNavigator} from '@react-navigation/native-stack'


import Shop from '../pages/Shop/Shop';
import ShopEat from '../pages/Shop/ShopEat/ShopEat';
import FoodDetails from '../pages/Shop/ShopEat/FoodDetails';
import ShopMyOrder from '../pages/Shop/ShopEat/ShopMyOrder';
import ShopReview from '../pages/Shop/ShopEat/ShopReview';
import ShopPayment from '../pages/Shop/ShopEat/ShopPayment';
import ShopCart from '../pages/Shop/ShopEat/ShopCart';
import ShopSearch from '../pages/Shop/ShopEat/ShopSearch';
import ShopEatFilter from '../pages/Shop/ShopEat/ShopEatFilter';
import CatSearch from '../pages/Shop/ShopEat/CatSearch';
import DiningAndBookTable from '../pages/Shop/ShopEat/DiningAndBookTable';
import Traking from '../pages/Shop/ShopEat/Traking';
import ShopMyOrderDetails from '../pages/Shop/ShopEat/ShopMyOrderDetails';
import ShopEatNotificationList from '../pages/Shop/ShopEat/ShopEatNotificationList'
import Chat from '../pages/Shop/ShopEat/Chat';
const ShopEatStack=(props)=>{
   
    const Stack = createNativeStackNavigator();

    return(
           <Stack.Navigator
            screenOptions={{ headerShown:false,gestureEnabled: false}}
             >
            <Stack.Screen component = {ShopEat} name="ShopEat" />
            <Stack.Screen component = {FoodDetails} name="FoodDetails" />
            <Stack.Screen component = {ShopMyOrder} name="ShopMyOrder" />
            <Stack.Screen component = {ShopReview} name="ShopReview" />
            <Stack.Screen component = {ShopPayment} name="ShopPayment" />
            <Stack.Screen component = {ShopCart} name="ShopCart" />
            <Stack.Screen component = {ShopSearch} name="ShopSearch" />
            <Stack.Screen component = {ShopEatFilter} name="ShopEatFilter" />
            <Stack.Screen component = {CatSearch} name="CatSearch" />
            <Stack.Screen component = {DiningAndBookTable} name="DiningAndBookTable" />
            <Stack.Screen component = {Shop} name="Shop" />
            <Stack.Screen component = {Traking} name="Traking" />
            <Stack.Screen component = {ShopMyOrderDetails} name="ShopMyOrderDetails" />
            <Stack.Screen component = {ShopEatNotificationList} name="ShopEatNotificationList" />
            <Stack.Screen component = {Chat} name="Chat" />

        </Stack.Navigator>

)
}




export default ShopEatStack