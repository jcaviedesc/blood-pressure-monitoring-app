import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  StackHeaderProps,
} from '@react-navigation/stack';
import { HeaderBackButton } from '@react-navigation/elements';
import type { RootStackParamList } from './types';
import { RouteName } from './routeNames';
import defaultOptions from './ScreenConfig';
import { NormalHeader } from '../components/Layout';
// screens
import SplashScreen from '../screens/Splash';
import SignIn from '../screens/Login';
import VerifyPhoneScreen from '../screens/VerifyPhone';
import SingUpFlow, { renderSingUpHeader } from './SingUpFlow';
import OnboardingScreen from '../screens/Onboarding';
import HomeScreen from '../screens/Home';
import BloodPressureScreen from '../screens/BloodPressure';
import BloodPressureStepsScreen from '../screens/blood-pressure-reading';
import PreparationBloodPressureMeasureScreen from '../screens/blood-pressure-reading/Preparation';
import ProfileScreen from '../screens/Profile';

const Stack = createStackNavigator<RootStackParamList>();

type AppProps = {
  onReady: (() => void) | undefined;
};

function App({ onReady }: AppProps) {
  return (
    <NavigationContainer onReady={onReady}>
      <Stack.Navigator initialRouteName="Singup">
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
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
          name={RouteName.LOGIN}
          component={SignIn}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="VerifyPhone"
          component={VerifyPhoneScreen}
          options={{
            header: ({
              navigation,
              route,
              options,
              back,
            }: StackHeaderProps) => {
              return options.showStepHeader ? (
                renderSingUpHeader(navigation, route, options, back, {
                  nsteps: 5,
                  activeStep: 2,
                })
              ) : (
                <NormalHeader
                  leftButton={
                    back ? (
                      <HeaderBackButton onPress={navigation.goBack} />
                    ) : undefined
                  }
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
          name="Profile"
          component={ProfileScreen}
          options={{
            title: '',
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
