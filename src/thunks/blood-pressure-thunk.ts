import { createAsyncThunk } from '@reduxjs/toolkit';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import notifee, { RepeatFrequency } from '@notifee/react-native';
import { capitalize } from 'lodash';
import type { ClientApi, RootState } from '../store/configureStore';
import type { RootStackParamList } from '../router/types';
import {
  selectBloodPressureMeasuring,
  selectCurrentReminder,
  rescheduledReminderSuccess,
} from '../store/blood-pressure';
import type { AppDispatch, AppGetState } from '../store/configureStore';
import dayjs from '../services/DatatimeUtil';
import { createTriggerNotificationService } from '../services/NotificationService';
import { translate } from '../providers/LocalizationProvider';

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

const BloodPressurePrefix = '$bp';

export const createNotificaions = () => {
  return async (dispatch: AppDispatch, getState: AppGetState) => {
    const {
      reminderData: { times, reschedule },
      activeReminder,
      userName,
    } = selectCurrentReminder(getState());

    if (reschedule) {
      const notifcationsList: Promise<string>[] = [];
      const newNotificationTimes: string[] = [];
      // i18n notification config
      const notificationTitle = translate('notifications.bloodPressure.title', {
        name: capitalize(userName[0]),
      });
      const notificationBody = translate('notifications.bloodPressure.body');
      const notificationChannel = translate(
        'notifications.bloodPressure.channel',
      );
      const notificationData = {
        title: notificationTitle,
        body: notificationBody,
      };

      // get all triggers ids
      const triggerIds = await notifee.getTriggerNotificationIds();
      // select triggerIds related to BloodPressurePrefix
      const bpTrigersIds = triggerIds.filter(id =>
        id.includes(BloodPressurePrefix),
      );
      //clear all trigger with $bp prefix
      await notifee.cancelTriggerNotifications(bpTrigersIds);

      times.forEach((timeEvent, index) => {
        let dayjsNotification = dayjs(timeEvent);
        if (!dayjs(dayjsNotification).isValid()) {
          dayjsNotification = dayjs().add(index + 1, 'hour');
          newNotificationTimes.push(dayjsNotification.format());
        }
        newNotificationTimes.push(timeEvent);
        const hour = dayjsNotification.hour();
        const min = dayjsNotification.minute();
        const timestamp = dayjs().hour(hour).minute(min);
        console.log("timestamp", timestamp.format());
        const channel = {
          id: 'bloodpressure',
          name: notificationChannel,
        };

        notifcationsList.push(
          createTriggerNotificationService(
            `$bp.${activeReminder}.${index}`,
            timestamp.valueOf(),
            notificationData,
            RepeatFrequency.HOURLY,
            channel,
          ),
        );
      });
      // TODO manejar errores
      await Promise.all(notifcationsList);
      dispatch(
        rescheduledReminderSuccess({
          reminder: activeReminder,
          times: newNotificationTimes,
        }),
      );
    }
  };
};
