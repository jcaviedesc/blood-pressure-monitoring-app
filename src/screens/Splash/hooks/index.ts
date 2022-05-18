import { useState, useEffect } from 'react';
import notifee from '@notifee/react-native';

export const useInitialNotificationLaunchApp = () => {
  const [loading, setLoading] = useState(true);

  // Bootstrap sequence function
  async function bootstrap() {
    const initialNotification = await notifee.getInitialNotification();

    if (initialNotification) {
      console.log('Notification caused application to open', initialNotification.notification);
      console.log('Press action used to open the app', initialNotification.pressAction);
    }
  }

  useEffect(() => {
    bootstrap()
      .then(() => setLoading(false))
      .catch(console.error);
  }, []);

  return loading;
};
