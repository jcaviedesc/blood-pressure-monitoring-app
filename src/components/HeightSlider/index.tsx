import React, { useState } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { Colors, Fonts, Images, Metrics } from '../../styles';
import CustomLabel, { DIFFERENCE } from './CustomLabel';

type Pros = {
  max?: number;
  min?: number;
};

const HeightSlider: React.FC<Pros> = ({ min = 40, max = 180 }) => {
  const [value, setValue] = useState([120]);
  return (
    <View style={styles.heightSliderContainer}>
      <View style={styles.multiSliderContainer}>
        <MultiSlider
          values={value}
          enableLabel={true}
          customLabel={props => (
            <CustomLabel {...props} imageSource={Images.womenGender} />
          )}
          min={min}
          max={max}
          sliderLength={300}
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
      <View style={styles.imageGenderContainer}>
        <Image source={Images.womenGender} style={styles.imageGender} />
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
    width: 6,
    height: 42,
    borderRadius: 5,
    backgroundColor: 'black',
    borderColor: Colors.transparent,
    borderWidth: 1,
  },
  markerPress: {
    width: 6,
    height: 42,
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
    backgroundColor: 'blue',
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
    backgroundColor: 'red',
    width: '100%',
    alignItems: 'center',
    position: 'absolute',
  },
  imageGender: {
    resizeMode: 'contain',
    width: 210,
    height: 420,
    backgroundColor: 'green',
    transform: [{ scale: 1 }, { translateY: 18 }],
  },
});

export default HeightSlider;
