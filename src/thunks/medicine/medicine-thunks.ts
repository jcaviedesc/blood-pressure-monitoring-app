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
    
    if (response.status >= 300) {
      crashlytics().recordError(response.error);
      return rejectWithValue(response.data);
      // TODO handle error message
    }

    return Promise.resolve(response.data);
  },
);

export const fetchAddMedicine = createAsyncThunk<
  object,
  object,
  {
    extra: ClientApi;
    state: RootState;
  }
>(
  'medicine-create',
  async (Medicine, { extra: clientApi, rejectWithValue }) => {
    // TODO select language
   

    try {
      const buildRequestData = Medicine;
      const response = await clientApi.addMedicine(buildRequestData);
      console.log('response',response)
      return Promise.resolve(response.data);
    } catch (error) {
      console.log('errror',error.message.detail)
      return rejectWithValue(error);
    }
  },
);
