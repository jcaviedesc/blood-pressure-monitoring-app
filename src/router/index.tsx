import * as React from 'react';
import { useColorScheme } from 'react-native';
import analytics from '@react-native-firebase/analytics';
import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from './types';
import styles from './styles';
// screens
import Welcome from '../screens/Welcome';
import VerifyPhoneScreen from '../screens/VerifyPhone';
import SignUpFlow from './SignUpFlow';
import OnboardingScreen from '../screens/Onboarding';

import MainTabsHome from './MainTabs';
import BloodPressureScreens from './BloodPressureScreens';
// TODO revisar
// import BloodPressureHeartRateModalScreen from '../screens/BloodPressure/HeartRate'; // v2
import ProfileScreen from '../screens/Profile';
import DevelopmentScreen from '../screens/Development';
import MedicineScreen from '../screens/Medicine/MedicineList';
import { Colors } from '../styles';
import AddSelfCareTipScreen from '../screens/SelfCare/CreateSelfCareTip';
import MedicineFormScreen from '../screens/Medicine/MedicineForm';
import { useI18nLocate } from '../providers/LocalizationProvider';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export function getNavigator() {
  if (navigationRef.isReady()) {
    // Perform navigation if the react navigation is ready to handle actions
    return navigationRef;
  } else {
    return undefined;
    // You can decide what to do if react navigation is not ready
    // You can ignore this, or add these actions to a queue you can call later
  }
}

type MainStackNavigatorProps = {
  onReady: () => void;
  isUserLogged: boolean;
  isAuthenticated: boolean;
  showOnboardingScreen: boolean;
};

function MainStackNavigator({
  onReady,
  isUserLogged,
  isAuthenticated, // cuando el usuario se authentica
  showOnboardingScreen,
}: MainStackNavigatorProps) {
  const { translate } = useI18nLocate();
  const isDarkMode = useColorScheme() === 'dark';
  const routeNameRef = React.useRef('');

  const onReadyHandler = () => {
    routeNameRef.current = navigationRef.getCurrentRoute()?.name || '';
    onReady();
  };

  console.log({ isUserLogged });
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
          headerShadowVisible: false,
        }}>
        {showOnboardingScreen && (
          <Stack.Screen
            name="Onboarding"
            component={OnboardingScreen}
            options={{
              headerShown: false,
            }}
          />
        )}
        {isUserLogged ? (
          <>
            <Stack.Screen
              name="Summary"
              component={MainTabsHome}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="AddSelfCareTip"
              component={AddSelfCareTipScreen}
              options={{
                headerBackTitle: 'cancel',
                animation: 'slide_from_bottom',
                presentation: 'modal',
              }}
            />
            <Stack.Screen
              name="Profile"
              component={ProfileScreen}
              options={{
                title: translate('profile.title'),
              }}
            />
            <Stack.Screen
              name="Weight"
              component={DevelopmentScreen}
              options={{
                title: 'developing screen',
              }}
            />
            <Stack.Screen
              name="Height"
              component={DevelopmentScreen}
              options={{
                title: 'developing screen',
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
              name="Welcome"
              component={Welcome}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="VerifyPhone"
              navigationKey={isAuthenticated ? 'user' : 'guest'}
              component={VerifyPhoneScreen}
              options={{
                headerShown: false,
              }}
            />
            {Object.entries(SignUpFlow).map(([name, params]) => (
              <Stack.Screen
                key={name}
                options={params.options}
                name={name as keyof RootStackParamList}
                component={params.component}
              />
            ))}
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
        {/* <Stack.Screen
          name="development"
          component={DevelopmentScreen}
          options={{
            title: 'developing screen',
          }}
        /> */}
        <Stack.Screen
          name="development"
          component={DevelopmentScreen}
          options={{
            title: 'developing screen',
          }}
        />
        <Stack.Screen
          name="MedicineList"
          component={MedicineScreen}
          options={{
            title: 'Medicamentos',
          }}
        />
        <Stack.Screen
          name="Medicine"
          component={MedicineFormScreen}
          options={{
            title: '',
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
