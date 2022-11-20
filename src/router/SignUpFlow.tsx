import React from 'react';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { StepsHeader } from '../components/Layout';
import { SingUpScreens } from './types';
// screens
import SignUpScreen from '../screens/SignUp';
import BirthdayScreen from '../screens/SignUp/Birthdate';
import BodyInfoScreen from '../screens/SignUp/BodyInfo';
import SelectUserTypeScreen from '../screens/SignUp/SelectUserType';
import SelectProfilePictureScreen from '../screens/SignUp/SelectProfilePicture';
import HealthQuestionsScreen from '../screens/SignUp/HealthQuestions';

type SingUpScreensConfig = {
  [K in SingUpScreens]: {
    component: React.ComponentType<any>;
    options: NativeStackNavigationOptions;
  };
};

const SignUpFlow: SingUpScreensConfig = {
  SignUp: {
    component: SignUpScreen,
    options: {
      headerShown: false,
    },
  },
  'SignUp/BirthDate': {
    component: BirthdayScreen,
    options: {
      header: props => (
        <StepsHeader
          {...props}
          step={{
            nsteps: 4,
            activeStep: 1,
          }}
        />
      ),
    },
  },
  'SignUp/BodyInfo': {
    component: BodyInfoScreen,
    options: {
      header: props => (
        <StepsHeader
          {...props}
          step={{
            nsteps: 4,
            activeStep: 2,
          }}
        />
      ),
    },
  },
  'SignUp/SelectUserType': {
    component: SelectUserTypeScreen,
    options: {
      header: props => (
        <StepsHeader
          {...props}
          step={{
            nsteps: 5,
            activeStep: 3,
          }}
        />
      ),
    },
  },
  'SignUp/HealthQuestions': {
    component: HealthQuestionsScreen,
    options: {
      header: props => (
        <StepsHeader
          {...props}
          step={{
            nsteps: 5,
            activeStep: 4,
          }}
        />
      ),
    },
  },
  'SignUp/ProfilePicture': {
    component: SelectProfilePictureScreen,
    options: {
      header: props => (
        <StepsHeader
          {...props}
          step={{
            nsteps: 5,
            activeStep: 5,
          }}
        />
      ),
    },
  },
};

export default SignUpFlow;
