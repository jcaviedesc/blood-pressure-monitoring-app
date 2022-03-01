/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type { Node } from 'react';
import { useColorScheme, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import RNBootSplash from 'react-native-bootsplash';
import { PersistGate } from 'redux-persist/integration/react';
import AppScreens from './router/app.router';
import store, { persistor } from './store/configureStore';
import { LoadingWrapper } from './wrappers';
// context
import { ConfirmPhoneProvider } from './providers/ConfirmPhone';
import { LocalizationProvider } from './providers/LocalizationProvider';
import { Colors } from './styles';

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';
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
              <AppScreens onReady={() => RNBootSplash.hide()} />
            </LoadingWrapper>
          </ConfirmPhoneProvider>
        </LocalizationProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
