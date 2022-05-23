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
  repeat: string[];
  times: string[];
};

export type Reminders = {
  normal: RemindersTime;
  hta1: RemindersTime;
  hta2: RemindersTime;
  custom: RemindersTime;
};

export type Monitor = {
  brand: string;
  model: string;
  measurementSite: string;
  use: string;
  validationStudy: string;
  img: string;
  measurementMethod: string;
  additional?: string;
};

export interface BloodPressureState {
  records: BloodPressureRecord[];
  currentRecord: BloodPressureRecord;
  lastMeasuring: string;
  observations: string;
  recordsPerWeek: GetRecords;
  reminderStage: keyof Reminders;
  activeNotificationRemider: keyof Reminders;
  reminders: Reminders;
  monitors: Monitor[];
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

export type setRepeatReminderAction = {
  reminder: keyof Reminders;
  repeat: string[];
};
