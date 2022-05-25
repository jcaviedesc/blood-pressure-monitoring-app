/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import type { Node } from 'react';
import { Alert } from 'react-native';
import { Provider } from 'react-redux';
import messaging from '@react-native-firebase/messaging';
import Toast from 'react-native-toast-message';
import { PersistGate } from 'redux-persist/integration/react';
import Main from './main';
import store, { persistor } from './store/configureStore';
import { LoadingWrapper } from './wrappers';
import {
  useNotificationPermission,
  useGetNotificationSettingsPermission,
} from './hooks/usePermissions';
// context
import { ConfirmPhoneProvider } from './providers/ConfirmPhone';
import { LocalizationProvider } from './providers/LocalizationProvider';
import { AppErrorBoundary } from './providers/ErrorBoundary';

const App: () => Node = () => {
  useNotificationPermission();
  useGetNotificationSettingsPermission();

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <LocalizationProvider>
          <ConfirmPhoneProvider>
            <LoadingWrapper>
              <AppErrorBoundary>
                <Main />
              </AppErrorBoundary>
            </LoadingWrapper>
          </ConfirmPhoneProvider>
        </LocalizationProvider>
        <Toast />
      </PersistGate>
    </Provider>
  );
};

export default App;
