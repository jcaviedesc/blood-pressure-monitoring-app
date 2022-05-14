import React from 'react';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { BloodPressureScreenNames } from './types';
import defaultOptions from './ScreenConfig';
import BloodPressureScreen from '../screens/BloodPressure';
import BloodPressurePreparation from '../screens/BloodPressure/Preparation';
import BloodPressureStepsScreen from '../screens/BloodPressure/Steps';
// import BloodPressureMeassuringScreen from '../screens/BloodPressure/Meassuring';
import BloodPressureMeassuringA from '../screens/BloodPressure/MeassuringA';
import Wait1MinuteScreen from '../screens/BloodPressure/Wait1minute';
import BloodPressureMeasuringFinish from '../screens/BloodPressure/MeasuringFinish';
import BloodPressureReminders from '../screens/BloodPressure/Reminders';
import { HeaderTitle } from '../components/Layout';

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
      headerShadowVisible: false,
      title: 'Presión Arterial',
    },
  },
  'BloodPressure/Steps': {
    component: BloodPressureStepsScreen,
    options: {
      ...defaultOptions,
      title: '',
    },
  },
  'BloodPressure/Preparation': {
    component: BloodPressurePreparation,
    options: {
      ...defaultOptions,
      title: '',
    },
  },
  'BloodPressure/MeassuringA': {
    component: BloodPressureMeassuringA,
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
      headerShadowVisible: false,
      ...defaultOptions,
    },
  },
};

export default BloodPressureScreens;
