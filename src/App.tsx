/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import type { Node } from 'react';
import { useColorScheme, StatusBar, Alert } from 'react-native';
import { Provider } from 'react-redux';
import messaging from '@react-native-firebase/messaging';
import Toast from 'react-native-toast-message';
import { PersistGate } from 'redux-persist/integration/react';
import Main from './main';
import store, { persistor } from './store/configureStore';
import { LoadingWrapper } from './wrappers';
import { useNotificationPermission } from './hooks/usePermissions';
// context
import { ConfirmPhoneProvider } from './providers/ConfirmPhone';
import { LocalizationProvider } from './providers/LocalizationProvider';
import { Colors } from './styles';

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  useNotificationPermission();

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  return (
    <Provider store={store}>
      <StatusBar
        animated={true}
        backgroundColor={isDarkMode ? Colors.darkMode : Colors.background}
        showHideTransition="fade"
        hidden={false}
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      />
      <PersistGate loading={null} persistor={persistor}>
        <LocalizationProvider>
          <ConfirmPhoneProvider>
            <LoadingWrapper>
              <Main />
            </LoadingWrapper>
          </ConfirmPhoneProvider>
        </LocalizationProvider>
      </PersistGate>
      <Toast />
    </Provider>
  );
};

export default App;
