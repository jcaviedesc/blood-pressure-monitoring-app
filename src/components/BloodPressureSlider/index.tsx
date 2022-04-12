import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { Colors, Fonts, Metrics } from '../../styles';
import CustomLabel, { DIFFERENCE } from './CustomLabel';

type Pros = {
  max?: number;
  min?: number;
};

const BloodPressureSlider: React.FC<Pros> = ({ min = 40, max = 180 }) => {
  const [value, setValue] = useState([120, 80]);
  return (
    <View style={styles.multiSliderContainer}>
      <View style={styles.trackStepsContainer}>
        <View style={styles.trackStepsContent}>
          <Text style={styles.trackStepLabel}>+180 mmHg</Text>
          <Text style={styles.trackStepLabel}>40 mmHg</Text>
        </View>
      </View>
      <MultiSlider
        values={value}
        enableLabel={true}
        customLabel={CustomLabel}
        min={min}
        max={max}
        sliderLength={400}
        // snapped
        onValuesChangeFinish={values => {
          setValue(values);
        }}
        touchDimensions={{
          height: 30,
          width: 90,
          borderRadius: 30,
          slipDisplacement: 40,
        }}
        selectedStyle={styles.selected}
        trackStyle={styles.track}
        markerContainerStyle={styles.markerContainer}
        markerStyle={styles.marker}
        pressedMarkerStyle={{ ...styles.marker, ...styles.markerPress }}
        containerStyle={styles.container}
        vertical
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 0,
    marginLeft: 50,
    marginTop: Metrics.screenWidth - 120,
  },
  track: {
    height: 10,
    backgroundColor: Colors.lightGray,
    borderRadius: 5,
  },
  selected: {
    backgroundColor: Colors.button,
  },
  marker: {
    width: 30,
    height: 60,
    borderRadius: 5,
    backgroundColor: Colors.background,
    borderColor: Colors.lightGray,
    borderWidth: 1,
  },
  markerPress: {
    width: 36,
    height: 62,
    borderWidth: 2,
  },
  markerContainer: {
    paddingTop: 10,
  },
  multiSliderContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  trackStepsContainer: {
    right: 20,
    position: 'absolute',
    height: '100%',
  },
  trackStepsContent: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  trackStepLabel: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.h5,
    color: Colors.paragraph,
    textAlign: 'right',
  },
});

export default BloodPressureSlider;
