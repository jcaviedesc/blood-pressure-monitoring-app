import { createAsyncThunk } from '@reduxjs/toolkit';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { ClientApi, RootState } from '../store/configureStore';
import type { RootStackParamList } from '../router/types';
import { selectBloodPressureMeasuring } from '../store/blood-pressure';
import dayjs from '../services/DatatimeUtil';

type Router = NativeStackScreenProps<
  RootStackParamList,
  'BloodPressure/MeasuringFinish'
>;

export const postRequestBloodPressure = createAsyncThunk<
  object,
  Router['navigation'],
  {
    extra: ClientApi;
    state: RootState;
  }
>(
  'blood-pressure/request-post',
  async (navigation, { getState, extra: clientApi, rejectWithValue }) => {
    let body = {
      datetime: dayjs().utc().format(),
      user_id: 'testing',
      location: [0.9, 0.1],
    };

    const BPdata = selectBloodPressureMeasuring(getState());
    body = { ...body, ...BPdata };

    const response = await clientApi.registerBloodPressureRecord(body);

    if (response.status !== 201) {
      console.log('Response ERROR', response);
      return rejectWithValue(response.data);
      // TODO handle error message
    }

    navigation.navigate('Home/BloodPressure');
    return Promise.resolve(response.data);
  },
);
