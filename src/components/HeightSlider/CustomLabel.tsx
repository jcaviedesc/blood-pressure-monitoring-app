import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LabelProps } from '@ptomasroos/react-native-multi-slider';
import { Colors, Fonts, Metrics } from '../../styles';

const height = 45;

export default function CustomLabel({
  oneMarkerValue,
  oneMarkerLeftPosition,
  oneMarkerPressed,
}: LabelProps) {
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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sliderLabel: {
    position: 'absolute',
    zIndex: 30,
    justifyContent: 'center',
    width: Metrics.screenWidth - 70,
    height: height,
    right: 150,
    borderBottomColor: Colors.stroke,
    borderBottomWidth: 1,
  },
  sliderLabelText: {
    textAlign: 'left',
    lineHeight: height,
    backgroundColor: Colors.transparent,
    flex: 1,
    fontSize: Fonts.size.h1,
    color: Colors.headline,
    fontFamily: Fonts.type.regular,
    paddingRight: 12,
  },
});
