type SingUpStackParamList = {
  Singup: undefined;
  'Singup/Birthdate': undefined;
  'Singup/BodyInfo': undefined;
  'Singup/SelectUserType': undefined;
  'Singup/HealthQuestions': undefined;
  'Singup/ProfilePicture': undefined;
};

type BloodPressureStackParam = {
  BloodPressure: undefined;
  'BloodPressure/Preparation': undefined;
  'BloodPressure/Steps': undefined;
  'BloodPressure/Meassuring': undefined;
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
  SearchSelfcare: undefined;
  AddSelfCareTip: undefined;
  Weight: undefined;
  Height: undefined;
} & SingUpStackParamList &
  BloodPressureStackParam;

export type BloodPressureScreenNames = keyof BloodPressureStackParam;
export type SingUpScreens = keyof SingUpStackParamList;
