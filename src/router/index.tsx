import * as React from 'react';
import { useColorScheme } from 'react-native';
import analytics from '@react-native-firebase/analytics';
import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HeaderBackButton } from '@react-navigation/elements';
import type { RootStackParamList } from './types';
import { NormalHeader, StepsHeader } from '../components/Layout';
import styles from './styles';
// screens
import SignIn from '../screens/Login';
import VerifyPhoneScreen from '../screens/VerifyPhone';
import SignUpFlow from './SignUpFlow';

import HomeScreen from '../screens/Home';
import BloodPressureScreens from './BloodPressureScreens';
// TODO revisar
// import BloodPressureHeartRateModalScreen from '../screens/BloodPressure/HeartRate'; // v2
import ProfileScreen from '../screens/Profile';
import DevelopmentScreen from '../screens/Development';
import { Colors } from '../styles';

const Stack = createNativeStackNavigator<RootStackParamList>();
export const StackNavigationRef =
  createNavigationContainerRef<RootStackParamList>();

export type NavigationRef = typeof StackNavigationRef;

type MainStackNavigatorProps = {
  onReady: (navigator: NavigationRef) => void;
  isUserLogged: boolean;
};

function MainStackNavigator({
  onReady,
  isUserLogged,
}: MainStackNavigatorProps) {
  const isDarkMode = useColorScheme() === 'dark';
  const routeNameRef = React.useRef('');

  const onReadyHandler = () => {
    routeNameRef.current = StackNavigationRef.getCurrentRoute()?.name || '';
    onReady(StackNavigationRef);
  };

  return (
    <NavigationContainer
      ref={StackNavigationRef}
      onReady={onReadyHandler}
      onStateChange={async () => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName =
          StackNavigationRef.getCurrentRoute()?.name ?? '';

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
          headerShadowVisible: false,
        }}>
        {isUserLogged ? (
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
            {Object.entries(SignUpFlow).map(([name, params]) => (
              <Stack.Screen
                key={name}
                options={params.options}
                name={name as keyof RootStackParamList}
                component={params.component}
              />
            ))}
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
                header: headerProps => {
                  const { navigation, options, back } = headerProps;
                  // TODO realizar logica en base a la ruta anterior
                  return options.showStepHeader ? (
                    <StepsHeader
                      {...headerProps}
                      step={{ activeStep: 2, nsteps: 5 }}
                    />
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
          </>
        )}

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
