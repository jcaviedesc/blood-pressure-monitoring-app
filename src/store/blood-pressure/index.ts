import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type {
  BloodPressureState,
  ReminderTimeAction,
  Reminders,
  setRepeatReminderAction,
} from './types';
export * from './selectors';
import { postRequestBloodPressure } from '../../thunks/blood-pressure/blood-pressure-thunk';
import { findMonitors } from '../../thunks/blood-pressure/monitors-thunk';

/* ------------- blood pressure Initial State ------------- */
const initialState: BloodPressureState = {
  todayRecords: [],
  dateLastMeasuring: '',
  recordsPerWeek: {
    records: undefined,
    sysAvg: undefined,
    diaAvg: undefined,
  },
  reminderStage: 'normal',
  activeNotificationRemider: 'normal',
  reminders: {
    normal: {
      reschedule: true,
      repeat: ['monday'],
      times: [''],
    },
    hta1: {
      reschedule: false,
      repeat: ['tuesday,thursday,saturday'],
      times: ['', ''],
    },
    hta2: {
      reschedule: false,
      repeat: [
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
        'sunday',
      ],
      times: ['', '', ''],
    },
    custom: {
      reschedule: false,
      repeat: ['monday'],
      times: [''],
    },
  },
  monitors: [],
};

export const bloodPressureSlice = createSlice({
  name: 'blood-pressure',
  initialState,
  reducers: {
    setReminderTime: (state, action: PayloadAction<ReminderTimeAction>) => {
      const { stage, value } = action.payload;
      const [stageName, index]: string[] = stage.split('.');
      let times = state.reminders[stageName as keyof Reminders].times;
      times[parseInt(index, 10)] = value;
      state.reminders[stageName as keyof Reminders].times = times;
      state.reminders[stageName as keyof Reminders].reschedule = true;
    },
    setRepeatReminder: (
      state,
      action: PayloadAction<setRepeatReminderAction>,
    ) => {
      const { reminder, repeat } = action.payload;
      state.reminders[reminder as keyof Reminders].repeat = repeat;
      state.reminders[reminder as keyof Reminders].reschedule = true;
    },
    setReminderStage: (state, action: PayloadAction<keyof Reminders>) => {
      const activeNotificationRemider = state.activeNotificationRemider;
      const beforeReminderStage = state.reminderStage;
      const incomingRemiderStage = action.payload;
      state.reminderStage = incomingRemiderStage;
      state.reminders[beforeReminderStage].reschedule = false;
      state.reminders[incomingRemiderStage].reschedule =
        activeNotificationRemider !== incomingRemiderStage;
    },
    rescheduledReminderSuccess: (
      state,
      action: PayloadAction<keyof Reminders>,
    ) => {
      const reminder = action.payload;
      state.activeNotificationRemider = reminder;
      state.reminders[reminder].reschedule = false;
    },
    restore: () => {
      return initialState;
    },
    addTodayRecord: (state, action) => {
      state.todayRecords = [action.payload];
    },
    clearTodayRecords: state => {
      state.todayRecords = [];
    },
  },
  extraReducers: builder => {
    builder.addCase(postRequestBloodPressure.fulfilled, state => {
      state.records = state.records.slice(2);
    });
    builder.addCase(findMonitors.fulfilled, (state, action) => {
      state.monitors = action.payload;
    });
  },
});

export const {
  setReminderTime,
  setReminderStage,
  rescheduledReminderSuccess,
  setRepeatReminder,
  addTodayRecord,
  clearTodayRecords,
} = bloodPressureSlice.actions;

export default bloodPressureSlice.reducer;
