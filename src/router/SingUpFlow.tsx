import React from 'react';
import { StackHeaderProps } from '@react-navigation/stack';
import { getHeaderTitle, HeaderBackButton } from '@react-navigation/elements';
import { StepsHeader } from '../components/Layout';
import { RouteName } from './routeNames';
// screena
import SingUpScreen from '../screens/SingUp';
import SelectGenderScreen from '../screens/SingUp/SelectGender';
import BasicInfoScreen from '../screens/SingUp/BasicInfo';
import SelectProfilePictureScreen from '../screens/SingUp/SelectProfilePicture';

export const renderSingUpHeader = (
  navigation: StackHeaderProps['navigation'],
  route: StackHeaderProps['route'],
  options: StackHeaderProps['options'],
  back: StackHeaderProps['back'],
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

const SingUpFlow = {
  [RouteName.SINGUP]: {
    component: SingUpScreen,
    options: {
      header: ({ navigation, route, options, back }: StackHeaderProps) => {
        return renderSingUpHeader(navigation, route, options, back, {
          nsteps: 5,
          activeStep: 1,
        });
      },
    },
  },
  [RouteName.SELECT_GENDER]: {
    component: SelectGenderScreen,
    options: {
      header: ({ navigation, route, options, back }: StackHeaderProps) => {
        return renderSingUpHeader(navigation, route, options, back, {
          nsteps: 5,
          activeStep: 3,
        });
      },
    },
  },
  [RouteName.BASIC_INFO]: {
    component: BasicInfoScreen,
    options: {
      header: ({ navigation, route, options, back }: StackHeaderProps) => {
        return renderSingUpHeader(navigation, route, options, back, {
          nsteps: 5,
          activeStep: 4,
        });
      },
    },
  },
  [RouteName.PROFILE_PICTURE]: {
    component: SelectProfilePictureScreen,
    options: {
      header: ({ navigation, route, options, back }: StackHeaderProps) => {
        return renderSingUpHeader(navigation, route, options, back, {
          nsteps: 5,
          activeStep: 5,
        });
      },
    },
  },
};

export default SingUpFlow;
