import React from 'react';
import {
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  useColorScheme,
} from 'react-native';
import { Colors, AppStyles } from '../../styles';

type NormalHeaderProps = {
  title?: string;
  leftButton: React.ComponentType<any> | Element | undefined;
  style: StyleProp<ViewStyle>;
};

const NormalHeader: React.FC<NormalHeaderProps> = ({ leftButton, style }) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={[style, styles.header, isDarkMode && styles.darkBackground]}>
      <View style={styles.leftButton}>{leftButton}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  ...AppStyles.screen,
  header: {
    backgroundColor: Colors.background,
    height: 70,
  },
  leftButton: {
    width: 60,
  },
});

export default NormalHeader;
