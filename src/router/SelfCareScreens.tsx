import React from 'react';
import { useColorScheme } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SearchAcademicBlogPosts from '../screens/SelfCare/Search';
import { Colors } from '../styles';

const Stack = createNativeStackNavigator();

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
        component={SearchAcademicBlogPosts}
        options={{
          headerSearchBarOptions: {
            autoFocus: true,
          },
        }}
      />
    </Stack.Navigator>
  );
}
