type Meassure = {
  val: string;
  unit: 'm' | 'Kg';
};

export type RegisterUser = {
  full_name: string;
  phone_number: string;
  address: string;
  location?: number[];
  gender: string;
  birthdate: string;
  height: Meassure;
  weight: Meassure;
  user_type: number;
  health_info?: object;
  profile_url?: string;
};

export type BPRecord = {
  sys: number;
  dia: number;
  bpm: number;
  datetime: string;
};

export type BPMeasuring = {
  records: BPRecord[];
  xmsg?: string;
  datetime: string;
  location?: [number, number];
};
