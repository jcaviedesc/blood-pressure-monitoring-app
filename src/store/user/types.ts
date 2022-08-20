import { FirebaseAuthTypes } from '@react-native-firebase/auth';

type HealtcareStruc = {
  status: string;
  value: string;
};

type HomeStatus = {
  bloodPressure: HealtcareStruc;
  nutritional: HealtcareStruc;
  heartRate: HealtcareStruc;
  bloodGlucose: HealtcareStruc;
};

type UserBodyMeasures = {
  val: number;
  unit: string;
};

export enum userTypeEnum {
  HEALT_PROFESSIONAL = 1,
  PATIENT = 2,
}

export type userFromApi = {
  id: string;
  fullName: string;
  phone: string;
  address: string;
  location?: number[];
  gender: string;
  weight: UserBodyMeasures;
  height: UserBodyMeasures;
  birthdate: string;
  userType: userTypeEnum;
  healtInfo?: object;
  profileUrl: string;
  age: string;
  imc: string;
  isC: boolean;
};

export interface UserState {
  id: string;
  name: string;
  lastName: string;
  phone: string;
  address: string;
  location?: number[];
  sex: string;
  weight: UserBodyMeasures;
  height: UserBodyMeasures;
  birthdate: string;
  userType: userTypeEnum;
  profileUrl: string;
  age: string;
  imc: string;
  isC: boolean;
  homeStatus: HomeStatus;
}

export type onAuthStateChangedAction = {
  // TODO resolve
  user: FirebaseAuthTypes.UserInfo;
  token: FirebaseAuthTypes.IdTokenResult;
};
