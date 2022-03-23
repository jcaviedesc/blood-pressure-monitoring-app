export type BloodPressureRecord = {
  sys: string;
  dia: string;
  bpm: string;
  datetime: string;
};

export interface BloodPressureState {
  records: BloodPressureRecord[];
  currentRecord: BloodPressureRecord;
  lastMeasuring: string;
  observations: string;
}

export type updateCurrentRecordAction = {
  field: keyof BloodPressureRecord;
  value: number | string;
};

export type TotalRecords = {
  totalRecords: number;
  isMeasuringComplete: boolean;
};
