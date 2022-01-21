import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import type { RootStackParamList } from './types';
import { RouteName } from './routeNames';
import defaultOptions from './ScreenConfig';
// screens
import SignIn from '../screens/SignIn';
import SingUpFlow from './SingUpFlow';
import OnboardingScreen from '../screens/Onboarding';
import HomeScreen from '../screens/Home';
import BloodPressureScreen from '../screens/BloodPressure';
import BloodPressureStepsScreen from '../screens/blood-pressure-reading';
import PreparationBloodPressureMeasureScreen from '../screens/blood-pressure-reading/Preparation';

const Stack = createStackNavigator<RootStackParamList>();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={RouteName.BASIC_INFO}>
        <Stack.Screen
          name={RouteName.LOGIN}
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
        <Stack.Screen
          name={RouteName.BLOOD_PRESSURE_READING}
          component={BloodPressureStepsScreen}
          options={{
            ...defaultOptions,
            headerShown: true,
            title: '',
          }}
        />
        <Stack.Screen
          name={RouteName.PREPARATION_READING_BP}
          component={PreparationBloodPressureMeasureScreen}
          options={{
            ...defaultOptions,
            headerShown: true,
            title: '',
          }}
        />
        {Object.entries({
          ...SingUpFlow,
        }).map(([name, params]) => (
          <Stack.Screen
            key={name}
            options={params.options}
            name={name}
            component={params.component}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
