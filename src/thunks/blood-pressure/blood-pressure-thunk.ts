import crashlytics from '@react-native-firebase/crashlytics';
import notifee, {
  RepeatFrequency,
  AndroidImportance,
  AndroidVisibility,
  TimestampTrigger,
  TriggerType,
  AndroidChannel,
} from '@notifee/react-native';
import { capitalize } from 'lodash';
import {
  selectCurrentReminder,
  rescheduledReminderSuccess,
} from '../../store/blood-pressure';
import type { AppDispatch, AppGetState } from '../../store/configureStore';
import dayjs, { weekdays } from '../../services/DatetimeUtil';
import { createTriggerNotificationService } from '../../services/NotificationService';
import { translate } from '../../providers/LocalizationProvider';
import { Platform } from 'react-native';

const BloodPressurePrefix = '$bp';
const BLOOD_PRESSURE_CHANNEL_ID = 'bloodpressure';

export const createNotifications = () => {
  return async (dispatch: AppDispatch, getState: AppGetState) => {
    const {
      reminderData: { times, reschedule, repeat },
      activeReminder,
      userName,
    } = selectCurrentReminder(getState());

    if (reschedule) {
      const notificationsList: Promise<string>[] = [];

      // i18n notification config
      const notificationTitle = translate(
        'notifications.blood_pressure.title',
        {
          name: capitalize(userName),
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
      let bloodPressureChannelId = BLOOD_PRESSURE_CHANNEL_ID;
      if (Platform.OS === 'android') {
        // revisamos si es channel existe
        const isChannelCreated = await notifee.getChannel(
          BLOOD_PRESSURE_CHANNEL_ID,
        );
        if (!isChannelCreated) {
          const channel: AndroidChannel = {
            id: BLOOD_PRESSURE_CHANNEL_ID,
            name: notificationChannel,
            bypassDnd: true,
            importance: AndroidImportance.HIGH,
            // vibrationPattern: [1000, 1000],
            visibility: AndroidVisibility.PUBLIC,
            description: translate(
              'notifications.blood_pressure.android_channel_description',
            ),
          };
          bloodPressureChannelId = await notifee.createChannel(channel);
        }
      }

      // get curred weekday
      const currentDate = dayjs();
      repeat
        .map(repeatday => repeatday.split(','))
        .flat()
        .forEach(reminderDay => {
          const indexDay = weekdays.indexOf(reminderDay);
          const triggerWeekDay = currentDate.weekday(indexDay);

          times.forEach((timeEvent, index) => {
            let dayjsNotification = dayjs(timeEvent);
            if (dayjs(dayjsNotification).isValid()) {
              const hour = dayjsNotification.hour();
              const min = dayjsNotification.minute();
              let triggerTimestamp = triggerWeekDay
                .hour(hour)
                .minute(min)
                .second(0);

              if (triggerTimestamp.isBefore(currentDate)) {
                triggerTimestamp = triggerTimestamp.add(7, 'day');
              }

              const trigger: TimestampTrigger = {
                type: TriggerType.TIMESTAMP,
                timestamp: triggerTimestamp.valueOf(),
                repeatFrequency: RepeatFrequency.WEEKLY,
              };

              notificationsList.push(
                createTriggerNotificationService({
                  notification: {
                    id: `$bp.${activeReminder}.${index}`,
                    ...notificationData,
                  },
                  triggerConfig: trigger,
                  channelId: bloodPressureChannelId,
                }),
              );
            }
          });
        });

      // TODO manejar errores
      await Promise.all(notificationsList)
        .then(() => {
          dispatch(rescheduledReminderSuccess(activeReminder));
        })
        .catch(error => {
          // TODO ver que mas se le puede agregar. quiza un retry
          crashlytics().recordError(error);
        });
      // .finally(() => {
      //   dispatch(rescheduledReminderSuccess(activeReminder));
      // });
    }
  };
};
