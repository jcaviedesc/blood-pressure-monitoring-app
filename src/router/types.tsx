import { SelfCareTip } from '../store/self-care/types';

type SignUpStackParamList = {
  SignUp: undefined;
  'SignUp/BirthDate': undefined;
  'SignUp/BodyInfo': undefined;
  'SignUp/SelectUserType': undefined;
  'SignUp/HealthQuestions': undefined;
  'SignUp/ProfilePicture': undefined;
};

type BloodPressureStackParam = {
  BloodPressure: undefined;
  'BloodPressure/Preparation': undefined;
  'BloodPressure/Steps': undefined;
  'BloodPressure/Measuring': undefined;
  'BloodPressure/Wait1minute': undefined;
  'BloodPressure/Reminders': undefined;
  'BloodPressure/ValidateMonitor': undefined;
};

export type RootStackParamList = {
  Onboarding: undefined;
  Welcome: undefined;
  VerifyPhone: { verificationType: string; phone: string };
  Summary: undefined;
  Profile: undefined;
  development: undefined;
  Medicine: undefined;
  MedicineList: undefined;
  SearchSelfCare: undefined;
  DetailSelfCare: SelfCareTip;
  AddSelfCareTip: undefined;
  Weight: undefined;
  Height: undefined;
} & SignUpStackParamList &
  BloodPressureStackParam;

export type SelfCareStack = {
  SearchSelfCareTip: undefined;
};

export type MonitoringStack = {
  Patients: undefined;
};

export type TabsStackParamsList = {
  SummaryTab: undefined;
  Search: undefined;
  Monitoring: undefined;
};

export type BloodPressureScreenNames = keyof BloodPressureStackParam;
export type SingUpScreens = keyof SignUpStackParamList;
