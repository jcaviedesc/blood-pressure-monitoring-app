import React from "react";
import { RouteName } from "./routeNames";
import defaultOptions from './ScreenConfig';
import BloodPressureStepOneScreen from "../screens/blood-pressure-reading/StepOne";

interface Params {
  options: object;
  component: React.FC;
}

interface Screens {
  [RouteName.BLOOD_PRESSURE_STEP_1]: Params;
}

const BloodPressureReadingSteps: Screens = {
  [RouteName.BLOOD_PRESSURE_STEP_1]: {
    options: { ...defaultOptions, title: '' },
    component: BloodPressureStepOneScreen,
  },
};

export default BloodPressureReadingSteps;
