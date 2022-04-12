import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { LabelProps } from '@ptomasroos/react-native-multi-slider';
import { Colors, Fonts, Metrics } from '../../styles';

const AnimatedView = Animated.createAnimatedComponent(View);

CustomLabel.defaultProps = {
  leftDiff: 0,
};

export const DIFFERENCE = 242;

const sliderLength = Metrics.screenHeight - DIFFERENCE;
const height = 45;
const width = 160;
const pointerWidth = height * 0.47;

function LabelBase(props) {
  const { position, value, pressed } = props;
  const scaleValue = React.useRef(new Animated.Value(0.1)); // Behaves oddly if set to 0
  const cachedPressed = React.useRef(pressed);

  React.useEffect(() => {
    Animated.timing(scaleValue.current, {
      toValue: pressed ? 1.05 : 1,
      duration: 200,
      delay: pressed ? 2000 : 0,
      useNativeDriver: false,
    }).start();
    cachedPressed.current = pressed;
  }, [pressed]);

  return (
    Number.isFinite(position) &&
    Number.isFinite(value) && (
      <View
        style={[
          styles.sliderLabel,
          {
            top: sliderLength - position - 120,
          },
        ]}>
        <Text style={styles.sliderLabelText}>{` ${value}`}</Text>
      </View>
    )
  );
}

export default function CustomLabel({
  oneMarkerValue,
  oneMarkerLeftPosition,
  oneMarkerPressed,
}: LabelProps) {
  return (
    <View style={styles.parentView}>
      <LabelBase
        position={oneMarkerLeftPosition}
        value={oneMarkerValue}
        pressed={oneMarkerPressed}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  parentView: {
    position: 'relative',
    zIndex: 100,
  },
  sliderLabel: {
    position: 'absolute',
    zIndex: 30,
    justifyContent: 'center',
    width: '100%',
    height: height,
    right: width,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  sliderLabelText: {
    textAlign: 'center',
    lineHeight: height,
    backgroundColor: Colors.transparent,
    flex: 1,
    fontSize: Fonts.size.h1,
    color: Colors.button,
    fontFamily: Fonts.type.regular,
    paddingRight: 12,
  },
});
