import { useEffect } from 'react';
import notifee, { EventType, Notification } from '@notifee/react-native';
import crashlytics from '@react-native-firebase/crashlytics';
import messaging from '@react-native-firebase/messaging';
import getClientApi from '../services/api';

const clientApi = getClientApi();

const sendClinicalMonitoringResponse = async (notification: Notification) => {
  const { data } = notification;
  // patient id is document_id equal to Cedula de cidadania
  const body = {
    patient_id: data?.patient,
    status: 'approved',
  };

  try {
    await clientApi.patientResponseClinicalMonitoring(
      data?.patient as string,
      data?.id as string,
      body,
    );
  } catch (error) {
    crashlytics().log('clinical monitoring request ');
    crashlytics().recordError(error as Error);
  }
};

export function onMessageReceived(remoteMessage: any) {
  // console.log('Notifee', JSON.parse(remoteMessage.data.notifee));
  notifee.displayNotification(JSON.parse(remoteMessage.data.notifee));
}

export const useForegroundNotification = () => {
  useEffect(() => {
    const unsubscribe = messaging().onMessage(onMessageReceived);
    return unsubscribe;
  }, []);
};

export const registerBackgroundEventNotifee = () => {
  notifee.onBackgroundEvent(async ({ type, detail }) => {
    const { notification, pressAction } = detail;
    // Check if the user pressed the "accept" action
    if (
      type === EventType.ACTION_PRESS &&
      pressAction?.id === 'medical_records_access' &&
      notification
    ) {
      // Update clinical monitoring request
      const { data } = notification;
      // patient id is document_id equal to Cedula de cidadania
      const body = {
        patient_id: data?.patient,
        status: 'approved',
      };

      try {
        await clientApi.patientResponseClinicalMonitoring(
          data?.patient as string,
          data?.id as string,
          body,
        );
      } catch (error) {
        crashlytics().log('clinical monitoring request ');
        crashlytics().recordError(error as Error);
      }
      // Remove the notification
      await notifee.cancelNotification(notification?.id as string);
    }
  });
};

export const useForegroundEventNotifee = () => {
  useEffect(() => {
    notifee.onForegroundEvent(async ({ type, detail }) => {
      const { notification, pressAction } = detail;
      if (
        type === EventType.ACTION_PRESS &&
        pressAction?.id === 'medical_records_access' &&
        notification
      ) {
        await sendClinicalMonitoringResponse(notification);
        await notifee.cancelNotification(notification?.id as string);
      }
    });
  }, []);
};
