import { createSlice } from '@reduxjs/toolkit';
import { getClinicalMonitoringPatients } from '../thunks/clinical-monitoring';
import type { RootState } from './configureStore';
import { ClinicalMonitoringState } from './types';

const initialState: ClinicalMonitoringState = {
  patients: [],
  loading: 'idle',
  currentRequestId: undefined,
  error: null,
};

export const clinicalMonitoringSlice = createSlice({
  name: 'clinicalMonitoring',
  initialState,
  reducers: {
    clear: state => {
      state.patients = [];
    },
    reset: () => {
      return initialState;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getClinicalMonitoringPatients.pending, (state, action) => {
        if (state.loading === 'idle') {
          state.loading = 'pending';
          state.patients = [];
          state.currentRequestId = action.meta.requestId;
        }
      })
      .addCase(getClinicalMonitoringPatients.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        if (
          state.loading === 'pending' &&
          state.currentRequestId === requestId
        ) {
          state.loading = 'idle';
          state.patients = action.payload;
          state.currentRequestId = undefined;
        }
        state.patients = action.payload;
      })
      .addCase(getClinicalMonitoringPatients.rejected, (state, action) => {
        const { requestId } = action.meta;
        if (
          state.loading === 'pending' &&
          state.currentRequestId === requestId
        ) {
          state.loading = 'idle';
          state.error = action.error;
          state.currentRequestId = undefined;
        }
      });
  },
});

export const { clear, reset } = clinicalMonitoringSlice.actions;

export const selectPatientsForMonitoring = (state: RootState) => {
  return {
    data: state.clinicalMonitoring.patients,
    loading: state.clinicalMonitoring.loading,
  };
};

export default clinicalMonitoringSlice.reducer;
