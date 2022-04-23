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
export interface SingUpState {
  fullName: string;
  docId: string; // cedula, dni, documento de identificaion
  phone: string;
  address: string;
  location: number[];
  gender: Gender;
  weight: string;
  height: string;
  birthdate: string;
  userType: 'healthUser' | 'normalUser' | '';
  healtInfo: HealtInfo;
  picture: Picture;
}

export type updateUserFieldType = {
  field: keyof SingUpState;
  value: number[] & '' & string & Date & Picture;
};

export type HealtInfoAction = {
  field: keyof HealtInfo;
  value: 'yes' | 'not' | 'not know' | '';
};
