import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../configureStore';
import type { BloodPressureState, updateCurrentRecordAction } from './types';

/* ------------- blood pressure Initial State ------------- */
const initialState: BloodPressureState = {
  records: [],
  currentRecord: {
    sys: 0,
    dia: 0,
    bpm: 0,
    datetime: '',
  },
};

export const bloodPressureSlice = createSlice({
  name: 'blood-pressure',
  initialState,
  reducers: {
    addRecord: state => {
      state.records.push(state.currentRecord);
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
  },
});

export const { addRecord, updateCurrentRecord } = bloodPressureSlice.actions;

export const selectCurrentRecord = (state: RootState) =>
  state.bloodPressure.currentRecord;

export default bloodPressureSlice.reducer;
