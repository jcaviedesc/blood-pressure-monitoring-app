import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LabelProps } from '@ptomasroos/react-native-multi-slider';
import { Colors, Fonts, Metrics } from '../../styles';

const height = 45;

interface CustomLabelPros extends LabelProps {
  labelUnit: string;
}

export default function CustomLabel({
  oneMarkerValue,
  oneMarkerLeftPosition,
  labelUnit,
}: CustomLabelPros) {
  return (
    <View>
      <View
        style={[
          styles.sliderLabel,
          {
            top: 130 - oneMarkerLeftPosition,
          },
        ]}>
        <Text style={styles.sliderLabelText}>{`${oneMarkerValue}`}</Text>
        <Text style={[styles.sliderLabelText, styles.unitText]}>{labelUnit}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sliderLabel: {
    position: 'absolute',
    zIndex: 30,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    width: Metrics.screenWidth - 70,
    height: height,
    right: 150,
    borderBottomColor: Colors.stroke,
    borderBottomWidth: 1,
    flexDirection: 'row',
  },
  sliderLabelText: {
    textAlign: 'left',
    backgroundColor: Colors.transparent,
    fontSize: Fonts.size.h1,
    color: Colors.headline,
    fontFamily: Fonts.type.regular,
    paddingRight: 6,
  },
  unitText: {
    fontSize: Fonts.size.h4,
  },
});
