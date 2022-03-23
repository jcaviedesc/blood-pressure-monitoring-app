import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../configureStore';
import type {
  BloodPressureState,
  updateCurrentRecordAction,
  TotalRecords,
} from './types';

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
      action: PayloadAction<updateCurrentRecordAction>,
    ) => {
      const { field, value } = action.payload;
      const newCurrentRecor = { ...state.currentRecord, [field]: value };
      state.currentRecord = newCurrentRecor;
    },
    addObservations: (state, action: PayloadAction<string>) => {
      state.observations = action.payload;
    },
  },
});

export const { addRecord, updateCurrentRecord, addObservations } =
  bloodPressureSlice.actions;

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

export default bloodPressureSlice.reducer;
