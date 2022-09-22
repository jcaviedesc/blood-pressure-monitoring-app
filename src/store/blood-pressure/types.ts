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
  dateLastMeasuring: string;
  reminderStage: keyof Reminders;
  activeNotificationRemider: keyof Reminders;
  reminders: Reminders;
  monitors: Monitor[];
}

export type ReminderTimeAction = {
  stage: string;
  value: string;
};

export type setRepeatReminderAction = {
  reminder: keyof Reminders;
  repeat: string[];
};
