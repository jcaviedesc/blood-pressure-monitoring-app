import React from 'react';
import { BackHandler, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

type UseBackHandlerExitApp = {
  alertTitle: string;
  alertDescription: string;
  alertOkText: string;
  alertCancelText: string;
};

type HardwareHandler = () => boolean;

export const useBackHandler = (onHardwareBackPress: HardwareHandler) => {
  useFocusEffect(
    React.useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', onHardwareBackPress);

      return () =>
        BackHandler.removeEventListener(
          'hardwareBackPress',
          onHardwareBackPress,
        );
    }, [onHardwareBackPress]),
  );
};

export const useBackHandlerExitApp = ({
  alertTitle,
  alertDescription,
  alertOkText,
  alertCancelText,
}: UseBackHandlerExitApp) => {
  const backAction = () => {
    // Espera! 'Hold on!
    // Seguro quieres salir de la applicación? 'Are you sure you want to go back?
    Alert.alert(alertTitle, alertDescription, [
      {
        text: alertCancelText,
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: alertOkText,
        onPress: () => BackHandler.exitApp(),
      },
    ]);
    return true;
  };

  useBackHandler(backAction);
};
