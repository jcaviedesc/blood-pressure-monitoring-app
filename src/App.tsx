/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type { Node } from 'react';
import { Provider } from 'react-redux';
import Toast from 'react-native-toast-message';
import { PersistGate } from 'redux-persist/integration/react';
import { REALM_APPID } from 'react-native-dotenv';
import { AppProvider } from '@realm/react';
import Main from './main';
import store, { persistor } from './store/configureStore';
import { LoadingWrapper } from './wrappers';
import {
  useNotificationPermission,
  useGetNotificationSettingsPermission,
} from './hooks/usePermissions';
// context
import { ConfirmPhoneProvider } from './providers/PhoneAuthProvider';
import { LocalizationProvider } from './providers/LocalizationProvider';
import { AppErrorBoundary } from './providers/ErrorBoundary';
import { RealmAuthProvider } from './providers/RealmProvider';

const App: () => Node = () => {
  useNotificationPermission();
  useGetNotificationSettingsPermission();

  return (
    <AppErrorBoundary>
      <PersistGate loading={null} persistor={persistor}>
        <Provider store={store}>
          <LocalizationProvider>
            <ConfirmPhoneProvider>
              <LoadingWrapper>
                <AppProvider id={REALM_APPID}>
                  <RealmAuthProvider>
                    <Main />
                  </RealmAuthProvider>
                </AppProvider>
              </LoadingWrapper>
            </ConfirmPhoneProvider>
          </LocalizationProvider>
          <Toast />
        </Provider>
      </PersistGate>
    </AppErrorBoundary>
  );
};

export default App;
