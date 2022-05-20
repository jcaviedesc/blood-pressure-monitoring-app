import notifee, {
  TimestampTrigger,
  AndroidChannel,
  Notification,
} from '@notifee/react-native';
import { Colors } from '../styles';

export async function createTriggerNotificationService(
  notificationId: string,
  notification: Notification,
  trigger: TimestampTrigger,
  channel: AndroidChannel,
) {
  const { title, body, data } = notification;

  // Create a channel
  const channelId = await notifee.createChannel(channel);

  return notifee.createTriggerNotification(
    {
      id: notificationId,
      title,
      body,
      data,
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
