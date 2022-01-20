import React from 'react';
import { StackHeaderProps } from '@react-navigation/stack';
import { getHeaderTitle, HeaderBackButton } from '@react-navigation/elements';
import { StepsHeader } from '../components/Layout';
import { RouteName } from './routeNames';
// screena
import SingUpScreen from '../screens/SingUp';
import VerifyPhoneScreen from '../screens/SingUp/VerifyPhone';
import SelectGenderScreen from '../screens/SingUp/SelectGender';
import BasicInfoScreen from '../screens/SingUp/BasicInfo';

const renderHeader = (
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
        return renderHeader(navigation, route, options, back, {
          nsteps: 4,
          activeStep: 1,
        });
      },
    },
  },
  [RouteName.VERIFY_PHONE]: {
    component: VerifyPhoneScreen,
    options: {
      header: ({ navigation, route, options, back }: StackHeaderProps) => {
        return renderHeader(navigation, route, options, back, {
          nsteps: 4,
          activeStep: 2,
        });
      },
    },
  },
  [RouteName.SELECT_GENDER]: {
    component: SelectGenderScreen,
    options: {
      header: ({ navigation, route, options, back }: StackHeaderProps) => {
        return renderHeader(navigation, route, options, back, {
          nsteps: 4,
          activeStep: 3,
        });
      },
    },
  },
  [RouteName.BASIC_INFO]: {
    component: BasicInfoScreen,
    options: {
      header: ({ navigation, route, options, back }: StackHeaderProps) => {
        return renderHeader(navigation, route, options, back, {
          nsteps: 4,
          activeStep: 4,
        });
      },
    },
  },
};

export default SingUpFlow;
