export enum Gender {
  male = 'male',
  female = 'female',
}

export interface SingUpState {
  fullName: string;
  phone: string;
  address: string;
  location: Array<number>;
  gender: Gender | '';
  weight: string;
  stature: string;
  birthdate: string | Date;
}

export interface AppState {
  appIsLoaded: boolean;
  isOpenAppFirstTime: boolean;
  hasUserActiveSession: boolean;
}
