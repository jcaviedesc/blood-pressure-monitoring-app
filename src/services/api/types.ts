type Meassure = {
  val: string;
  unit: 'm' | 'Kg';
};

export type RegisterUser = {
  address: string;
  location?: number[];
  sex: string;
  birthdate: string;
  height: Meassure;
  weight: Meassure;
  user_type: number;
  healt_questions?: object;
  profile_url?: string;
};

export type Medicine = {
    id: string
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
    user_id: string
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
