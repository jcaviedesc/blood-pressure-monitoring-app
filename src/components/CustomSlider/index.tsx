import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { Colors, Metrics, Fonts } from '../../styles';
import CustomLabel from './CustomLabel';

type Pros = {
  min:number
  max: number;
  title?: string;
  magnitude: string;
  valueSelected:number;
  onChangeText?: ((text: number) => void) | undefined;
};

const CustomSlider: React.FC<Pros> = ({ title, min = 0, max = 100, magnitude, valueSelected,onChangeText }) => {
  const [value, setValue] = useState([valueSelected]);
  const [enableLabel, setEnableLabel] = useState(false);
  return (
    <View>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>{title}</Text>
        <Text style={styles.valueText}>{`${value[0]} ${magnitude}`}</Text>
      </View>
      <View style={styles.multiSliderContainer}>
        <MultiSlider
          values={value}
          enableLabel={enableLabel}
          customLabel={CustomLabel}
          min={min}
          max={max}
          sliderLength={Metrics.screenWidth - Metrics.marginHorizontal * 2.5}
          // snapped
          onValuesChangeStart={() => {
            setEnableLabel(true);
          }}
          onValuesChangeFinish={values => {
            setEnableLabel(false);
            onChangeText(values);
            setValue(values);
          }}
          touchDimensions={{
            height: 60,
            width: 60,
            borderRadius: 30,
            slipDisplacement: 40,
          }}
          selectedStyle={styles.selected}
          trackStyle={styles.track}
          markerContainerStyle={styles.markerContainer}
          markerStyle={styles.marker}
          containerStyle={styles.container}
        />
        <View style={styles.markContainerMask}>
          <View style={styles.markContainer}>
            <Text style={styles.referText}>{min}</Text>
            <Text style={styles.referText}>{max}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleText: {
    fontFamily: Fonts.type.light,
    fontSize: Fonts.size.h5,
    width: '70%',
    color: Colors.paragraph,
  },
  valueText: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.h5,
    color: Colors.headline,
  },
  container: {
    flex: 1,
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
    width: 33,
    height: 33,
    borderRadius: 5,
    backgroundColor: Colors.background,
    borderColor: Colors.lightGray,
    borderWidth: 1,
  },
  markerContainer: {
    paddingTop: 10,
  },
  multiSliderContainer: {
    position: 'relative',
    justifyContent: 'center',
    marginHorizontal: Metrics.marginHorizontal * 0.25,
    paddingBottom: 10,
  },
  referText: {
    fontFamily: Fonts.type.light,
    fontSize: Fonts.size.hint,
    color: Colors.paragraph,
  },
  markContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  markContainerMask: {
    top: 40,
    position: 'absolute',
    width: '100%',
  },
});

export default CustomSlider;
