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
import AppScreens from './router/app.router';
import store from './store';
// context
import { ConfirmPhoneProvider } from './context/ConfirmPhone';
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
      <ConfirmPhoneProvider>
        <AppScreens />
      </ConfirmPhoneProvider>
    </Provider>
  );
};

export default App;
