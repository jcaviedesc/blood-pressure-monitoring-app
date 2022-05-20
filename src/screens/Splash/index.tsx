import React, { useEffect } from 'react';
import { StatusBar, StyleSheet, View, Image } from 'react-native';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import { Colors, Images, Metrics } from '../../styles';

const SplashScreen: React.FC = () => {
  useEffect(() => {
    changeNavigationBarColor(Colors.tertiary, false, false);
    StatusBar.setBackgroundColor(Colors.background, true);
    StatusBar.setBarStyle('dark-content');
    changeNavigationBarColor(Colors.background, true, false);
  }, []);

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
  },
});

export default SplashScreen;
