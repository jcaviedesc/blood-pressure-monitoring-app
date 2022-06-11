import React from 'react';
import { View, StyleSheet, useColorScheme } from 'react-native';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { useHeaderHeight, HeaderBackButton } from '@react-navigation/elements';
import { Steps } from '..';
import type { StepProps } from '../Steps';
import { Colors, AppStyles, Metrics } from '../../styles';

type StepsHeaderProps = {
  step: StepProps;
} & NativeStackHeaderProps;

const StepsHeader: React.FC<StepsHeaderProps> = ({
  back,
  options,
  navigation,
  step,
}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const headerHeight = useHeaderHeight();
  return (
    <View
      style={[
        options.headerStyle,
        styles.header,
        isDarkMode && styles.darkContainer,
        { height: headerHeight },
      ]}>
      {/* TODO cambiar nombre de los props */}
      <Steps nsteps={step.nsteps} activeStep={step.activeStep} />
      <View style={styles.leftButton}>
        {back && (
          <HeaderBackButton
            onPress={navigation.goBack}
            tintColor={Colors.stroke}
          />
        )}
      </View>
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
