import React from 'react';
import {
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  useColorScheme,
  Platform,
} from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import { Steps } from '..';
import type { StepProps } from '../Steps';
import { Colors, AppStyles } from '../../styles';

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
      <View style={styles.stepsContainer}>
        <Steps nsteps={step.nsteps} activeStep={step.activeStep} />
      </View>
      <View style={styles.leftButton}>{leftButton}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  ...AppStyles.screen,
  header: {
    backgroundColor: Colors.background,
    paddingTop: Platform.OS === 'ios' ? 42 : 0,
  },
  stepsContainer: { paddingVertical: 6 },
  leftButton: {
    width: 60,
    height: '100%',
  },
});

export default StepsHeader;
