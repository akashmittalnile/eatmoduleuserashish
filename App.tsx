import React, { useEffect } from 'react';
import {SafeAreaView,LogBox,StatusBar,PermissionsAndroid,Platform,useColorScheme,View,} from 'react-native';
import MainNav from './src/navigators/MainNav'
import store from './src/redux/store/store';
import 'react-native-gesture-handler';
import 'react-native-get-random-values'
import {StripeProvider} from '@stripe/stripe-react-native';
import { NavigationContainer,DefaultTheme } from '@react-navigation/native'
import {Provider} from 'react-redux';
import messaging from '@react-native-firebase/messaging';
import { NotificationManagerAndroid } from './NotificationManagerAndroid';
import { NotificationManagerIOS } from './NotificationManagerIOS';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import { MenuProvider } from 'react-native-popup-menu';
// import NotificationManager from './NotificationManager';

const App = (props) => {
  LogBox.ignoreAllLogs()
  const toastConfig = {
    success: (props) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: '#ADC430',borderColor:'#ADC430',borderWidth:1,height:55,width:'90%' }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 12,
          fontWeight: '400',
        }}
        text1NumberOfLines={2}
        // text1NumberOfLines=2
        // text2Style={{
        //   fontSize: 15,
        //   fontWeight: '400'
          
        // }}
      />
    ),
    error: (props) => (
      <ErrorToast
        {...props}
        text1Style={{
          fontSize: 12
        }}
        text2Style={{
          fontSize: 12
        }}
      />
    ),
  };

  React.useEffect(() => {

   
        NotificationManagerAndroid.createChannel();
        NotificationManagerAndroid.configure();
    try {
      if(Platform.OS=='android'){
        requestUserPermission();
      }else{
        requestUserPermissionIos();
      }
      // PushNotificationIOS.getApplicationIconBadgeNumber(num => {
      //  console.log('the bedge number is===',num)
      // });
      const unsubscribe = messaging().onMessage(async remoteMessage => {
        JSON.stringify(remoteMessage.data);
        const { messageId } = remoteMessage;
        const data = remoteMessage.notification
        if (Platform.OS === 'android') {
          
          NotificationManagerAndroid.showNotification(data.title, data.body, data.subText, messageId, data);
        } 
        else {
           NotificationManagerIOS.showNotification(2, data.title, data.body, data, {})
        }
      });
      return unsubscribe;
    } catch (error) {
      console.log(error.message);
    }
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      const { data, messageId } = remoteMessage;
      const { Title, notificationText, subText } = data;
      if (Platform.OS === 'android') {
        NotificationManagerAndroid.showNotification(Title, notificationText, subText, messageId);
      } 
      else {
        console.log('hello hiii');
        
        NotificationManagerIOS.showNotification(messageId, Title, notificationText, data, {})

        // PushNotification.getApplicationIconBadgeNumber(badgeNumber => {
        //   PushNotificationIOS.setApplicationIconBadgeNumber(badgeNumber + 1)
        // })
       
      }
    });
   
  }, []);

  async function requestUserPermission() {
    const authorizationStatus = await messaging().requestPermission({
      sound: false,
      announcement: true,
    });
  }

  async function requestUserPermissionIos() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    
    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
    }

  return (
    <StripeProvider
    publishableKey="pk_test_4sjCZIFhfIeMDj3bpJsFapZf"
    urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
    merchantIdentifier="merchant.com.{{YOUR_APP_NAME}}" // required for Apple Pay
  >
    <Provider store={store} >
    <NavigationContainer theme={DefaultTheme}>
    {/* <NotificationManager /> */}
    <MenuProvider>
    <MainNav/>
    <Toast config={toastConfig}/>
    </MenuProvider>
   </NavigationContainer>
  </Provider>
  </StripeProvider>
  );
};

export default App;
