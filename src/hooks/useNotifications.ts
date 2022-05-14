import { useEffect } from 'react';
import notifee from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';

export async function onMessageReceived(remoteMessage: any) {
  await notifee.displayNotification(JSON.parse(remoteMessage.data.notifee));
}

export const useForegroundNotification = () => {
  useEffect(() => {
    const unsubscribe = messaging().onMessage(onMessageReceived);

    return unsubscribe;
  }, []);
};

export const registerBackgroundEventNotifee = () => {
  notifee.onBackgroundEvent(async ({ detail, type }) => {
    const { notification } = detail;
    console.log(notification, type);
    // await notifee.displayNotification(notification);
  });
};
