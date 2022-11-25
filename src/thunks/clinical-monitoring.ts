import { createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState, ClientApi } from '../store/configureStore';

export const requestAccessToClinicalMonitoringPatient = createAsyncThunk<
  any,
  number,
  {
    extra: ClientApi;
    state: RootState;
  }
>(
  'clinical-monitoring/request',
  async function requestClinicalMonitoring(
    documentId,
    { extra: clientApi, rejectWithValue },
  ) {
    // TODO get device info
    try {
      await clientApi.requestClinicalMonitoringPatient(documentId);
      return Promise.resolve();
    } catch (error) {
      return rejectWithValue(error?.message?.detail);
    }
  },
);

export const getClinicalMonitoringPatients = createAsyncThunk<
  any,
  Record<string, string | number>,
  {
    extra: ClientApi;
    state: RootState;
  }
>(
  'clinical-monitoring/patients',
  async function ClinicalMonitoringPatients(
    filters,
    { extra: clientApi, rejectWithValue },
  ) {
    // TODO get device info
    try {
      const response = await clientApi.getPatients(filters);
      return Promise.resolve({ data: response.data, params: filters });
    } catch (error) {
      return rejectWithValue(error?.message?.detail);
    }
  },
);
