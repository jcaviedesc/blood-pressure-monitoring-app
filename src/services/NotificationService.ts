import notifee, {
  TimestampTrigger,
  TriggerType,
  RepeatFrequency,
} from '@notifee/react-native';
import { Colors } from '../styles';

type Notification = {
  title: string;
  body: string;
};

export function createTriggerNotificationService(
  notificationId: string,
  date: number,
  notification: Notification,
  frecuency: RepeatFrequency,
  channelId: string = 'default',
) {
  const { title, body } = notification;

  const trigger: TimestampTrigger = {
    type: TriggerType.TIMESTAMP,
    timestamp: date,
    repeatFrequency: frecuency,
  };

  return notifee.createTriggerNotification(
    {
      id: notificationId,
      title,
      body,
      android: {
        channelId,
        smallIcon: 'ic_small_icon',
        color: Colors.tertiary,
      },
    },
    trigger,
  );
}
