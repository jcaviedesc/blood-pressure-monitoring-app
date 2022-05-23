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
          backgroundColor:
            step < activeStep - 1 ? Colors.tertiary : Colors.stroke,
        };
        return (
          <View key={step} style={stepStyle}>
            <View
              style={{
                backgroundColor: Colors.tertiary,
                height: '100%',
                width: step === activeStep - 1 ? '80%': 0,
              }}
            />
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  stepContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 9,
  },
  step: {
    height: 5,
    borderRadius: 3,
    overflow: 'hidden',
  },
});

export default Steps;
