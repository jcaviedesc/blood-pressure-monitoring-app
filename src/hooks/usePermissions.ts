import messaging from '@react-native-firebase/messaging';
import { useEffect } from 'react';

async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
}

export const useNotificationPermission = () => {
  useEffect(() => {
    requestUserPermission();
  }, []);
};
