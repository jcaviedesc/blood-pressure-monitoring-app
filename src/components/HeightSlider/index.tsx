import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { Colors, Fonts, Images, Metrics } from '../../styles';
import CustomLabel from './CustomLabel';

type Pros = {
  max?: number;
  min?: number;
};

const PENDIENTE_M = 1.873;
const CORTE_N = 25;

const HeightSlider: React.FC<Pros> = ({ min = 40, max = 180 }) => {
  const [value, setValue] = useState([120]);
  return (
    <View style={styles.heightSliderContainer}>
      <View style={styles.multiSliderContainer}>
        <MultiSlider
          values={value}
          enableLabel={true}
          customLabel={CustomLabel}
          min={min}
          max={max}
          sliderLength={300}
          // snapped
          onValuesChange={values => {
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
          // markerContainerStyle={styles.markerContainer}
          markerStyle={styles.marker}
          pressedMarkerStyle={{ ...styles.marker, ...styles.markerPress }}
          // containerStyle={styles.container}
          vertical
        />
      </View>
      <View style={styles.imageGenderContainer}>
        <Image
          source={Images.womenGender}
          style={[
            styles.imageGender,
            { height: value[0] * PENDIENTE_M + CORTE_N },
          ]}
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
    height: 6,
    backgroundColor: Colors.stroke,
    borderRadius: 5,
  },
  selected: {
    backgroundColor: Colors.button,
  },
  marker: {
    width: 9,
    height: 42,
    borderRadius: 5,
    backgroundColor: Colors.stroke,
    borderColor: Colors.transparent,
    borderWidth: 1,
  },
  markerPress: {
    width: 12,
    height: 46,
    borderWidth: 2,
  },
  markerContainer: {
    paddingTop: 10,
  },
  heightSliderContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  multiSliderContainer: {
    height: 200,
    marginBottom: 70,
    marginRight: -100,
    position: 'relative',
    zIndex: 100,
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
  imageGenderContainer: {
    width: '100%',
    alignItems: 'center',
    position: 'absolute',
    justifyContent: 'flex-end',
  },
  imageGender: {
    resizeMode: 'contain',
    width: 210,
  },
});

export default HeightSlider;
