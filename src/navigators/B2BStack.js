import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import B2B from '../pages/Deal/B2b/B2b';
import CarDetails from '../pages/Deal/B2b/CarDetails';
import DatingChat from '../pages/Deal/B2b/DatingChat';
import ShopPayment from '../pages/Shop/ShopEat/ShopPayment';
import B2BCart from '../pages/Deal/B2b/B2BCart';
import B2BBecomeSellerChoosePlan from '../pages/Deal/B2b/B2bBecomeSellerChoosePlan';
import B2BBecomeSeller from '../pages/Deal/B2b/B2bBecomeSeller';
import B2BSeller from '../pages/Deal/B2b/B2bSeller';
import B2BUserProfile from '../pages/Deal/B2b/B2BUserProfile';
import CreatePostAds from '../pages/Deal/B2b/CreatePostAds';

const B2BStack = (props) => {

    const Stack = createNativeStackNavigator();

    return (

        <Stack.Navigator
            screenOptions={{ headerShown: false, }}
        >
            <Stack.Screen component={B2B} name="B2B" />
            <Stack.Screen component={B2BBecomeSeller} name="B2bBecomeSeller" />
            <Stack.Screen component={B2BBecomeSellerChoosePlan} name="B2bBecomeSellerChoosePlan" />
            <Stack.Screen component={B2BCart} name="B2BCart" />
            {/* <Stack.Screen component={B2BEditProfile} name="B2BEditProfile" /> */}
            <Stack.Screen component={B2BSeller} name="B2bSeller" />
            <Stack.Screen component={B2BUserProfile} name="B2BUserProfile" />
            <Stack.Screen component={CreatePostAds} name="CreatePostAds" />
            <Stack.Screen component={CarDetails} name="CarDetails" />
            <Stack.Screen component={DatingChat} name="DatingChat" />
            <Stack.Screen component={B2BCart} name="B2BCart"/>
            <Stack.Screen component = {ShopPayment} name="ShopPayment" />

        </Stack.Navigator>

    )
};
export default B2BStack