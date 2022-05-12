import React from 'react';
import {
  NativeStackHeaderProps,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import { getHeaderTitle, HeaderBackButton } from '@react-navigation/elements';
import { StepsHeader } from '../components/Layout';
import { SingUpScreens } from './types';
// screena
import SingUpScreen from '../screens/SingUp';
import BirthdateScreen from '../screens/SingUp/Birthdate';
import BodyInfoScreen from '../screens/SingUp/BodyInfo';
import SelectUserTypeScreen from '../screens/SingUp/SelectUserType';
import SelectProfilePictureScreen from '../screens/SingUp/SelectProfilePicture';
import HealthInfoScreen from '../screens/SingUp/HealthInfo';
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
    component: SingUpScreen,
    options: {
      header: ({
        navigation,
        route,
        options,
        back,
      }: NativeStackHeaderProps) => {
        return renderSingUpHeader(navigation, route, options, back, {
          nsteps: 6,
          activeStep: 1,
        });
      },
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
