/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type { Node } from 'react';
import { useColorScheme } from 'react-native';
import { Provider } from 'react-redux';
import AppScreens from './router/app.router';
import store from './store';
// context
import { ConfirmPhoneProvider } from './context/ConfirmPhone';

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <Provider store={store}>
      <ConfirmPhoneProvider>
        <AppScreens />
      </ConfirmPhoneProvider>
    </Provider>
  );
};

export default App;
