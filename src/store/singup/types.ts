export enum Gender {
  male = 'male',
  female = 'female',
}

export interface User {
  fullName: string;
  phone: string;
  address: string;
  location: Array<number>;
  gender: Gender;
  weight: number;
  birtdate: string;
}

export interface SingUpState {
  user: User;
}
