import React, { useEffect } from 'react';
import {
  StatusBar,
  StyleSheet,
  View,
  Image,
  Platform,
  useColorScheme,
} from 'react-native';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import { Colors, Images, Metrics } from '../../styles';

const SplashScreen: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';
  useEffect(() => {
    changeNavigationBarColor(Colors.background, false, false);
    return () => {
      if (Platform.OS === 'android') {
        StatusBar.setBackgroundColor(
          isDarkMode ? Colors.darkBackground : Colors.background,
          true,
        );
      }
      changeNavigationBarColor(
        isDarkMode ? Colors.darkBackground : Colors.background,
        true,
        false,
      );
    };
  }, [isDarkMode]);

  return (
    <View style={styles.splash}>
      <StatusBar
        animated={true}
        backgroundColor={Colors.tertiary}
        showHideTransition="fade"
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        hidden={false}
        translucent={true}
      />
      <Image source={Images.animateHeart} style={styles.splashImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  splashImage: {
    width: Metrics.screenWidth,
    resizeMode: 'contain',
  },
});

export default SplashScreen;
