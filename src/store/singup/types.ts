export enum Gender {
  male = 'male',
  female = 'female',
}

type HealtInfo = {
  medicine: 'yes' | 'not' | 'not know' | '';
  smoke: 'yes' | 'not' | 'not know' | '';
  heartAttack: 'yes' | 'not' | 'not know' | '';
  thrombosis: 'yes' | 'not' | 'not know' | '';
  nephropathy: 'yes' | 'not' | 'not know' | '';
};

type Picture = {
  uri: string;
  type: string;
};

export type userState = {
  fullName: string;
  phone: string;
  address: string;
  location: number[];
  gender: Gender | '';
  weight: string;
  stature: string;
  birthdate: string;
  userType: 'healthUser' | 'normalUser' | '';
  healtInfo: HealtInfo;
  picture: Picture;
};
export interface SingUpState {
  user: userState;
  loading: boolean;
}

export type updateUserFieldType = {
  field: keyof userState;
  value: number[] & '' & (string | Date) & Picture;
};

export type HealtInfoAction = {
  field: keyof HealtInfo;
  value: 'yes' | 'not' | 'not know' | '';
};
