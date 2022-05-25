import * as React from 'react';
import { useColorScheme } from 'react-native';
import analytics from '@react-native-firebase/analytics';
import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackHeaderProps,
} from '@react-navigation/native-stack';
import { HeaderBackButton } from '@react-navigation/elements';
import type { RootStackParamList } from './types';
import { NormalHeader } from '../components/Layout';
import styles from './styles';
// screens
import SignIn from '../screens/Login';
import SingUpScreen from '../screens/SignUp';
import VerifyPhoneScreen from '../screens/VerifyPhone';
import SignUpFlow, { renderSingUpHeader } from './SignUpFlow';

import HomeScreen from '../screens/Home';
import BloodPressureScreens from './BloodPressureScreens';
// TODO revisar
// import BloodPressureHeartRateModalScreen from '../screens/BloodPressure/HeartRate'; // v2
import ProfileScreen from '../screens/Profile';
import DevelopmentScreen from '../screens/Development';
import { Colors } from '../styles';

const Stack = createNativeStackNavigator<RootStackParamList>();
const navigationRef = createNavigationContainerRef<RootStackParamList>();

export type NavigationRef = typeof navigationRef;

type MainStackNavigatorProps = {
  onReady: (navigator: NavigationRef) => void;
  isSignedIn: boolean;
};
// TODO implementar google analictys
function MainStackNavigator({ onReady, isSignedIn }: MainStackNavigatorProps) {
  const isDarkMode = useColorScheme() === 'dark';
  const routeNameRef = React.useRef('');

  const onReadyHandler = () => {
    routeNameRef.current = navigationRef.getCurrentRoute()?.name || '';
    onReady(navigationRef);
  };

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={onReadyHandler}
      onStateChange={async () => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.getCurrentRoute()?.name ?? '';

        if (previousRouteName !== currentRouteName) {
          await analytics().logScreenView({
            screen_name: currentRouteName,
            screen_class: currentRouteName,
          });
        }
        routeNameRef.current = currentRouteName;
      }}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            ...styles.header,
            backgroundColor: isDarkMode
              ? Colors.darkBackground
              : Colors.background,
          },
          gestureEnabled: true,
          headerTintColor: Colors.headline,
          headerBackTitleVisible: false,
        }}>
        {isSignedIn ? (
          <>
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
            {Object.entries({
              ...BloodPressureScreens,
            }).map(([name, params]) => (
              <Stack.Screen
                key={name}
                options={params.options}
                name={name as keyof RootStackParamList}
                component={params.component}
              />
            ))}
          </>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={SignIn}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Singup"
              component={SingUpScreen}
              options={{
                headerTitle: '',
                headerShadowVisible: false,
              }}
            />
          </>
        )}
        {/* SignUpFlow debe ser movido dentro de la logica si el usuario esta logged
        o implementar navigationKey={isSignedIn ? 'user' : 'guest'}
        */}
        {Object.entries(SignUpFlow).map(([name, params]) => (
          <Stack.Screen
            key={name}
            options={params.options}
            name={name as keyof RootStackParamList}
            component={params.component}
          />
        ))}

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
              // TODO realizar logica en base a la ruta anterior
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

        {/* <Stack.Screen
          name={'BloodPressure/Meassuring'}
          component={BloodPressureMeassuringScreen}
          options={{
            ...defaultOptions,
            title: 'Presión Arterial',
          }}
        /> */}
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainStackNavigator;
