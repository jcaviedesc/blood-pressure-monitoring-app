import React, { useCallback } from 'react';
import { StatusBar, StyleSheet, View, Image } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import type { RootStackParamList } from '../../router/types';
import { Colors, Images, Metrics } from '../../styles';
import {
  selectAppUserState,
  initAppSuccessful,
} from '../../store/app/appSlice';
import { useAppSelector, useAppDispatch } from '../../hooks';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

const SplashScreen: React.FC<Props> = ({ navigation }) => {
  const { isFirstTime, hasUserActiveSession } =
    useAppSelector(selectAppUserState);
  const dispatch = useAppDispatch();

  useFocusEffect(
    useCallback(() => {
      changeNavigationBarColor(Colors.cardHighlight, false, false);
      const next = () => {
        if (isFirstTime) {
          navigation.navigate('Onboarding');
        } else if (hasUserActiveSession) {
          navigation.navigate('Home');
        } else {
          navigation.navigate('Login');
        }
      };
      setTimeout(next, 1000);
      return () => {
        dispatch(initAppSuccessful());
        changeNavigationBarColor(Colors.background, true, false);
      };
    }, [isFirstTime, hasUserActiveSession, navigation, dispatch]),
  );

  return (
    <View style={styles.splash}>
      <StatusBar
        animated={true}
        backgroundColor={Colors.cardHighlight}
        showHideTransition="fade"
        hidden={false}
        barStyle="light-content"
      />
      <Image source={Images.animateHeart} style={styles.splashImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    backgroundColor: Colors.cardHighlight,
  },
  splashImage: {
    width: Metrics.screenWidth,
    resizeMode: 'contain',
    backgroundColor: Colors.cardHighlight,
    overlayColor: Colors.cardHighlight,
  },
});

export default SplashScreen;
