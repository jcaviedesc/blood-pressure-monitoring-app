import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type {
  BloodPressureState,
  UpdateCurrentRecordAction,
  ReminderTimeAction,
  Reminders,
} from './types';
export * from './selectors';
import { postRequestBloodPressure } from '../../thunks/blood-pressure';

/* ------------- blood pressure Initial State ------------- */
const initialState: BloodPressureState = {
  records: [],
  currentRecord: {
    sys: '0',
    dia: '0',
    bpm: '0',
    datetime: '',
  },
  observations: '',
  lastMeasuring: '',
  recordsPerWeek: {
    records: undefined,
    sysAvg: undefined,
    diaAvg: undefined,
  },
  reminderStage: 'normal',
  reminders: {
    normal: {
      reschedule: true,
      repeat: '',
      times: [''],
    },
    hta1: {
      reschedule: false,
      repeat: '',
      times: ['', ''],
    },
    hta2: {
      reschedule: false,
      repeat: '',
      times: ['', '', ''],
    },
    custom: {
      reschedule: false,
      repeat: '',
      times: [''],
    },
  },
};

export const bloodPressureSlice = createSlice({
  name: 'blood-pressure',
  initialState,
  reducers: {
    clear: state => {
      state.records = [];
    },
    addRecord: state => {
      state.records.push(state.currentRecord);
      state.lastMeasuring = state.currentRecord.datetime;
      state.currentRecord = initialState.currentRecord;
    },
    updateCurrentRecord: (
      state,
      action: PayloadAction<UpdateCurrentRecordAction>,
    ) => {
      const { field, value } = action.payload;
      const newCurrentRecor = { ...state.currentRecord, [field]: value };
      state.currentRecord = newCurrentRecor;
    },
    addObservations: (state, action: PayloadAction<string>) => {
      state.observations = action.payload;
    },
    setReminderTime: (state, action: PayloadAction<ReminderTimeAction>) => {
      const { stage, value } = action.payload;
      const [stageName, index]: string[] = stage.split('.');
      // Todo revisar el type-safe
      let times = state.reminders[stageName as keyof Reminders].times;
      times[parseInt(index, 10)] = value;
      state.reminders[stageName as keyof Reminders].times = times;
      state.reminders[stageName as keyof Reminders].reschedule = true;
    },
    setReminderStage: (state, action: PayloadAction<keyof Reminders>) => {
      const beforeReminderStage = state.reminderStage;
      const incomingRemiderStage = action.payload;
      state.reminderStage = incomingRemiderStage;
      state.reminders[beforeReminderStage].reschedule = false;
      state.reminders[incomingRemiderStage].reschedule = true;
    },
    rescheduledReminderSuccess: (
      state,
      action: PayloadAction<keyof Reminders>,
    ) => {
      state.reminders[action.payload].reschedule = false;
    },
  },
  extraReducers: builder => {
    builder.addCase(postRequestBloodPressure.fulfilled, state => {
      state.records = state.records.slice(2);
    });
  },
});

export const {
  addRecord,
  updateCurrentRecord,
  addObservations,
  setReminderTime,
  setReminderStage,
  rescheduledReminderSuccess,
} = bloodPressureSlice.actions;

export default bloodPressureSlice.reducer;
