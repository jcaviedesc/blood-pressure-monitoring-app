import { useRef } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Animated, Easing } from 'react-native';
import type { RootStackParamList } from '../router/types';

export const useTitleScroll = (
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    keyof RootStackParamList
  >,
  titleHeader: string,
) => {
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const fadeIn = (onFinish: Animated.EndCallback | undefined) => {
    // Will change fadeAnim value to 1 in 1 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start(onFinish);
  };

  const fadeOut = (onFinish: Animated.EndCallback | undefined) => {
    // Will change fadeAnim value to 0 in 1 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 1000,
      easing: Easing.bezier(0, 1.02, 0.76, 0.99),
      useNativeDriver: false,
    }).start(onFinish);
  };

  const setHeaderTitleShow = (isHidden: boolean) => {
    if (isHidden) {
      fadeOut(() => {
        navigation.setOptions({ title: titleHeader });
      });
    } else {
      fadeIn(() => {
        navigation.setOptions({ title: '' });
      });
    }
  };

  return { setHeaderTitleShow, fadeAnim };
};
