import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect} from 'react';
// import {fcmService} from './service/FCMService';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
export default function NotificationManager() {
  useEffect(() => {
     fcmService.register(onRegister, onNotification, onOpenNotification);
    fcmService.requestPermission(onRegister);
    async function onRegister(token) {
      await AsyncStorage.setItem('fcmToken', token);
    }
    async function onNotification(notify) {
      PushNotificationIOS.requestPermissions({
        alert: true,
        badge: true,
        sound: true,
        critical: true,
      }).then(
        (data) => {
          PushNotificationIOS.addNotificationRequest({
            id: notify.messageId,
            body: notify.notification.body,
            title: notify.notification.title,
          });
          console.log('PushNotificationIOS.requestPermissions', data);
        },
        (data) => {
          console.log('PushNotificationIOS.requestPermissions failed', data);
        },
      );
    }
    async function onOpenNotification(notify) {
      //
    }
    return () => {
      fcmService.unRegister();
    };
  });
  return null;
}