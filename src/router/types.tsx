export type RootStackParamList = {
  Splash: undefined;
  Login: { from?: string };
  Singup: undefined;
  VerifyPhone: { verificationType: string };
  'Singup/Birthdate': undefined;
  'Singup/BodyInfo': undefined;
  'Singup/SelectUserType': undefined;
  'Singup/HealthInfo': undefined;
  'Singup/ProfilePicture': undefined;
  Onboarding: undefined;
  Home: undefined;
  'Home/BloodPressure': undefined;
  'BloodPressure/Steps': undefined;
  'BloodPressure/Preparation': undefined;
  'BloodPressure/MeassuringA': undefined;
  'BloodPressure/Wait1minute': undefined;
  'BloodPressure/MeasuringFinish': undefined;
  // 'BloodPressure/Meassuring': undefined; // version v2
  // 'BloodPressure/HeartRate': undefined; // version v2
  Profile: undefined;
  development: undefined;
};
