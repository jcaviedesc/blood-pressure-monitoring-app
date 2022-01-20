import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import type { RootStackParamList } from './types';
import { getHeaderTitle, HeaderBackButton } from '@react-navigation/elements';
import { RouteName } from './routeNames';
import defaultOptions from './ScreenConfig';
import { StepsHeader } from '../components/Layout';
// screens
import SignIn from '../screens/SignIn';
import OnboardingScreen from '../screens/Onboarding';
import SingUpScreen from '../screens/SingUp';
import VerifyPhoneScreen from '../screens/SingUp/VerifyPhone';
import HomeScreen from '../screens/Home';
import BloodPressureScreen from '../screens/BloodPressure';
import BloodPressureStepsScreen from '../screens/blood-pressure-reading';
import PreparationBloodPressureMeasureScreen from '../screens/blood-pressure-reading/Preparation';

const Stack = createStackNavigator<RootStackParamList>();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={RouteName.SINGUP}>
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
          name={RouteName.SINGUP}
          component={SingUpScreen}
          options={{
            header: ({ navigation, route, options, back }) => {
              const title = getHeaderTitle(options, route.name);
              return (
                <StepsHeader
                  title={title}
                  leftButton={
                    back ? (
                      <HeaderBackButton onPress={navigation.goBack} />
                    ) : undefined
                  }
                  step={{ nsteps: 4, activeStep: 1 }}
                  style={options.headerStyle}
                />
              );
            },
          }}
        />
        <Stack.Screen
          name={RouteName.VERIFY_PHONE}
          component={VerifyPhoneScreen}
          options={{
            title: '',
            header: ({ navigation, route, options, back }) => {
              const title = getHeaderTitle(options, route.name);
              return (
                <StepsHeader
                  title={title}
                  leftButton={
                    back ? (
                      <HeaderBackButton onPress={navigation.goBack} />
                    ) : undefined
                  }
                  step={{ nsteps: 4, activeStep: 2 }}
                  style={options.headerStyle}
                />
              );
            },
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
