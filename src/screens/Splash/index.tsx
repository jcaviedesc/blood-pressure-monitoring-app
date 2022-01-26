import React, { useCallback } from 'react';
import { StatusBar, StyleSheet, View, Image } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import type { RootStackParamList } from '../../router/types';
import { Colors, Images, Metrics } from '../../styles';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;


const SplashScreen: React.FC<Props> = ({ navigation }) => {
  useFocusEffect(
    useCallback(() => {
      changeNavigationBarColor(Colors.cardHighlight, false, false);
      return () => {
        changeNavigationBarColor(Colors.background, false, false);
      };
    }, []),
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
