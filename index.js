/**
 * @format
 */
import 'react-native-gesture-handler';
import 'react-native-get-random-values'; // revisar para borrar
import React from 'react';
import { AppRegistry } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import App from './src/App';
import {
  onMessageReceived,
  registerBackgroundEventNotifee,
} from './src/hooks/useNotifications';
import { name as appName } from './app.json';

// Register background handler
messaging().setBackgroundMessageHandler(onMessageReceived);
registerBackgroundEventNotifee();

function HeadlessCheck({ isHeadless }) {
  if (isHeadless) {
    // App has been launched in the background by iOS, ignore
    return null;
  }

  return <App />;
}

AppRegistry.registerComponent(appName, () => HeadlessCheck);
