import { useEffect } from 'react';
import notifee from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';

export function onMessageReceived(remoteMessage: any) {
  console.log(JSON.parse(remoteMessage.data.notifee));
  notifee.displayNotification(JSON.parse(remoteMessage.data.notifee));
}

export const useForegroundNotification = () => {
  useEffect(() => {
    const unsubscribe = messaging().onMessage(onMessageReceived);
    return unsubscribe;
  }, []);
};

export const registerBackgroundEventNotifee = () => {
  notifee.onBackgroundEvent(async ({ detail }) => {
    const { notification } = detail;
    if (notification) {
      await notifee.displayNotification(notification);
    }
  });
};
