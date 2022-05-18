import notifee, {
  TimestampTrigger,
  TriggerType,
  RepeatFrequency,
  AndroidChannel
} from '@notifee/react-native';
import { Colors } from '../styles';

type Notification = {
  title: string;
  body: string;
};

export async function createTriggerNotificationService(
  notificationId: string,
  date: number,
  notification: Notification,
  frecuency: RepeatFrequency,
  channel: AndroidChannel,
) {
  const { title, body } = notification;

  // Create a channel
  const channelId = await notifee.createChannel(channel);

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
        pressAction: {
          id: 'default',
        },
      },
    },
    trigger,
  );
}
