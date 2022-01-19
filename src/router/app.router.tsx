import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import type { RootStackParamList } from './types';
import { RouteName } from './routeNames';
// screens
import SignIn from '../screens/SignIn';
import OnboardingScreen from '../screens/Onboarding';
import SingUpScreen from '../screens/SingUp';
import HomeScreen from '../screens/Home';
import BloodPressureScreen from '../screens/BloodPressure';
import BloodPressureReadingSteps from './BloodPressureReadings';

const Stack = createStackNavigator<RootStackParamList>();

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
        {Object.entries({
          ...BloodPressureReadingSteps,
        }).map(([name, params]) => (
          <Stack.Screen
            key={name}
            name={name}
            options={params.options}
            component={params.component}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
