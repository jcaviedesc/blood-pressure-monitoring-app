export type BloodPressureRecord = {
  sys: number;
  dia: number;
  bpm: number;
  datetime: string;
};

export interface BloodPressureState {
  records: BloodPressureRecord[];
  currentRecord: BloodPressureRecord;
  lastMeasuring: string;
}

export type updateCurrentRecordAction = {
  field: keyof BloodPressureRecord;
  value: number | string;
};

export type TotalRecords = {
  totalRecords: number;
  isMeasuringComplete: boolean;
};
