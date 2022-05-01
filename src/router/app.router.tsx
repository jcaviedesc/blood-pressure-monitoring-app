import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackHeaderProps,
} from '@react-navigation/native-stack';
import { HeaderBackButton } from '@react-navigation/elements';
import type { RootStackParamList } from './types';
import defaultOptions from './ScreenConfig';
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
// import BloodPressureMeassuringScreen from '../screens/BloodPressure/Meassuring';
import BloodPressureMeassuringA from '../screens/BloodPressure/MeassuringA';
import Wait1MinuteScreen from '../screens/BloodPressure/Wait1minute';
import BloodPressureMeasuringFinish from '../screens/BloodPressure/MeasuringFinish';
// TODO revisar
// import BloodPressureHeartRateModalScreen from '../screens/BloodPressure/HeartRate'; // v2
import ProfileScreen from '../screens/Profile';
import DevelopmentScreen from '../screens/Development';

const Stack = createNativeStackNavigator<RootStackParamList>();

type AppProps = {
  onReady: (() => void) | undefined;
};
// TODO implementar google analictys
function App({ onReady }: AppProps) {
  return (
    <NavigationContainer onReady={onReady}>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerStyle: styles.header,
          gestureEnabled: true,
        }}>
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Onboarding"
          component={OnboardingScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Login"
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
            }: NativeStackHeaderProps) => {
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
          name="Home"
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
          name="Home/BloodPressure"
          component={BloodPressureScreen}
          options={{
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: 'transpatent',
            },
            title: '',
          }}
        />
        <Stack.Screen
          name={'BloodPressure/Steps'}
          component={BloodPressureStepsScreen}
          options={{
            ...defaultOptions,
            title: '',
          }}
        />
        <Stack.Screen
          name={'BloodPressure/Preparation'}
          component={BloodPressurePreparation}
          options={{
            ...defaultOptions,
            title: '',
          }}
        />
        {/* <Stack.Screen
          name={'BloodPressure/Meassuring'}
          component={BloodPressureMeassuringScreen}
          options={{
            ...defaultOptions,
            title: 'Presión Arterial',
          }}
        /> */}
        <Stack.Screen
          name={'BloodPressure/MeassuringA'}
          component={BloodPressureMeassuringA}
          options={{
            ...defaultOptions,
            title: 'Presión Arterial',
          }}
        />
        <Stack.Screen
          name="BloodPressure/Wait1minute"
          component={Wait1MinuteScreen}
          options={{
            ...defaultOptions,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="BloodPressure/MeasuringFinish"
          component={BloodPressureMeasuringFinish}
          options={{
            ...defaultOptions,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="development"
          component={DevelopmentScreen}
          options={{
            title: 'developing screen',
          }}
        />
        {/* <Stack.Screen
          name={'BloodPressure/HeartRate'}
          component={BloodPressureHeartRateModalScreen}
          options={ModalTransition}
        /> */}
        {Object.entries({
          ...SingUpFlow,
        }).map(([name, params]) => (
          <Stack.Screen
            key={name}
            options={params.options}
            name={name as keyof RootStackParamList}
            component={params.component}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
