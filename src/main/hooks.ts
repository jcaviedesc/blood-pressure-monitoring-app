import { useState, useEffect } from 'react';
import notifee from '@notifee/react-native';
import type { RootStackParamList } from '../router/types';

type InitialScreenApp = {
  loading: boolean;
  nextScreen: keyof RootStackParamList;
};

export const useInitialScreenApp = () => {
  const [mainScreenState, setMainScreenState] = useState<InitialScreenApp>({
    loading: true,
    nextScreen: 'Home',
  });

  // Bootstrap sequence function
  async function bootstrap(): Promise<{ [key: string]: string }> {
    const initialNotification = await notifee.getInitialNotification();

    if (initialNotification) {
      const { data = {} } = initialNotification.notification;
      console.log('Notification caused application to open', initialNotification.notification);
      console.log('Press action used to open the app', initialNotification.pressAction);
      // todo change resolve
      const mergeData = { navigateTo: 'Home', ...data };
      return Promise.resolve(mergeData);
    }

    return Promise.resolve({ navigateTo: 'Home' });
  }

  useEffect(() => {
    const onNextScreen = (data) => {
      const { navigateTo } = data;
      let screen = navigateTo;
      setMainScreenState({ loading: false, nextScreen: screen });
    };

    bootstrap().then(onNextScreen).catch(console.error);
  }, []);

  return mainScreenState;
};
