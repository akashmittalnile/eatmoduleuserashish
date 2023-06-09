import messaging from '@react-native-firebase/messaging';
class FCMService {
  register = (
    onRegister,
    onNotification,
    onOpenNotification,
  ) => {
    this.checkPermission(onRegister);
    this.createNotificationListeners(
      onRegister,
      onNotification,
      onOpenNotification,
    );
  };
  // registerAppWithFCM = async () => {
  //   if (Platform.OS === 'ios') {
  //     await messaging().registerDeviceForRemoteMessages();
  //     await messaging().setAutoInitEnabled(true);
  //   }
  // };
  checkPermission = (onRegister) => {
    messaging()
      .hasPermission()
      .then((enabled) => {
        console.info('Permission :::', enabled);
        if (enabled === messaging.AuthorizationStatus.AUTHORIZED) {
          this.getToken(onRegister);
        } else {
          this.requestPermission(onRegister);
        }
      })
      .catch((err) => {
        this.checkPermission(onRegister);
        console.error('FCM Service : Permission rejected: ', err);
      });
  };
  getToken = (onRegister) => {
    messaging()
      .getToken()
      .then((fcmToken) => {
        if (fcmToken) {
          console.log('fcmToken====', fcmToken);
          onRegister(fcmToken);
        } else {
          console.debug('FCMService: user doesnot have the fcm token');
        }
      })
      .catch((err) => {
        console.error('FCMService: get token rejected: ', err);
      });
  };
  requestPermission = (onRegister) => {
    messaging()
      .requestPermission({sound: false, announcement: true})
      .then((res) => {
        if (res === 0) {
          console.debug('Notification permission denied:', res);
        } else {
          this.getToken(onRegister);
        }
      })
      .catch((error) => {
        console.error('FCMService: request permission rejected: ', error);
      });
  };
  deleteToken = () => {
    messaging()
      .deleteToken()
      .catch((error) => {
        console.error('FCMService: delete token rejected: ', error);
      });
  };
  createNotificationListeners = (
    onRegister,
    onNotification,
    onOpenNotification,
  ) => {
    // When the application is running, but in the background
    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.debug(
        'FCMService: When the application is running, but in the background: ',
        JSON.stringify(remoteMessage),
      );
      if (remoteMessage) {
        onOpenNotification(remoteMessage);
      }
    });
    // When the application is opened from a quit state
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.debug('remoteMessage', remoteMessage);
          onOpenNotification(remoteMessage);
        }
      });
    //Message handled in the background
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.debug('Message handled in the background!', remoteMessage);
      if (remoteMessage) {
        onNotification(remoteMessage);
      }
    });
    // Foreground state message
    this.messageListener = messaging().onMessage(async (remoteMessage) => {
      if (remoteMessage) {
        onNotification(remoteMessage);
      }
    });
    // Triggered when have new token
    messaging().onTokenRefresh((fcmToken) => {
      console.debug('FCMService: refreshed token: ', fcmToken);
      if (fcmToken) {
        onRegister(fcmToken);
      }
    });
  };
  unRegister = () => {
    this.messageListener;
  };
}
export const fcmService = new FCMService();