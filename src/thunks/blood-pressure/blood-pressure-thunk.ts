import { createAsyncThunk } from '@reduxjs/toolkit';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import crashlytics from '@react-native-firebase/crashlytics';
import notifee, {
  RepeatFrequency,
  AndroidImportance,
  AndroidVisibility,
  TimestampTrigger,
  TriggerType,
} from '@notifee/react-native';
import { capitalize } from 'lodash';
import type { ClientApi, RootState } from '../../store/configureStore';
import type { RootStackParamList } from '../../router/types';
import {
  selectBloodPressureMeasuring,
  selectCurrentReminder,
  rescheduledReminderSuccess,
} from '../../store/blood-pressure';
import type { AppDispatch, AppGetState } from '../../store/configureStore';
import dayjs, { weekdays } from '../../services/DatatimeUtil';
import { createTriggerNotificationService } from '../../services/NotificationService';
import { translate } from '../../providers/LocalizationProvider';

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
      reminderData: { times, reschedule, repeat },
      activeReminder,
      userName,
    } = selectCurrentReminder(getState());

    if (reschedule) {
      const notifcationsList: Promise<string>[] = [];

      // i18n notification config
      const notificationTitle = translate(
        'notifications.blood_pressure.title',
        {
          name: capitalize(userName.split(' ')[0]),
        },
      );
      const notificationBody = translate('notifications.blood_pressure.body');
      const notificationChannel = translate(
        'notifications.blood_pressure.channel',
      );
      const notificationData = {
        title: notificationTitle,
        body: notificationBody,
        data: {
          navigateTo: 'BloodPressure/Preparation',
        },
      };

      // get all triggers ids
      const triggerIds = await notifee.getTriggerNotificationIds();
      // select triggerIds related to BloodPressurePrefix
      const bpTrigersIds = triggerIds.filter(id =>
        id.includes(BloodPressurePrefix),
      );
      //clear all trigger with $bp prefix
      if (bpTrigersIds.length) {
        await notifee.cancelTriggerNotifications(bpTrigersIds).catch(error => {
          crashlytics().log(`trigersId: ${bpTrigersIds}`);
          crashlytics().recordError(error);
        });
      }

      // create or update channel
      // TODO quiza puedo preguntar si esta o no creado el channel
      const channel = {
        id: 'bloodpressure',
        name: notificationChannel,
        bypassDnd: true,
        importance: AndroidImportance.HIGH,
        visibility: AndroidVisibility.PUBLIC,
        description: translate(
          'notifications.blood_pressure.android_channel_description',
        ),
      };

      // get curred weekday
      const currentDate = dayjs();
      const currentWeekDay = currentDate.weekday();

      repeat
        .map(repeatday => repeatday.split(','))
        .flat()
        .forEach(reminderDay => {
          console.log(reminderDay);
          const indexDay = weekdays.indexOf(reminderDay);
          let reminderDate = currentDate;
          if (indexDay > currentWeekDay) {
            reminderDate = currentDate.weekday(indexDay);
            //set normal
          } else {
            reminderDate = currentDate.add(7, 'day').weekday(indexDay);
          }

          times.forEach((timeEvent, index) => {
            let dayjsNotification = dayjs(timeEvent);
            if (dayjs(dayjsNotification).isValid()) {
              const hour = dayjsNotification.hour();
              const min = dayjsNotification.minute();
              //TODO add 1 day
              const timestamp = reminderDate.hour(hour).minute(min);
              console.log('timestamp', timestamp.format());
              const trigger: TimestampTrigger = {
                type: TriggerType.TIMESTAMP,
                timestamp: timestamp.valueOf(),
                repeatFrequency: RepeatFrequency.WEEKLY,
              };
              notifcationsList.push(
                createTriggerNotificationService(
                  `$bp.${activeReminder}.${index}`,
                  notificationData,
                  trigger,
                  channel,
                ),
              );
            }
          });
        });

      // TODO manejar errores
      await Promise.all(notifcationsList)
        .catch(error => {
          // TODO ver que mas se le puede agregar. quiza un retry
          crashlytics().recordError(error);
        })
        .finally(() => {
          dispatch(rescheduledReminderSuccess(activeReminder));
        });
    }
  };
};
