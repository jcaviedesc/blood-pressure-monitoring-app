import React from 'react';
import { Platform, useColorScheme } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SearchSelfCareTips from '../screens/SelfCare/SearchTips';
import { Colors } from '../styles';
import { SelfCareStack } from './types';

const Stack = createNativeStackNavigator<SelfCareStack>();

export default function SelfCareScreens() {
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
        name="SearchSelfCareTip"
        component={SearchSelfCareTips}
        options={{
          headerTransparent: true,
          headerTitleAlign: 'left',
          headerBlurEffect: 'light',
          headerStyle: {
            backgroundColor:
              Platform.OS === 'ios' ? Colors.transparent : Colors.background,
          },
          // headerIconColor: Colors.tertiary,
          headerSearchBarOptions: {
            textColor: Colors.headline,
            headerIconColor: Colors.tertiary,
            hintTextColor: Colors.headline,
            autoFocus: true,
          },
        }}
      />
    </Stack.Navigator>
  );
}
