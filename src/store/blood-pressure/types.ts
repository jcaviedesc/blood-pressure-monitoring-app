export type BloodPressureRecord = {
  sys: string;
  dia: string;
  bpm: string;
  datetime: string;
};

type GetRecords = {
  records?: BloodPressureRecord[];
  sysAvg?: number;
  diaAvg?: number;
  interval?: string;
  startInterval?: string;
};

export type RemindersTime = {
  reschedule: boolean;
  repeat: string;
  times: string[];
};

export type Reminders = {
  normal: RemindersTime;
  hta1: RemindersTime;
  hta2: RemindersTime;
  custom: RemindersTime;
};

export interface BloodPressureState {
  records: BloodPressureRecord[];
  currentRecord: BloodPressureRecord;
  lastMeasuring: string;
  observations: string;
  recordsPerWeek: GetRecords;
  reminderStage: keyof Reminders;
  reminders: Reminders;
}

export type UpdateCurrentRecordAction = {
  field: keyof BloodPressureRecord;
  value: number | string;
};

export type TotalRecords = {
  totalRecords: number;
  isMeasuringComplete: boolean;
};

export type ReminderTimeAction = {
  stage: string;
  value: string;
};
