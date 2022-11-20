export enum SexEnum {
  male = 'male',
  female = 'female',
}

type ResponseOptions = 'yes' | 'not' | 'not know' | '';
type HealthQuestions = {
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
  healthQuestions: HealthQuestions;
  picture: Picture;
}

export type updateUserFieldType = {
  field: keyof SignUpState;
  value: number[] | '' | string | Date | Picture;
};

export type HealthInfoAction = {
  field: keyof HealthQuestions;
  value: 'yes' | 'not' | 'not know' | '';
};
