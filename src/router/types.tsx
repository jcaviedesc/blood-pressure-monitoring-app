import { FirebaseAuthTypes } from '@react-native-firebase/auth';

export type RootStackParamList = {
  Login: undefined;
  Singup: undefined;
  'Singup/VerifyPhone': { confirm: FirebaseAuthTypes.ConfirmationResult };
  'Singup/SelectGender': undefined;
  Onboarding: undefined;
  Home: undefined;
  'Home/BloodPressure': undefined;
  'BloodPressure/Reading': undefined;
  'BloodPressure/Preparation': undefined;
};
