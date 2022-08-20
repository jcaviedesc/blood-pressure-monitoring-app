import { useState, useEffect } from 'react';
import notifee from '@notifee/react-native';
import crashlytics from '@react-native-firebase/crashlytics';

import type { RootStackParamList } from '../router/types';

type InitialScreenApp = {
  loading: boolean;
  nextScreen: keyof RootStackParamList;
};

export const useInitialScreenApp = () => {
  const [mainScreenState, setMainScreenState] = useState<InitialScreenApp>({
    loading: true,
    nextScreen: 'HomeTabs',
  });

  // Bootstrap sequence function
  async function bootstrap(): Promise<{ [key: string]: string }> {
    const initialNotification = await notifee.getInitialNotification();

    if (initialNotification) {
      const { data = {} } = initialNotification.notification;
      // TODO impplement google analitycs
      console.log(
        'Notification caused application to open',
        initialNotification.notification,
      );
      console.log(
        'Press action used to open the app',
        initialNotification.pressAction,
      );
      // todo change resolve
      const mergeData = { navigateTo: 'HomeTabs', ...data };
      return Promise.resolve(mergeData);
    }

    return Promise.resolve({ navigateTo: 'HomeTabs' });
  }

  useEffect(() => {
    const onNextScreen = (data) => {
      const { navigateTo } = data;
      let screen = navigateTo;
      setMainScreenState({ loading: false, nextScreen: screen });
    };

    bootstrap()
      .then(onNextScreen)
      .catch(error => {
        crashlytics().recordError(error);
        onNextScreen({ navigateTo: 'HomeTabs' });
      });
  }, []);

  return mainScreenState;
};
