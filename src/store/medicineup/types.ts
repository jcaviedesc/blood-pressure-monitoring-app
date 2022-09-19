export interface MedicineUp {
  medicineQuestion: {id: string
  name: string,
  apparience: string,
  dose: {
    u: string,
    v: number
  },
  via: string,
  frecuency: string,
  times_per_day: number,
  days:Array<string>,
  every: number,
  times: Array<string>,
  ctd_at: string,
  utd_at: string,
  _id: string,
  user_id: string}
};

export interface MedicineUpState {
  medicineQuestion: {
    id: string
    name: string,
    apparience: string,
    dose: {
      unit: string,
      value: number
    },
    via: string,
    frecuency: string,
    times_per_day: number,
    days:Array<string>,
    every: number,
    times: Array<string>,
    ctd_at: string,
    utd_at: string,
    _id: string,
    user_id: string
  }
};

export type medicineFieldType = {
  field: keyof MedicineUpState;
  value: number[] | '' | string | Date | string[] | number;
};