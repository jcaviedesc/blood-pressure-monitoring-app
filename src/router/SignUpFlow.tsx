import React from 'react';
import {
  NativeStackHeaderProps,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import { getHeaderTitle, HeaderBackButton } from '@react-navigation/elements';
import { StepsHeader } from '../components/Layout';
import { SingUpScreens } from './types';
// screens
import SignUpScreen from '../screens/SignUp';
import BirthdateScreen from '../screens/SignUp/Birthdate';
import BodyInfoScreen from '../screens/SignUp/BodyInfo';
import SelectUserTypeScreen from '../screens/SignUp/SelectUserType';
import SelectProfilePictureScreen from '../screens/SignUp/SelectProfilePicture';
import HealthInfoScreen from '../screens/SignUp/HealthInfo';
import { Colors } from '../styles';

export const renderSingUpHeader = (
  navigation: NativeStackHeaderProps['navigation'],
  route: NativeStackHeaderProps['route'],
  options: NativeStackHeaderProps['options'],
  back: NativeStackHeaderProps['back'],
  step: { nsteps: number; activeStep: number },
) => {
  const title = getHeaderTitle(options, route.name);
  return (
    <StepsHeader
      title={title}
      leftButton={
        back ? (
          <HeaderBackButton
            onPress={navigation.goBack}
            tintColor={Colors.stroke}
          />
        ) : undefined
      }
      step={step}
      style={options.headerStyle}
    />
  );
};

type SingUpScreensConfig = {
  [K in SingUpScreens]: {
    component: React.ComponentType<any>;
    options: NativeStackNavigationOptions;
  };
};

const SingUpFlow: SingUpScreensConfig = {
  Singup: {
    component: SignUpScreen,
    options: {
      headerTitle: '',
      headerShadowVisible: false,
    },
  },
  'Singup/Birthdate': {
    component: BirthdateScreen,
    options: {
      header: ({
        navigation,
        route,
        options,
        back,
      }: NativeStackHeaderProps) => {
        return renderSingUpHeader(navigation, route, options, back, {
          nsteps: 6,
          activeStep: 2,
        });
      },
    },
  },
  'Singup/BodyInfo': {
    component: BodyInfoScreen,
    options: {
      header: ({
        navigation,
        route,
        options,
        back,
      }: NativeStackHeaderProps) => {
        return renderSingUpHeader(navigation, route, options, back, {
          nsteps: 6,
          activeStep: 3,
        });
      },
    },
  },
  'Singup/SelectUserType': {
    component: SelectUserTypeScreen,
    options: {
      header: ({
        navigation,
        route,
        options,
        back,
      }: NativeStackHeaderProps) => {
        return renderSingUpHeader(navigation, route, options, back, {
          nsteps: 6,
          activeStep: 5,
        });
      },
    },
  },
  'Singup/HealthInfo': {
    component: HealthInfoScreen,
    options: {
      header: ({
        navigation,
        route,
        options,
        back,
      }: NativeStackHeaderProps) => {
        return renderSingUpHeader(navigation, route, options, back, {
          nsteps: 6,
          activeStep: 6,
        });
      },
    },
  },
  'Singup/ProfilePicture': {
    component: SelectProfilePictureScreen,
    options: {
      header: ({
        navigation,
        route,
        options,
        back,
      }: NativeStackHeaderProps) => {
        return renderSingUpHeader(navigation, route, options, back, {
          nsteps: 6,
          activeStep: 6,
        });
      },
    },
  },
};

export default SingUpFlow;
