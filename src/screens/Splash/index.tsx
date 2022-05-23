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
    changeNavigationBarColor(Colors.tertiary, false, false);
    return () => {
      if (Platform.OS === 'android') {
        StatusBar.setBackgroundColor(Colors.background, true);
      }
      changeNavigationBarColor(Colors.background, true, false);
    };
  }, []);

  return (
    <View style={styles.splash}>
      <StatusBar
        animated={true}
        backgroundColor={Colors.tertiary}
        showHideTransition="fade"
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        hidden={false}
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
  },
});

export default SplashScreen;
