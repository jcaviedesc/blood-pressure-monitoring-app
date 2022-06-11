import React from 'react';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { BloodPressureScreenNames } from './types';
import defaultOptions from './ScreenConfig';
import BloodPressureScreen from '../screens/BloodPressure';
import BloodPressurePreparation from '../screens/BloodPressure/Preparation';
import BloodPressureStepsScreen from '../screens/BloodPressure/Steps';
import BloodPressureMeassuring from '../screens/BloodPressure/Meassuring';
import Wait1MinuteScreen from '../screens/BloodPressure/Wait1minute';
import BloodPressureMeasuringFinish from '../screens/BloodPressure/MeasuringFinish';
import BloodPressureReminders from '../screens/BloodPressure/Reminders';
import ValidateMonitor from '../screens/BloodPressure/ValidateMonitor';
import { HeaderTitle, HeaderSearch, StepsHeader } from '../components/Layout';

type BloodPressureScreensConfig = {
  [K in BloodPressureScreenNames]: {
    component: React.ComponentType<any>;
    options: NativeStackNavigationOptions;
  };
};

const BloodPressureScreens: BloodPressureScreensConfig = {
  'Home/BloodPressure': {
    component: BloodPressureScreen,
    options: {
      headerTitle: HeaderTitle,
      headerBackTitleVisible: false,
      title: 'Presión Arterial',
    },
  },
  'BloodPressure/Preparation': {
    component: BloodPressurePreparation,
    options: {
      ...defaultOptions,
      title: '',
    },
  },
  'BloodPressure/Steps': {
    component: BloodPressureStepsScreen,
    options: {
      ...defaultOptions,
      header: ({ options, ...props }) => (
        <StepsHeader
          options={options}
          {...props}
          step={{
            nsteps: 8,
            activeStep: options.activeStep ?? 1,
          }}
        />
      ),
    },
  },
  'BloodPressure/Meassuring': {
    component: BloodPressureMeassuring,
    options: {
      ...defaultOptions,
      title: 'Presión Arterial',
    },
  },
  'BloodPressure/Wait1minute': {
    component: Wait1MinuteScreen,
    options: {
      ...defaultOptions,
      headerShown: false,
    },
  },
  'BloodPressure/MeasuringFinish': {
    component: BloodPressureMeasuringFinish,
    options: {
      ...defaultOptions,
      headerShown: false,
    },
  },
  'BloodPressure/Reminders': {
    component: BloodPressureReminders,
    options: {
      headerTitle: HeaderTitle,
      ...defaultOptions,
    },
  },
  'BloodPressure/ValidateMonitor': {
    component: ValidateMonitor,
    options: {
      ...defaultOptions,
      header: props => <HeaderSearch {...props} />,
      headerTransparent: false,
    },
  },
};

export default BloodPressureScreens;
