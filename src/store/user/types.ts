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
  avatar: string;
  // homeStatus: HomeStatus;
}

export type UpdateUserProfieAction = {
  [index in keyof UserState]: any;
};
