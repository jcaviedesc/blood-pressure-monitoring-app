import React from "react";
import { View, StyleSheet } from 'react-native';
import { Colors, Metrics } from '../../styles';

export type StepProps = {
  nsteps: number;
  activeStep: number;
};

const Steps: React.FC<StepProps> = ({ nsteps, activeStep }) => {
  return (
    <View style={styles.stepContainer}>
      {Array.apply(null, { length: nsteps }).map((_, step) => {
        const stepStyle = {
          ...styles.step,
          width: Metrics.screenWidth / nsteps - 6,
          backgroundColor: step <= activeStep - 1  ? Colors.orange : Colors.gray,
        };
        return <View key={step} style={stepStyle} />;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  stepContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  step: {
    height: 9,
  },
});

export default Steps;
