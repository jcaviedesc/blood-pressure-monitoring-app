export enum SexEnum {
  male = 'male',
  female = 'female',
}

type ResponseOptions = 'yes' | 'not' | 'not know' | '';
type HealtQuestions = {
  medicine: ResponseOptions;
  smoke: ResponseOptions;
  heartAttack: ResponseOptions;
  thrombosis: ResponseOptions;
  nephropathy: ResponseOptions;
};

type Picture = {
  uri: string;
  type: string;
};

export type firstRegistrationResponse = {
  id: string | number;
  fullName: string;
  docId: string;
  phone: string;
};
export interface SignUpState {
  id?: string | number;
  name: string;
  lastName: string;
  docId: string; // cedula, DNI, pasaporte
  phone: string;
  address: string;
  location: number[];
  sex: SexEnum;
  weight: string;
  height: string;
  birthdate: string;
  userType: 'health professional' | 'patient' | '';
  healtQuestions: HealtQuestions;
  picture: Picture;
}

export type updateUserFieldType = {
  field: keyof SignUpState;
  value: number[] | '' | string | Date | Picture;
};

export type HealtInfoAction = {
  field: keyof HealtQuestions;
  value: 'yes' | 'not' | 'not know' | '';
};
