import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from './types';
import { RouteName } from './routeNames';
// screens
import SignIn from '../screens/SignIn';
import OnboardingScreen from '../screens/Onboarding';
import SingUpScreen from '../screens/SingUp';
import HomeScreen from '../screens/Home';
import BloodPressureScreen from '../screens/BloodPressure';

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={RouteName.HOME}>
        <Stack.Screen
          name={RouteName.SINGIN}
          component={SignIn}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={RouteName.ONBOARDING}
          component={OnboardingScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={RouteName.SINGUP}
          component={SingUpScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={RouteName.HOME}
          component={HomeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={RouteName.BLOOD_PRESSURE}
          component={BloodPressureScreen}
          options={{
            headerShown: true,
            title: '',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
