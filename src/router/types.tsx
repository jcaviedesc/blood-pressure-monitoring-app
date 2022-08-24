type SingUpStackParamList = {
  Singup: undefined;
  'Singup/Birthdate': undefined;
  'Singup/BodyInfo': undefined;
  'Singup/SelectUserType': undefined;
  'Singup/HealthQuestions': undefined;
  'Singup/ProfilePicture': undefined;
};

type BloodPressureStackParam = {
  'Home/BloodPressure': undefined;
  'BloodPressure/Preparation': undefined;
  'BloodPressure/Steps': undefined;
  'BloodPressure/Meassuring': undefined;
  'BloodPressure/Wait1minute': undefined;
  'BloodPressure/MeasuringFinish': undefined;
  'BloodPressure/Reminders': undefined;
  'BloodPressure/ValidateMonitor': undefined;
};

export type RootStackParamList = {
  Welcome: undefined;
  VerifyPhone: { verificationType: string; phone: string };
  HomeTabs: undefined;
  Profile: undefined;
  development: undefined;
  AddSelfCareTip: undefined;
} & SingUpStackParamList &
  BloodPressureStackParam;

export type BloodPressureScreenNames = keyof BloodPressureStackParam;
export type SingUpScreens = keyof SingUpStackParamList;
