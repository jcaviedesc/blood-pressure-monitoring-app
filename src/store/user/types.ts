export type Measurement = {
  category: string;
  lastMeasurement: string;
  name: string;
  status: string;
  unit: string;
  value: number | string;
};

export enum userRole {
  HEALTH_PROFESSIONAL = 1,
  PATIENT = 2,
}

export interface IUserDetail {
  isProfessional: boolean;
  id: string;
  name: string;
  docId: string;
  lastName: string;
  phone: string;
  address: string;
  location?: number[];
  sex: string;
  birthdate: string;
  role: userRole;
  avatar: string;
  age: string;
  bmi: string;
  measurements: Measurement[];
  createdAt: string;
  updatedAt: string;
}
export interface UserState {
  detail: IUserDetail;
  lastSyncDatetime: string;
  deviceToken?: string;
  loading: string;
  currentRequestId?: string;
  error?: string;
  // homeStatus: HomeStatus;
}

export type UpdateUserProfieAction = {
  [index in keyof IUserDetail]?: any;
};
