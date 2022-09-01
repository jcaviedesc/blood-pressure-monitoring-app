import crashlytics from '@react-native-firebase/crashlytics';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ClientApi, RootState } from '../../store/configureStore';

export const fetchListMedicine = createAsyncThunk<
  void,
  void,
  {
    extra: ClientApi;
    state: RootState;
  }
>(
  'consult-medicine-up/',
  async (_: void, { extra: clientApi, rejectWithValue }) => {
    const response = await clientApi.consultListMedicine();

    console.log('test');
    
    if (response.status >= 300) {
      console.log('test - 1');
      console.log('test - 1 - 1', response);
      crashlytics().recordError(response.error);
      return rejectWithValue(response.data);
      // TODO handle error message
    }

    console.log('test - 2');

    return Promise.resolve(response.data);
  },
);
