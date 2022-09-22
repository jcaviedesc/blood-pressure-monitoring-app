import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ClientApi, RootState } from '../../store/configureStore';

export const findMonitors = createAsyncThunk<
  object,
  string,
  {
    extra: ClientApi;
    state: RootState;
  }
>(
  'blood-pressure/find-monitors',
  async (search, { extra: clientApi, rejectWithValue }) => {
    // TODO select language
    try {
      const response = await clientApi.findBloodPressureMonitor({ q: search });
      return Promise.resolve(response.data);
    } catch (error) {
      return rejectWithValue(error?.message);
    }
  },
);
