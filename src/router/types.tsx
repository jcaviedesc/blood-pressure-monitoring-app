type SingUpStackParamList = {
  'Singup/Birthdate': undefined;
  'Singup/BodyInfo': undefined;
  'Singup/SelectUserType': undefined;
  'Singup/HealthInfo': undefined;
  'Singup/ProfilePicture': undefined;
};

type BloodPressureStackParam = {
  'Home/BloodPressure': undefined;
  'BloodPressure/Preparation': undefined;
  'BloodPressure/Steps': undefined;
  'BloodPressure/MeassuringA': undefined;
  'BloodPressure/Wait1minute': undefined;
  'BloodPressure/MeasuringFinish': undefined;
  'BloodPressure/Reminders': undefined;
  // 'BloodPressure/Meassuring': undefined; // version v2
  // 'BloodPressure/HeartRate': undefined; // version v2
};

export type RootStackParamList = {
  Login: { from?: string };
  Singup: undefined;
  VerifyPhone: { verificationType: string };
  Home: undefined;
  Profile: undefined;
  development: undefined;
} & SingUpStackParamList &
  BloodPressureStackParam;

export type BloodPressureScreenNames = keyof BloodPressureStackParam;
export type SingUpScreens = keyof SingUpStackParamList;
