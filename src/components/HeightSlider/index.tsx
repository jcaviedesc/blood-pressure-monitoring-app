import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { Colors, Fonts, Metrics } from '../../styles';
import CustomLabel, { DIFFERENCE } from './CustomLabel';

type Pros = {
  max?: number;
  min?: number;
};

const HeightSlider: React.FC<Pros> = ({ min = 40, max = 180 }) => {
  const [value, setValue] = useState([120]);
  return (
    <View style={styles.heightSliderContainer}>
      <View
        style={{
          borderBottomColor: 'yellow',
          borderBottomWidth: 3,
          width: 200,
          height: 150,
          transform: [{ rotate: '0deg' }],
          backgroundColor: 'green',
        }}
      />
      <View style={styles.multiSliderContainer}>
        <MultiSlider
          values={value}
          // enableLabel={true}
          // customLabel={CustomLabel}
          min={min}
          max={max}
          sliderLength={200}
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
          // selectedStyle={styles.selected}
          // trackStyle={styles.track}
          // markerContainerStyle={styles.markerContainer}
          markerStyle={styles.marker}
          pressedMarkerStyle={{ ...styles.marker, ...styles.markerPress }}
          // containerStyle={styles.container}
          vertical
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 0,
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
    backgroundColor: Colors.transparent,
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
  heightSliderContainer: {
    flex: 1,
    alignItems: 'flex-end',
    backgroundColor: 'blue',
  },
  multiSliderContainer: {
    // height: 400,
    // width: 300,
    zIndex: 100,
    backgroundColor: 'red',
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

export default HeightSlider;
