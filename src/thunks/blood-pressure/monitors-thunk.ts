import crashlytics from '@react-native-firebase/crashlytics';
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
    const response = await clientApi.findBloodPressureMonitor({ q: search });

    if (response.status >= 300) {
      crashlytics().recordError(response.error);
      return rejectWithValue(response.data);
      // TODO handle error message
    }

    return Promise.resolve(response.data);
  },
);
