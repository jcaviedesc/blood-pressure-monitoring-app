import { useState, useEffect, useContext, useCallback } from 'react';
import notifee from '@notifee/react-native';
import crashlytics from '@react-native-firebase/crashlytics';
import Realm from 'realm';
import { useApp, useUser } from '@realm/react';

import type { RootStackParamList } from '../router/types';
import { MainAppContext } from './context';
import { parseError } from '../services/ErrorUtils';

type InitialScreenApp = {
  loading: boolean;
  nextScreen: keyof RootStackParamList;
};

export const useInitialScreenApp = () => {
  const [mainScreenState, setMainScreenState] = useState<InitialScreenApp>({
    loading: true,
    nextScreen: 'Summary',
  });

  // Bootstrap sequence function
  async function bootstrap(): Promise<{ [key: string]: string }> {
    const initialNotification = await notifee.getInitialNotification();

    if (initialNotification) {
      const { data = {} } = initialNotification.notification;
      // TODO implement google analitycs
      console.log(
        'Notification caused application to open',
        initialNotification.notification,
      );
      console.log(
        'Press action used to open the app',
        initialNotification.pressAction,
      );
      // todo change resolve
      const mergeData = { navigateTo: 'Summary', ...data };
      return Promise.resolve(mergeData);
    }

    return Promise.resolve({ navigateTo: 'Summary' });
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
        onNextScreen({ navigateTo: 'Summary' });
      });
  }, []);

  return mainScreenState;
};

export const useMainApp = () => {
  const mainContext = useContext(MainAppContext);
  if (mainContext == null) {
    throw new Error('useMainApp() called outside of a MainAppContext?');
  }
  return mainContext;
};
// TODO explorar
export const useRealmAuth = () => {
  const app = useApp();
  const loggedUser = useUser();

  const signIn = useCallback(
    async token => {
      if (token === '' || loggedUser === null) {
        return;
      }
      const jwt = token;
      try {
        const credentials = Realm.Credentials.jwt(jwt);
        const userLogged = await app.logIn(credentials);
        console.log('Successfully logged in!', userLogged.id);
      } catch (err) {
        crashlytics().recordError(parseError(err), 'realmLogIn');
      }
    },
    [app, loggedUser],
  );

  return { signInRealm: signIn };
};
