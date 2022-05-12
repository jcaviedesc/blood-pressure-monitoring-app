export type BloodPressureRecord = {
  sys: string;
  dia: string;
  bpm: string;
  datetime: string;
};

type GetRecords = {
  records: BloodPressureRecord[];
  sysAvg?: number;
  diaAvg?: number;
  interval?: string;
  startInterval?: string;
};

export interface BloodPressureState {
  records: BloodPressureRecord[];
  currentRecord: BloodPressureRecord;
  lastMeasuring: string;
  observations: string;
  recordsPerWeek: GetRecords;
}

export type updateCurrentRecordAction = {
  field: keyof BloodPressureRecord;
  value: number | string;
};

export type TotalRecords = {
  totalRecords: number;
  isMeasuringComplete: boolean;
};
