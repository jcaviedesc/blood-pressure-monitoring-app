import type { RootState } from '../configureStore';
import type { Reminders } from './types';

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
  const userName = state.user?.detail.name ?? '';
  return { activeReminder, reminderData, userName };
};

export const selectMonitors = (state: RootState) => {
  return state.bloodPressure.monitors;
};
