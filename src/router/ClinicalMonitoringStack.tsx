import React from 'react';
import { Platform, useColorScheme } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MonitoringScreen from '../screens/monitoring';
import { Colors } from '../styles';
import { MonitoringStack } from './types';

const Stack = createNativeStackNavigator<MonitoringStack>();

export default function ClinicalMonitoringStack() {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: isDarkMode
            ? Colors.darkBackground
            : Colors.background,
        },
        gestureEnabled: true,
        headerTintColor: Colors.headline,
        headerBackTitleVisible: false,
        headerShadowVisible: false,
      }}>
      <Stack.Screen
        name="Patients"
        component={MonitoringScreen}
        options={{
          headerTitle: 'Pacientes',
          headerTransparent: true,
          headerTitleAlign: 'left',
          headerBlurEffect: 'light',
          headerStyle: {
            backgroundColor:
              Platform.OS === 'ios' ? Colors.transparent : Colors.background,
          },
          headerSearchBarOptions: {
            textColor: Colors.headline,
            headerIconColor: Colors.tertiary,
            hintTextColor: Colors.headline,
            autoFocus: false,
          },
        }}
      />
    </Stack.Navigator>
  );
}
