import type { RootState } from '../configureStore';
import type { TotalRecords, Reminders } from './types';

export const selectCurrentRecord = (state: RootState) =>
  state.bloodPressure.currentRecord;

export const selectTotalRecords = (state: RootState): TotalRecords => {
  const totalRecords = state.bloodPressure.records.length;
  return { totalRecords, isMeasuringComplete: totalRecords % 2 > 0 };
};

export const selectResumeRecords = (state: RootState) => {
  const totalRecords = state.bloodPressure.records.length;
  let records = state.bloodPressure.records;
  if (totalRecords > 2) {
    records = state.bloodPressure.records.slice(0, 2);
  }
  const transformRecords = records.map(({ sys, dia, bpm }) => {
    return {
      bloodPressure: `${sys}/${dia} mmHg`,
      heartRate: `${bpm} pul/min`,
    };
  });
  return transformRecords;
};

export const selectBloodPressureMeasuring = (state: RootState) => {
  const { records, observations } = state.bloodPressure;
  return {
    records: records.slice(0, 2),
    why: observations,
  };
};

export const selectRecordPerWeek = (state: RootState) =>
  state.bloodPressure?.recordsPerWeek ?? {};

export const selectReminders = (state: RootState) => {
  const reminders = state.bloodPressure?.reminders ?? {};
  const selectedReminder = state.bloodPressure?.reminderStage;
  return { selectedReminder, reminders };
};

export const selectActiveReminderTime = (
  reminders: Reminders,
  path: string,
) => {
  const [reminder, index] = path.split('.');
  const currentActiveReminderTime =
    reminders[reminder as keyof Reminders].times[parseInt(index, 10)];
  // TODO mejor el manejo de esto para no crear un objeto cada ves que se llama esta funcion
  return currentActiveReminderTime;
};

export const selectCurrentReminder = (state: RootState) => {
  const activeReminder = state.bloodPressure?.reminderStage;
  const reminderData = state.bloodPressure?.reminders[activeReminder];
  //TODO revisar si esta bien hacer esto
  const userName = state.user?.profile.fullName ?? '';
  return { activeReminder, reminderData, userName };
};

export const selectMonitors = (state: RootState) => {
  return state.bloodPressure.monitors;
};
