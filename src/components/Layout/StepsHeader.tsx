import React from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { Steps } from "..";
import type { StepProps } from '../Steps';
import { Colors } from "../../styles";

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
  return (
    <View style={[style, styles.header]}>
      <View style={styles.stepsContainer}>
        <Steps nsteps={step.nsteps} activeStep={step.activeStep} />
      </View>
      <View style={styles.leftButton}>{leftButton}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.background,
    height: 70,
  },
  stepsContainer: { paddingVertical: 6 },
  leftButton: {
    width: 60,
  },
});

export default StepsHeader;
