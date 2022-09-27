import notifee, {
  TimestampTrigger,
  AndroidChannel,
  Notification,
} from '@notifee/react-native';
import { Colors } from '../styles';

type Params = {
  notification: Notification;
  triggerConfig: TimestampTrigger;
  channelId: AndroidChannel['id'];
};

export async function createTriggerNotificationService({
  notification,
  triggerConfig,
  channelId,
}: Params) {
  const { id, title, data, body, ios, android } = notification;
  return notifee.createTriggerNotification(
    {
      id,
      title,
      body,
      data,
      android: {
        ...android,
        channelId,
        smallIcon: 'ic_small_icon',
        color: Colors.tertiary,
        pressAction: {
          id: 'default',
        },
      },
      ios: { ...ios },
    },
    triggerConfig,
  );
}
