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
export interface SingUpState {
  fullName: string;
  phone: string;
  address: string;
  location: number[];
  gender: Gender | '';
  weight: string;
  stature: string;
  birthdate: string | Date;
  userType: 'healthUser' | 'normalUser' | '';
  healtInfo: HealtInfo;
}

export type updateUserFieldType = {
  field:
    | 'fullName'
    | 'phone'
    | 'address'
    | 'location'
    | 'gender'
    | 'weight'
    | 'stature'
    | 'birthdate'
    | 'userType';
  value: number[] & '' & (string | Date);
};

export type HealtInfoAction = {
  field: keyof HealtInfo;
  value: 'yes' | 'not' | 'not know' | '';
};
