import React, { useCallback } from 'react';
import { StatusBar, StyleSheet, View, Image } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
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
  const { isFirstTime } = useAppSelector(selectAppUserState);
  const dispatch = useAppDispatch();

  useFocusEffect(
    useCallback(() => {
      changeNavigationBarColor(Colors.tertiary, false, false);
      const next = () => {
        const currentUser = auth().currentUser;
        if (isFirstTime) {
          navigation.navigate('Onboarding');
        } else if (currentUser) {
          navigation.navigate('Home');
        } else {
          navigation.navigate('Login', { from: 'splash' });
        }
      };
      next();
      return () => {
        dispatch(initAppSuccessful());
        changeNavigationBarColor(Colors.background, true, false);
      };
    }, [isFirstTime, navigation, dispatch]),
  );

  return (
    <View style={styles.splash}>
      <StatusBar
        animated={true}
        backgroundColor={Colors.tertiary}
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
    backgroundColor: Colors.tertiary,
  },
  splashImage: {
    width: Metrics.screenWidth,
    resizeMode: 'contain',
    backgroundColor: Colors.tertiary,
    overlayColor: Colors.tertiary,
  },
});

export default SplashScreen;
