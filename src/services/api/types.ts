type Meassure = {
  val: string;
  unit: 'm' | 'Kg';
};

export type RegisterUser = {
  fullName: string;
  docId: string;
  phone: string;
};

export type RegisterCompleteUser = {
  address: string;
  location?: number[];
  sex: string;
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

export type BPbody = {
  records: BPRecord[];
  xmsg?: string;
  datetime: string;
  location?: [number, number];
};
