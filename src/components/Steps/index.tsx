import React from "react";
import { View, StyleSheet } from 'react-native';
import { Colors, Metrics } from '../../styles';

type Props = {
  nsteps: number;
  activeStep: number;
};

const Steps: React.FC<Props> = ({ nsteps, activeStep }) => {
  return (
    <View style={styles.stepContainer}>
      {Array.apply(null, { length: nsteps }).map((_, step) => {
        const stepStyle = {
          ...styles.step,
          backgroundColor: step <= activeStep ? Colors.orange : Colors.gray,
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
    width: Metrics.screenWidth / 8 - 6,
  },
});

export default Steps;
