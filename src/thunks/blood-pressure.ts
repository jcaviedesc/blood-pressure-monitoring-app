import { createAsyncThunk } from '@reduxjs/toolkit';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  TimestampTrigger,
  TriggerType,
  RepeatFrequency,
} from '@notifee/react-native';
import type { ClientApi, RootState } from '../store/configureStore';
import type { RootStackParamList } from '../router/types';
import {
  selectBloodPressureMeasuring,
  selectCurrentReminder,
} from '../store/blood-pressure';
import type { AppDispatch, AppGetState } from '../store/configureStore';
import dayjs from '../services/DatatimeUtil';
import { createTriggerNotificationService } from '../services/NotificationService';

type Router = NativeStackScreenProps<
  RootStackParamList,
  'BloodPressure/MeasuringFinish'
>;

type NotificationConfig = {
  title: string;
  body: string;
};

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

export const createNotificaions = (notification: NotificationConfig) => {
  return async (dispatch: AppDispatch, getState: AppGetState) => {
    const { reminderData, activeReminder, isConfigured } = selectCurrentReminder(getState());
    const notifcationsList: Promise<string>[] = [];
    console.log({ reminderData, activeReminder, isConfigured });
    reminderData.times.forEach((timeEvent, index) => {
      if (dayjs(timeEvent).isValid()) {
        const date = dayjs(timeEvent);
        const hour = date.hour();
        const min = date.minute();
        console.log("date", date.format(), hour, min)
        const timestamp = dayjs().hour(hour).minute(min);
        console.log("timestamp", timestamp.format());
        notifcationsList.push(
          createTriggerNotificationService(
            `${activeReminder}.${index}`,
            timestamp.valueOf(),
            notification,
            RepeatFrequency.NONE,
            'blood-pressure',
          ),
        );
      } else {
        // Throw error
        console.log("not valid date")
      }
    });
    const result = await Promise.all(notifcationsList);
    console.log("result ", result);
  };
};
