import React from 'react';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { getHeaderTitle, HeaderBackButton } from '@react-navigation/elements';
import { StepsHeader } from '../components/Layout';
import { RouteName } from './routeNames';
// screena
import SingUpScreen from '../screens/SingUp';
import BodyInfoScreen from '../screens/SingUp/BodyInfo';
import SelectUserTypeScreen from '../screens/SingUp/SelectUserType';
import SelectProfilePictureScreen from '../screens/SingUp/SelectProfilePicture';
import HealtInfoScreen from '../screens/SingUp/HealtInfo';

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
        back ? <HeaderBackButton onPress={navigation.goBack} /> : undefined
      }
      step={step}
      style={options.headerStyle}
    />
  );
};
// TODO add birtdate screen
const SingUpFlow = {
  [RouteName.SINGUP]: {
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
  'Singup/HealtInfo': {
    component: HealtInfoScreen,
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
  [RouteName.PROFILE_PICTURE]: {
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
