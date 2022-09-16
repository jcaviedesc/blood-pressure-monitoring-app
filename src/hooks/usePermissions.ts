import messaging from '@react-native-firebase/messaging';
import Notifee, {
  AndroidNotificationSetting,
  EventType,
} from '@notifee/react-native';
import crashlytics from '@react-native-firebase/crashlytics';
import { useEffect } from 'react';

async function requestUserPermission() {
  // notifications permissions
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    const defautChannel = await Notifee.getChannel('default');
    if (!defautChannel) {
      // Create default channel if not exits (required for Android)
      await Notifee.createChannel({
        id: 'messages',
        name: 'messages',
      });
      // TODO log
    }

    Notifee.onForegroundEvent(({ type, detail }) => {
      if (type === EventType.ACTION_PRESS && detail?.pressAction?.id) {
        console.log('detail', detail);
        console.log('User pressed an action with the id: ', detail.pressAction);
      }
    });

    console.log('Authorization status:', authStatus);
  } else {
    crashlytics().log(`Notification permissions rejected ${authStatus}`);
  }
}

export const useNotificationPermission = () => {
  useEffect(() => {
    requestUserPermission();
  }, []);
};

export const useGetNotificationSettingsPermission = () => {
  useEffect(() => {
    const getSettings = async () => {
      const settings = await Notifee.getNotificationSettings();
      if (settings.android.alarm === AndroidNotificationSetting.ENABLED) {
        //Create timestamp trigger
      } else {
        // Show some user information to educate them on what exact alarm permission is,
        // and why it is necessary for your app functionality, then send them to system preferences:
        await Notifee.openAlarmPermissionSettings();
      }
    };

    getSettings();
  }, []);
};
