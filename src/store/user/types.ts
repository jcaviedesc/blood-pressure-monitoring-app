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
  userType: string;
  healtInfo?: object;
  profileUrl: string;
  age: string;
  imc: string;
};

export interface UserState {
  profile: userFromApi;
  homeStatus: HomeStatus;
}
