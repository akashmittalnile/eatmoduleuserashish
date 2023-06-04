import React, { useEffect, useState } from  'react' ;
import { createNativeStackNavigator} from '@react-navigation/native-stack'


import LearningHome from '../pages/Deal/Learning/LearningHome';
import LearningCentersList from '../pages/Deal/Learning/LearningCentersList';
import LearningTeachersList from '../pages/Deal/Learning/LearningTeachersList';
import LearningOnineStudyClasses from '../pages/Deal/Learning/LearningOnineStudyClasses';
import LearningTeacherDetails from '../pages/Deal/Learning/LearningTeacherDetails';
import LearningMessage from '../pages/Deal/Learning/LearningMessage';

const DealLearning=(props)=>{
   
    const Stack = createNativeStackNavigator();

    return(
       
           <Stack.Navigator
            screenOptions={{ headerShown:false,}}
             >
            <Stack.Screen component = {LearningHome} name="LearningHome" />
            <Stack.Screen component = {LearningCentersList} name="LearningCentersList" />
            <Stack.Screen component = {LearningTeachersList} name="LearningTeachersList" />
            <Stack.Screen component = {LearningOnineStudyClasses} name="LearningOnineStudyClasses" />
            <Stack.Screen component = {LearningTeacherDetails} name="LearningTeacherDetails" />
            <Stack.Screen component = {LearningMessage} name="LearningMessage" />
            

        </Stack.Navigator>

)
}




export default DealLearning