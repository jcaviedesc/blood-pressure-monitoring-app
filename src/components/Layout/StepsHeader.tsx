import React from 'react';
import {
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  useColorScheme,
} from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import { Steps } from '..';
import type { StepProps } from '../Steps';
import { Colors, AppStyles, Metrics } from '../../styles';

type StepsHeaderProps = {
  title: string;
  step: StepProps;
  leftButton: React.ComponentType<any> | Element | undefined;
  style: StyleProp<ViewStyle>;
};

const StepsHeader: React.FC<StepsHeaderProps> = ({
  step,
  leftButton,
  style,
}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const headerHeight = useHeaderHeight();
  return (
    <View
      style={[
        style,
        styles.header,
        isDarkMode && styles.darkContainer,
        { height: headerHeight },
      ]}>
      <Steps nsteps={step.nsteps} activeStep={step.activeStep} />
      <View style={styles.leftButton}>{leftButton}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  ...AppStyles.screen,
  header: {
    backgroundColor: Colors.background,
    paddingTop: Metrics.navBarHeight,
  },
  leftButton: {
    width: 60,
    height: '100%',
  },
});

export default StepsHeader;
