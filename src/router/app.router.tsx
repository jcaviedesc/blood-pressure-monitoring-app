import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  StackHeaderProps,
} from '@react-navigation/stack';
import { HeaderBackButton } from '@react-navigation/elements';
import type { RootStackParamList } from './types';
import { RouteName } from './routeNames';
import defaultOptions, { ModalTransition } from './ScreenConfig';
import { NormalHeader } from '../components/Layout';
import styles from './styles';
// screens
import SplashScreen from '../screens/Splash';
import SignIn from '../screens/Login';
import VerifyPhoneScreen from '../screens/VerifyPhone';
import SingUpFlow, { renderSingUpHeader } from './SingUpFlow';
import OnboardingScreen from '../screens/Onboarding';
import HomeScreen from '../screens/Home';
import BloodPressureScreen from '../screens/BloodPressure';
import BloodPressurePreparation from '../screens/BloodPressure/Preparation';
import BloodPressureStepsScreen from '../screens/BloodPressure/Steps';
import BloodPressureMeassuringScreen from '../screens/BloodPressure/Meassuring';
import BloodPressureMeassuringV1 from '../screens/BloodPressure/MeassuringV1';
// TODO revisar
import BloodPressureHeartRateModalScreen from '../screens/BloodPressure/HeartRate';
import ProfileScreen from '../screens/Profile';

const Stack = createStackNavigator<RootStackParamList>();

type AppProps = {
  onReady: (() => void) | undefined;
};

function App({ onReady }: AppProps) {
  return (
    <NavigationContainer onReady={onReady}>
      <Stack.Navigator
        initialRouteName="BloodPressure/MeassuringV1"
        screenOptions={{ headerStyle: styles.header, gestureEnabled: true }}>
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
          name={'BloodPressure/Steps'}
          component={BloodPressureStepsScreen}
          options={{
            ...defaultOptions,
            headerShown: true,
            title: '',
          }}
        />
        <Stack.Screen
          name={'BloodPressure/Preparation'}
          component={BloodPressurePreparation}
          options={{
            ...defaultOptions,
            headerShown: true,
            title: '',
          }}
        />
        <Stack.Screen
          name={'BloodPressure/Meassuring'}
          component={BloodPressureMeassuringScreen}
          options={{
            ...defaultOptions,
            headerShown: true,
            title: 'Presión Arterial',
          }}
        />
        <Stack.Screen
          name={'BloodPressure/MeassuringV1'}
          component={BloodPressureMeassuringV1}
          options={{
            ...defaultOptions,
            headerShown: true,
            title: 'Presión Arterial',
          }}
        />  
        <Stack.Screen
          name={'BloodPressure/HeartRate'}
          component={BloodPressureHeartRateModalScreen}
          options={ModalTransition}
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
