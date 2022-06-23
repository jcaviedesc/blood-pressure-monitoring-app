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
// State
export interface BloodPressureState {
  todayRecords: BloodPressureRecord[];
  dateLastMeasuring: string;
  recordsPerWeek: GetRecords;
  reminderStage: keyof Reminders;
  activeNotificationRemider: keyof Reminders;
  reminders: Reminders;
  monitors: Monitor[];
}

// Actions Types
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
