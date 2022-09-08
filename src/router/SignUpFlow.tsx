import React from 'react';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { StepsHeader } from '../components/Layout';
import { SingUpScreens } from './types';
// screens
import SignUpScreen from '../screens/SignUp';
import BirthdateScreen from '../screens/SignUp/Birthdate';
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

const SingUpFlow: SingUpScreensConfig = {
  Singup: {
    component: SignUpScreen,
    options: {
      headerShown: false,
    },
  },
  'Singup/Birthdate': {
    component: BirthdateScreen,
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
  'Singup/BodyInfo': {
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
  'Singup/SelectUserType': {
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
  'Singup/HealthQuestions': {
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
  'Singup/ProfilePicture': {
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

export default SingUpFlow;
